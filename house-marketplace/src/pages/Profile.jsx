import {getAuth, updateProfile} from 'firebase/auth'
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify';
import {useState, useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import ListingItem from '../pages/ListingItem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

const Profile = () => {

  const auth = getAuth()

  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false) 

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData;

  const navigate = useNavigate()

  useEffect(() => {
    
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
      setLoading(false)

    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {

    try {
      if(auth.currentUser.displayName !== name){

        // Update displayName in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        //Update in firestore

        //Take the reference of the user document
        const userRef = doc(db, 'users', auth.currentUser.uid)
        //Update it on the firestore
        await updateDoc(userRef, {name})

      }
    } catch (error) {
      console.log(error);
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  const onDelete = async (listingId) => {
    if(window.confirm('Are you sure you want to delete')){
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter((listing) => listing.id !== listingId)
      setListings(updatedListings)
      toast.success('Sucessfully deleted listing')
    }
  }

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }

  return (

     
      <div className='profile'>

        {/* Header */}
        <header className="profileHeader">

          <p className="pageHeader">
            My Profile
          </p>

          <button type='button' className="logOut" onClick={onLogout}>
            Logout
          </button>

        </header>

      {/* Form Toggle*/}
      <main>
        <div className="profileDetailsHeader">

          <p className="profileDetailsText">Personal Details</p>

          <p className="changePersonalDetails" onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails(prevState => !prevState)
          }}>

            {changeDetails ? 'done' : 'change'}
        
          </p>

        </div>
          {/* Form */}
          <div className="profileCard">
            <form>

              {/* Name */}
              <input type="text" id="name" className={!changeDetails ? 'profileName'
               : 'profileNameActive'} disabled={!changeDetails} 
               value={name}
               onChange={onChange}
               />

               {/* Email */}
               <input type="text" id="email" className={!changeDetails ? 'profileEmail'
               : 'profileEmailActive'} disabled={!changeDetails} 
               value={email}
               onChange={onChange}
               />

            </form>
          </div>

          {/* Create Listings */}
          <Link to='create-listing' className='createListing' >
            <img src={homeIcon} alt="home" />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt="arrow right" />
          </Link>

          {!loading && listings?.length > 0 && (
            <>
              <p className="listingText">
                Your Listings
              </p>
              <ul className="listingsList">
                {listings.map((listing) => (
                  <ListingItem 
                  key={listing.id} 
                  onDelete={() => onDelete(listing.id)} 
                  listing={listing.data} 
                  id={listing.id}
                  onEdit={() => onEdit(listing.id)} 
                  />
                ))}
              </ul>
            </>
          )}

      </main>  

      </div>

  )
}
export default Profile