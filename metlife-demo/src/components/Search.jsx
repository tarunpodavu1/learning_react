import { useState } from "react"
import './Search.css'

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
        <h4>Search results for "{searchTerm}" </h4>

        {/* Main Search */}
        <div className="searchwell">
            <input className='searchbox1' type="text" name="" id="" placeholder="Search by Keyword"/>
            <input className='searchbox3' type="text" name="" id="" placeholder="Search by Title"/>
            <input className='searchbox2' type="text" name="" id=""  placeholder="Search by Location(s)"/>
            <button className="btn btn-success searchbtn">Search Jobs</button>
        </div>

        {/* Table */}

        <table class="table">
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th scope="col">Location(s)</th>
                <th scope="col">Date Posted</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <td >Larry the Bird</td>
                <td>Thornton</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </table>
        

    </>
  )
}
export default Search