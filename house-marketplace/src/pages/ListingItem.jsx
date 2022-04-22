import {Link} from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import {ReactComponent as EditIcon} from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

const ListingItem = ({listing, id, onDelete, onEdit}) => {

  return (
     <li className='categoryListing'>
         <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
            
            {/* Image */}
            <img src={listing.imgUrls[0]} alt={listing.name} className='categoryListingImg'/>
            
            <div className="categoryListingDetails">

                {/* Location */}
                <p className="categoryListingLocation">
                    {listing.location}
                </p>

                {/* Name */}
                <p className="categoryListingName">{listing.name}</p>
                
                {/* Price */}
                <p className="categoryListingPrice">
                   $ {listing.offer ? 
                   listing.discountedPrice
                   .toString()
                   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                   : 
                   listing.regularPrice
                   .toString()
                   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                   }

                   {listing.type === 'rent' && ' / Month'}
                </p>

                <div className="categoryListingInfoDiv">

                   {/* Bed Icon */}
                   <img src={bedIcon} alt="bed" />
                   <p className="categoryListingInfoText">
                       {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` :' 1 Bedroom'}
                   </p>

                    {/* Bathtub Icon */}
                    <img src={bathtubIcon} alt="bath" />
                    <p className="categoryListingInfoText">
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` :' 1 Bathroom'}
                    </p>  

                </div>
                
            </div>
         </Link>

        {/* Delete Icon */}
         {onDelete && (

             <DeleteIcon className='removeIcon' fill='rgb(231, 76, 60)' 
             onClick={() => onDelete(listing.id, listing.name)}/> 

         )}

        {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)}/>}
     </li>
  )
}
export default ListingItem