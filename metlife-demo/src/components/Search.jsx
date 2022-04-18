import { useEffect, useState } from "react"
import data from '../data'
import Pagination from "./Pagination"
import './Search.css'
import InitialOrder from "./Table"


const Search = () => {


    const [searchTerm, setSearchTerm] = useState('')
    const [searchData, setSearchData] = useState(data)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    const [formData, setFormData] = useState({
        keyword:'',
        title:'',
        location:''
    })


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
        
    }
   

    //Get current data and make them divide into 10 per page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = searchData.slice(indexOfFirstPost, indexOfLastPost)

    //Paginate
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    const onSort = (e) => {
        console.log(e.target.id);
        
        const nData = [...searchData]
        console.log('nData',nData);
        if(e.target.id === 'title'){
            const sortedData = nData.sort((a, b) => a.title.localeCompare(b.title))
            return setSearchData(sortedData)
        }
        else if(e.target.id ==='location'){
            const sortedData = nData.sort((a, b) => a.location.localeCompare(b.location))
            return setSearchData(sortedData)
        }
        else if(e.target.id ==='datePosted'){
            const sortedData = nData.sort((a, b) => a.datePosted.localeCompare(b.datePosted))
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
                <th scope="col"><a href="!#" id='title' onClick={onSort}>Title</a></th>
                <th scope="col"><a href="!#" id='location' onClick={onSort}>Location(s)</a></th>
                <th scope="col"><a href="!#" id='datePosted' onClick={onSort}>Date Posted</a></th>
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
         <Pagination postsPerPage={postsPerPage} totalPosts={searchData.length} paginate={paginate}/> 
        </div>

    </>
  )
}
export default Search