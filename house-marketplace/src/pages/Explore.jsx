import {Link} from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'


const Explore = () => { 
  return (
    <div className='Explore'>

      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        {/* TODO Slider */}

        {/* Categories */}
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">

            {/* Rent */}
            <Link to='/category/rent'>
              <img src={rentCategoryImage} alt='rent'className='exploreCategoryImg'/>
              <p className="explorecategoryName">Places for rent</p>
            </Link>

            {/* Sell */}
            <Link to='/category/sale'>
              <img src={sellCategoryImage} alt='sell'className='exploreCategoryImg'/>
              <p className="explorecategoryName">Places for sale</p>
            </Link>
            
        </div>

      </main>
    </div>
  )
}
export default Explore