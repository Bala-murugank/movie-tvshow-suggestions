import React,{useState} from 'react'
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";


const Pagination = ({setPage,page}) => {

    const [pageLimit] = useState([1, 2, 3, 4, 5]);
 

    const scrollUp = () => {
      window.scrollTo(0,0)
 }
  return (
    <div>
      <div className="pagination">
            <span
              onClick={() => {
                page > 1 && setPage(page - 1);
                scrollUp()
                if (page > 1 && pageLimit[0] > 1) {
                  pageLimit.pop();
                  pageLimit.unshift(pageLimit[0] - 1);
                }
              }}
            >
              <FaChevronCircleLeft />
            </span>
            {pageLimit.map((pageNumber) => (
              <span
                key={pageNumber}
                className={page === pageNumber ? "selected_page" : ""}
                onClick={() => {
                  page !== pageNumber + 1 && setPage(pageNumber);
                  scrollUp()
                }}
              >
                {pageNumber}
              </span>
            ))}
            <span
              onClick={() => {
                setPage(page + 1);
                scrollUp()
                

                if (page >= pageLimit.length) {
                  pageLimit.push(page + 1);

                  pageLimit.splice(0, 1);
                } 
              }}
            >
              <FaChevronCircleRight />
            </span>
          </div>
        
      </div>
  
  )
}

export default Pagination
