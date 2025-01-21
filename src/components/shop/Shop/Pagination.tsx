import React from 'react';

interface ShopPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

const ShopPagination: React.FC<ShopPaginationProps> = ({ currentPage , totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-[60px] w-[60px] flex justify-center items-center rounded-md
            ${currentPage === page 
              ? 'bg-golden text-white' 
              : 'bg-white text-myblack border-2 border-golden hover:bg-golden hover:text-white'
            }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default ShopPagination;