import { useState, useEffect, useRef } from "react"
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from 'firebase/storage'
import {doc, updateDoc,getDoc, serverTimestamp} from 'firebase/firestore'
import { db } from "../firebase.config"
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from "react-router-dom"
import Spinner from '../components/Spinner'
import { toast } from "react-toastify"

const EditListing = () => {


  // eslint-disable-next-line no-unused-vars
  const [geolocationEnabled, setGeolocationEnabled] = useState(false)
  const [loading, setLoading] = useState(false) 
  const [listing, setlisting] = useState(false) 

  const [formData, setFormData] = useState({
      type: 'rent',
      name:'',
      bedrooms:1,
      bathrooms:1,
      parking: false,
      furnished: false,
      address: '',
      offer: false,
      regularPrice: 0,
      discountedPrice: 0,
      images: {},
      latitude: 0,
      longitude:0
  })

  const {type, name, bedrooms, bathrooms, parking, furnished, address, offer,
        regularPrice, discountedPrice,images, latitude, longitude} = formData
 
  const auth = getAuth();
  const navigate = useNavigate()
  const params  = useParams()
  const isMounted = useRef(true)

    //Redirect if listing is not users
    useEffect(() => {
        if(listing && listing.userRef !== auth.currentUser.uid){
            toast.error('You cannot edit the listing ')
            navigate('/')
        }
    })


  //For fetching the list to edit
  useEffect(() => {
    setLoading(true)
    const fetchListing = async () => {
        const docRef = doc(db, 'listings', params.listingId)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            setlisting(docSnap.data())
            setFormData({...docSnap.data(), address: docSnap.data().location})
            setLoading(false)
        }else{
            navigate('/')
            toast.error('Lisitng does not exists')
        }
    }

    fetchListing()
  }, [params.listingId, navigate])

  //Sets userRef to logged in user
  useEffect(() => {

      if(isMounted){
        // Check if theres user and the update the form with the current user
        onAuthStateChanged(auth, (user) => {
            if(user){
                setFormData({...formData, userRef: user.uid})
            }
            // If theres no user
            else{
                navigate('/sign-in')
            }
        })

      }

      return () => {
          isMounted.current = false
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onSubmit = async (e) => {
      e.preventDefault();

      setLoading(true)

    //   Discounted > Regular
      if(discountedPrice >= regularPrice){
          setLoading(false)
          toast.error('Discounted price needs to be less than regular price')
          return 
      }

    // Images less than 6 files
    if(images.length > 6){
        setLoading(false)
        toast.error('Max 6 Images')
        return
    }  

    // Geolocation
    let geolocation = {}
    let location

    // Enabled
    if(geolocationEnabled){
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
          )
    
        const data = await response.json()
    
        geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
        geolocation.lng = data.results[0]?.geometry.location.lng ?? 0

        location =
        data.status === 'ZERO_RESULTS'
            ? undefined 
            : data.results[0]?.formatted_address


        if (location === undefined || location.includes('undefined')) {
        setLoading(false)
        toast.error('Please enter a correct address')
        return
        }

    // Disabled
    }else{
        geolocation.lat = latitude
        geolocation.lng = longitude
       
    }

      // Store image in firebase
      const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage()
          const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
  
          const storageRef = ref(storage, 'images/' + fileName)
  
          const uploadTask = uploadBytesResumable(storageRef, image)
  
          uploadTask.on(
            'state_changed',
            (snapshot) => {
            //   const progress =
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              switch (snapshot.state) {
                case 'paused':
                  break
                case 'running':
                  break
                default:
                  break
              }
            },
            (error) => {
              reject(error)
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
              })
            }
          )
        })
      }
  
      const imgUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch((error) => {
        setLoading(false)
        toast.error('Images not uploaded')
        return
      })

      //Store it in DB
      const formDataCopy = {
        ...formData,
        imgUrls,
        geolocation,
        timestamp: serverTimestamp(),
      }


      formDataCopy.location = address
      delete formDataCopy.images
      delete formDataCopy.address
      !formDataCopy.offer && delete formDataCopy.discountedPrice

    //   const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
      //Update listing
      const docRef = doc(db, 'listings', params.listingId)
      await updateDoc(docRef, formDataCopy)
      setLoading(false)
      toast.success('Listing saved')
      navigate(`/category/${formDataCopy.type}/${docRef.id}`)

  }

  const onMutate = (e) => {
      let boolean = null

      if(e.target.value === 'true'){
          boolean = true 
      }
      if(e.target.value === 'false'){
        boolean = false 
      }

      //Files
      if(e.target.files){
          setFormData((prevState) => ({
              ...prevState,
              images: e.target.files
          }))
      }
     
      //Text/numbers/booleans
      if(!e.target.files){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : boolean ?? e.target.value
        }))
    }

  }

  if(loading){
      return <Spinner/>
  }

  return (
    <div className="profile">

        <header>
            <p className="pageHeader">
                Edit Listing
            </p>
        </header>

        <main>

            {/* Form */}
            <form onSubmit={onSubmit}>

                <label className="formLabel">Sell / Rent</label>

                <div className="formButtons">

                    {/* Sell Button */}
                    <button type="button" className={type === 'sale' ? 
                    'formButtonActive' : 'formButton' }
                    id='type'
                    value='sale'
                    onClick={onMutate}
                    >
                        Sell
                    </button>

                     {/* Rent Button */}
                     <button type="button" className={type === 'rent' ? 
                    'formButtonActive' : 'formButton' }
                    id='type'
                    value='rent'
                    onClick={onMutate}
                    >
                        Rent
                    </button>

                </div>

                {/* Name */}
                <label className='formLabel'>Name</label>
                <input
                    className='formInputName'
                    type='text'
                    id='name'
                    value={name}
                    onChange={onMutate}
                    maxLength='32'
                    minLength='10'
                    required
                />

                <div className='formRooms flex'>

                    <div>
                        <label className='formLabel'>Bedrooms</label>
                        {/* Bedrooms */}
                        <input
                            className='formInputSmall'
                            type='number'
                            id='bedrooms'
                            value={bedrooms}
                            onChange={onMutate}
                            min='1'
                            max='50'
                            required
                        />
                    </div>

                    <div>
                        <label className='formLabel'>Bathrooms</label>
                        {/* Bathrooms */}
                        <input
                            className='formInputSmall'
                            type='number'
                            id='bathrooms'
                            value={bathrooms}
                            onChange={onMutate}
                            min='1'
                            max='50'
                            required
                        />
                    </div>

                </div>

                {/* Parking */}
                <label className='formLabel'>Parking spot</label>

                <div className='formButtons'>

                    {/* Yes */}
                    <button
                    className={parking ? 'formButtonActive' : 'formButton'}
                    type='button'
                    id='parking'
                    value={true}
                    onClick={onMutate}
                    min='1'
                    max='50'
                    >
                    Yes
                    </button>

                    {/* No */}
                    <button
                    className={
                        !parking && parking !== null ? 'formButtonActive' : 'formButton'
                    }
                    type='button'
                    id='parking'
                    value={false}
                    onClick={onMutate}
                    >
                    No
                    </button>

                </div>
            
                {/* Furnished */}
                <label className='formLabel'>Furnished</label>
                    <div className='formButtons'>

                       {/* Yes */}
                        <button
                        className={furnished ? 'formButtonActive' : 'formButton'}
                        type='button'
                        id='furnished'
                        value={true}
                        onClick={onMutate}
                        >
                        Yes
                        </button>

                       {/* No */}
                        <button
                        className={
                            !furnished && furnished !== null
                            ? 'formButtonActive'
                            : 'formButton'
                        }
                        type='button'
                        id='furnished'
                        value={false}
                        onClick={onMutate}
                        >
                        No
                        </button>

                    </div>

                    {/* Address */}
                    <label className='formLabel'>Address</label>
                    <textarea
                        className='formInputAddress'
                        type='text'
                        id='address'
                        value={address}
                        onChange={onMutate}
                        required
                    />

                    {/* Geolocation */}
                    {!geolocationEnabled && (
                        <div className='formLatLng flex'>
                            {/* Latitude */}
                            <div>
                                <label className='formLabel'>Latitude</label>
                                <input
                                className='formInputSmall'
                                type='number'
                                id='latitude'
                                value={latitude}
                                onChange={onMutate}
                                required
                                />
                            </div>
                            {/* Longitude */}
                            <div>
                                <label className='formLabel'>Longitude</label>
                                <input
                                className='formInputSmall'
                                type='number'
                                id='longitude'
                                value={longitude}
                                onChange={onMutate}
                                required
                                />
                            </div>

                        </div>
                    )}

                    {/* Offers */}
                    <label className='formLabel'>Offer</label>

                        <div className='formButtons'>
                            {/* Yes */}
                            <button
                            className={offer ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='offer'
                            value={true}
                            onClick={onMutate}
                            >
                            Yes
                            </button>

                            {/* No */}
                            <button
                            className={
                                !offer && offer !== null ? 'formButtonActive' : 'formButton'
                            }
                            type='button'
                            id='offer'
                            value={false}
                            onClick={onMutate}
                            >
                            No
                            </button>

                        </div>
                        
                        {/* Regular Price */}
                        <label className='formLabel'>Regular Price</label>
                        <div className='formPriceDiv'>
                            <input
                            className='formInputSmall'
                            type='number'
                            id='regularPrice'
                            value={regularPrice}
                            onChange={onMutate}
                            min='50'
                            max='750000000'
                            required
                            />
                            {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
                        </div>

                        {/* Discounted Price */}
                        {offer && (
                            <>
                            <label className='formLabel'>Discounted Price</label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='discountedPrice'
                                value={discountedPrice}
                                onChange={onMutate}
                                min='50'
                                max='750000000'
                                required={offer}
                            />
                            </>
                        )}

                        {/* Images */}
                        <label className='formLabel'>Images</label>
                        <p className='imagesInfo'>
                            The first image will be the cover (max 6).
                        </p>
                        <input
                            className='formInputFile'
                            type='file'
                            id='images'
                            onChange={onMutate}
                            max='6'
                            accept='.jpg,.png,.jpeg'
                            multiple
                            required
                        />

                        {/* Submit Button */}
                        <button type='submit' className='primaryButton createListingButton'>
                            Edit Listing
                        </button>
            </form>

        </main>
    </div>
  )
}
export default EditListing