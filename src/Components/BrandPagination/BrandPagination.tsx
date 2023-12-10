import React from "react";
import { useDispatch } from "react-redux";
import { changePageNumber } from "../../Features/Products/ProductSlice";

interface ProductPaginationProps {
  currentPage: number;
  pageNumber: number;
}

const BrandPagination: React.FC<ProductPaginationProps> = ({
  currentPage,
  pageNumber,
}) => {
  

  const dispatch = useDispatch();

  const incrementPageNumber = (pageCount: number) => {
    if (Number(pageCount) < Number(pageNumber)) {
      dispatch(changePageNumber(pageCount + 1));
    }
  };

  const decrementPageNumber = (pageCount: number) => {
    if (Number(pageCount) === 1) {
      alert("You are on page 1");
    } else {
      dispatch(changePageNumber(pageCount - 1));
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-4 w-96 mx-auto">
      <button
        disabled={Number(currentPage) === 1}
        onClick={() => decrementPageNumber(currentPage)}
        className="inline-flex disabled:bg-slate-500 disabled:text-white h-8 w-full px-2 py-2  items-center justify-center rounded border-2 border-gray-400 bg-white text-gray-900 rtl:rotate-180"
      >
        <span className="only">pre Page</span>
      </button>

      <button
        disabled={Number(currentPage) === Number(pageNumber)}
        onClick={() => incrementPageNumber(currentPage)}
        className="inline-flex  disabled:bg-slate-500 disabled:text-white  h-8 px-2 py-2 w-full items-center justify-center rounded border-2 border-gray-400 bg-white text-gray-900 rtl:rotate-180"
      >
        <span className="only">Next Page</span>
      </button>
    </div>
  );
};

export default BrandPagination;
