import './Pagination.css'

const Pagination = ({postsPerPage, totalPosts, paginate, active}) => {

  

    const pageNumbers = []

    for(let i=1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }
  return (
      
    <nav className='pagNav'>
        <ul className="pagination pagUl">
        <p>Pages: </p> 
            {pageNumbers.map(number => (
                <li key={number} className='page-item' >
                    <a onClick={() => paginate(number)} href="#" className="page-link">{number}</a>
                </li>
            ))}
        </ul>
    </nav>
  )
}
export default Pagination