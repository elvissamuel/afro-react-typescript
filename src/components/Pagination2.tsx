import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate an array of page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center my-4">
      <ul className="flex list-none p-0">
        <li>
          <button
            className={`px-4 py-2 mx-1 border rounded ${currentPage === 1 ? 'bg-secondaryColor text-primaryColor cursor-not-allowed' : 'bg-white hover:bg-gray-200'}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`px-4 py-2 mx-1 border rounded ${currentPage === page ? 'bg-primaryColor text-white' : 'bg-white hover:bg-gray-200'}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`px-4 py-2 mx-1 border rounded ${currentPage === totalPages ? 'bg-secondaryColor text-primaryColor cursor-not-allowed' : 'bg-white hover:bg-gray-200'}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
