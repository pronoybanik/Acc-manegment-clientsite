import { useDispatch } from "react-redux";
import { changePageNumber } from "../../Features/Products/ProductSlice";

interface ProductPaginationProps {
  currentPage: number;
  pageNumber: number;
}

const ProductPagination = ({
  currentPage,
  pageNumber,
}: ProductPaginationProps) => {
  const dispatch = useDispatch();
  const pageCount = Number.isFinite(Number(pageNumber))
    ? Math.max(1, Math.floor(Number(pageNumber)))
    : 1;
  const page = Number.isFinite(Number(currentPage))
    ? Math.min(pageCount, Math.max(1, Math.floor(Number(currentPage))))
    : 1;

  const goToPage = (nextPage: number) => {
    dispatch(changePageNumber(nextPage));
  };

  return (
    <nav
      aria-label="Product pagination"
      className="mx-auto mt-5 flex w-fit max-w-full items-center gap-2 rounded-full bg-haven-muted p-1.5"
    >
      <button
        type="button"
        aria-label="Go to previous page"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-haven-border bg-white px-3.5 text-xs font-semibold text-haven-ink transition hover:border-haven-green hover:text-haven-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-primary/30 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-haven-muted disabled:text-haven-mutedInk/50 sm:px-4"
      >
        <span aria-hidden="true">←</span>
        <span>Previous</span>
      </button>

      <p
        aria-live="polite"
        className="flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 text-xs text-haven-mutedInk"
      >
        <span>Page</span>
        <strong className="font-display text-sm text-haven-primary">{page}</strong>
        <span>of {pageCount}</span>
      </p>

      <button
        type="button"
        aria-label="Go to next page"
        disabled={page === pageCount}
        onClick={() => goToPage(page + 1)}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-haven-primary bg-haven-primary px-3.5 text-xs font-semibold text-white transition hover:bg-haven-primaryHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-primary/30 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-haven-muted disabled:text-haven-mutedInk/50 sm:px-4"
      >
        <span>Next</span>
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
};

export default ProductPagination;
