import { useEffect, useState } from "react"
import data from '../data'
import Pagination from "./Pagination"
import './Search.css'
// import InitialOrder from "./Table"
import Footer from "./Footer"
import {MDBIcon} from 'mdbreact'


const Search = () => {


    const [searchTerm, setSearchTerm] = useState('')
    const [searchData, setSearchData] = useState(data)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [sortData, setSortData] = useState(null)

    const [formData, setFormData] = useState({
        keyword:'',
        title:'',
        location:''
    })

    // var arrow = 'U+02191'

    const {keyword, title, location} = formData;

    const onChange = (e) => {

        setFormData( (prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))


    }   

    const onSubmit = (e) => {
        e.preventDefault()
        const newData = [...data]

        if(keyword && !title && !location){

            setSearchTerm(`${keyword}`)
    
            // if(keyword && !(title && location))
            // {
            //     console.log('Only title');
            // }    
            
        //    const filtered  = newData.filter(d => d.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
            const filtered  = newData.filter(d => {
                
                return d.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
                     || d.location.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
                      || d.datePosted.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
            })

            console.log('Filtered',filtered);
            console.log('newData',newData);
            setSearchData(filtered)
            setFormData((prevState) => ({
                ...prevState,
                keyword:'',
                title:'',
                location:''
            }))
            
        }

        else if(!keyword && title && !location){
            setSearchTerm(`${title}`)
            console.log('in Title');
            const filtered  = newData.filter(d => {
                
                return d.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())

            })
        

            setSearchData(filtered)
            setFormData((prevState) => ({
                ...prevState,
                keyword:'',
                title:'',
                location:''
            }))

        }

        else if(!keyword && !title && location){
            setSearchTerm(`${location}`)
            console.log('in Location');
            const filtered  = newData.filter(d => {
                
                return d.location.toLocaleLowerCase().includes(location.toLocaleLowerCase())

            })
        

            setSearchData(filtered)
            setFormData((prevState) => ({
                ...prevState,
                keyword:'',
                title:'',
                location:''
            }))

        }
       
        
    return;        

    }

    const onReset = () => {
        
            setSearchData(data)
            setSearchTerm('')
            setSortData(null)
        
    }
   

    //Get current data and make them divide into 10 per page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = searchData.slice(indexOfFirstPost, indexOfLastPost)

    //Paginate
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    const onSort = (e) => {
        console.log(e.target.id);
        // setSortData('asc')
        const nData = [...searchData]
        console.log('nData',nData);
        if(e.target.id === 'title'){
            var sortedData = [...nData]
            if(sortData === 'asc'){
                sortedData = nData.sort((a, b) => a.title.localeCompare(b.title))
                setSortData(null)      
            }else{
                sortedData = nData.sort((a, b) => b.title.localeCompare(a.title))
                setSortData("asc")
            }
            return setSearchData(sortedData)
        }
        else if(e.target.id ==='location'){
            var sortedData = [...nData]

            if(sortData === 'asc'){
                 sortedData = nData.sort((a, b) => a.location.localeCompare(b.location))
                 setSortData(null)
                }
            else{
                 sortedData = nData.sort((a, b) => b.location.localeCompare(a.location))
                 setSortData("asc")
                }
            return setSearchData(sortedData)
        }
        else if(e.target.id ==='datePosted'){
            var sortedData = [...nData]

            if(sortData === 'asc'){
                 sortedData = nData.sort((a, b) => a.datePosted.localeCompare(b.datePosted))
                 setSortData(null)
                }else{
                 sortedData = nData.sort((a, b) => b.datePosted.localeCompare(a.datePosted))
                 setSortData("asc")
                }

            return setSearchData(sortedData)
        }else{
            return;
        }
    }



  return (
    <>
        <h4>Search results for  "{searchTerm}" </h4>

        {/* Main Search */}
        <div className="searchwell">
            <form onSubmit={onSubmit}>
                <input className='searchbox1' onChange={onChange} value={keyword} id="keyword" type="text" placeholder="Search by Keyword"/>
                <input className='searchbox3' onChange={onChange} value={title} type="text"  id="title" placeholder="Search by Title"/>
                <input className='searchbox2' onChange={onChange} value={location} type="text"  id="location"  placeholder="Search by Location(s)"/>
                <button className="btn btn-success searchbtn1" type="submit">Search Jobs</button>
                <button className="btn btn-success searchbtn2" onClick={onReset} type="button">Reset</button>
            </form>
        </div>

        {/* Table */}
        {/* <Pagination postsPerPage={postsPerPage} totalPosts={searchData.length} paginate={paginate}/>  */}
        
     


        <table className="table">
            <thead>
                <tr>
                <th scope="col"><a href="!#" id='title' onClick={onSort}>Title </a>
                </th>
                <th scope="col"><a href="!#" id='location' onClick={onSort}>Location(s) </a>
                
                </th>
                <th scope="col"><a href="!#" id='datePosted' onClick={onSort}>Date Posted </a>
                
                </th>
                <div className="chevron">
                {sortData ? <span><MDBIcon fas icon="sort-amount-up" /> </span>: <span><MDBIcon fas icon="sort-amount-down" /></span>}
                
                </div>

                </tr>
            </thead>
            <tbody>
                    {currentPosts.map( (d, i) => (
                    <tr key={i}>
                        <td>{d.title}</td>
                        <td>{d.location}</td>
                        <td>{d.datePosted}</td>
                    </tr>
                     ))}
            </tbody>
        </table>

        <div className="pagin">
         <Pagination postsPerPage={postsPerPage} totalPosts={searchData.length} paginate={paginate} /> 
        </div>
        
        <Footer/>
    </>
  )
}
export default Search