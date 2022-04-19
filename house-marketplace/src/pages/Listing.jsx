import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

const Listing = () => {

    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)


    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()


    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                console.log(docSnap.data());
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()

    }, [navigate, params.listingId])


    if(loading){
      return <Spinner/>
    }

  return (
    <main>
      {/* TODO SLIDER */}

      {/* Share Icon */}
      <div className="shareIconDiv" onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(() => {
          setShareLinkCopied(false)
        }, 2000)
      }}>
        <img src={shareIcon} alt="" />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      {/* Listing Details */}

      <div className="listingDetails">
        {/* Name */}
        <p className="listingName">
          {listing.name} - ${listing.offer 
          ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
          : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
        </p>
        {/* Address */}
        <p className="listingLocation">{listing.location}</p>
        {/* Type */}
        <p className="listingType">
          For {listing.type === 'rent' ? 'Rent' : 'Sale'} 
        </p>
        {/* if any discount */}
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}


        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bedrooms` : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>

        </ul>

        <p className="listingLocationTitle">Location</p>
        {/* TODO Map */}
        

        {/* Contact button */}
        {auth.currentUser?.uid !== listing.userRef && (
          <Link to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`} className='primaryButton'>Contact landlord</Link>
        )}

      </div>

    </main>
  )
}
export default Listing