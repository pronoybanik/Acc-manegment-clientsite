import React from "react";
import {
  useGetProductsQuery,
  useGetProductPaginationQuery,
  useGetProductsCategoryQuery,
} from "../../Features/Products/ProductApi";
import Loading from "../../Shared/Loading/Loading";
import Errors from "../../Shared/Errors/Errors";
import OurProductItem from "../../Components/OurProductItem/OurProductItem";
import ProductPagination from "../../Shared/ProductPagination/ProductPagination";
import { useSelector } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Store } from "../../App/Store";
import { useSearchParams } from "react-router-dom";

type ProductData = {
  _id: string;
  brand?: {
    name?: string;
    _id?: string;
  };
  price: number;
  category: string;
  description: string;
  imageURLs: string;
  name: string;
  unit: string;
};

const productCategories = [
  { value: "rice", label: "Rice" },
  { value: "oil", label: "Oil" },
  { value: "tree", label: "Tree" },
  { value: "colddrinks", label: "Cold Drinks" },
  { value: "thesoap", label: "The Soap" },
];

type RootState = ReturnType<typeof Store.getState>;

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.trim() ?? "";
  const searchTerm = searchQuery.toLowerCase();
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedProducers, setSelectedProducers] = React.useState<string[]>(
    []
  );
  const [priceLimit, setPriceLimit] = React.useState<number | null>(null);
  const [sortBy, setSortBy] = React.useState("featured");
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const { pageNumber } = useSelector(
    (state: RootState) => state?.productFilter
  );
  const limit = 9;

  const {
    data: allProduct,
    isLoading: productsLoading,
    isError: productsIsError,
    error: productsError,
  } = useGetProductPaginationQuery({ pageNumber, limit }, {
    skip: Boolean(searchTerm),
  });

  const {
    data: searchProducts,
    isLoading: searchProductsLoading,
    isError: searchProductsIsError,
    error: searchProductsError,
  } = useGetProductsQuery({}, {
    skip: !searchTerm || Boolean(selectedCategory),
  });

  const {
    data: categoryProducts,
    isLoading: categoryLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useGetProductsCategoryQuery(selectedCategory, {
    skip: !selectedCategory,
  });

  const getErrorText = (
    error: FetchBaseQueryError | SerializedError | undefined
  ): string => {
    if (
      error &&
      "data" in error &&
      error.data &&
      typeof error.data === "object" &&
      "error" in error.data &&
      typeof error.data.error === "string"
    ) {
      return error.data.error || "An error occurred";
    }

    return "An error occurred";
  };

  const pageProducts: ProductData[] = allProduct?.data?.products ?? [];
  const candidateProducts: ProductData[] = selectedCategory
    ? categoryProducts?.data?.products ?? []
    : searchTerm
      ? searchProducts?.data?.products ?? []
      : pageProducts;
  const sourceProducts = candidateProducts.filter((product) => {
    if (!searchTerm) {
      return true;
    }

    const searchableText = [
      product.name,
      product.brand?.name,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchTerm
      .split(/\s+/)
      .every((term) => searchableText.includes(term));
  });
  const producerOptions = Array.from(
    new Set(
      sourceProducts
        .map((product) => product.brand?.name)
        .filter((name): name is string => Boolean(name))
    )
  );
  const highestPrice = Math.max(
    1,
    ...sourceProducts.map((product) => Number(product.price) || 0)
  );
  const activePriceLimit = priceLimit ?? highestPrice;
  const visibleProducts = sourceProducts
    .filter(
      (product) =>
        Number(product.price) <= activePriceLimit &&
        (selectedProducers.length === 0 ||
          selectedProducers.includes(product.brand?.name ?? ""))
    )
    .sort((first, second) => {
      if (sortBy === "price-asc") {
        return Number(first.price) - Number(second.price);
      }
      if (sortBy === "price-desc") {
        return Number(second.price) - Number(first.price);
      }
      if (sortBy === "name") {
        return first.name.localeCompare(second.name);
      }
      return 0;
    });

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedProducers([]);
    setPriceLimit(null);
    setSortBy("featured");
  };

  const toggleProducer = (producer: string) => {
    setSelectedProducers((current) =>
      current.includes(producer)
        ? current.filter((name) => name !== producer)
        : [...current, producer]
    );
  };

  const isLoading =
    (!searchTerm && productsLoading) ||
    (Boolean(searchTerm) && !selectedCategory && searchProductsLoading) ||
    (Boolean(selectedCategory) && categoryLoading);
  const isError =
    (!searchTerm && productsIsError) ||
    (Boolean(searchTerm) && !selectedCategory && searchProductsIsError) ||
    (Boolean(selectedCategory) && categoryIsError);
  const error = selectedCategory
    ? categoryError
    : searchTerm
      ? searchProductsError
      : productsError;
  const content = isLoading ? (
    <Loading />
  ) : isError ? (
    <Errors>{getErrorText(error)}</Errors>
  ) : visibleProducts.length === 0 ? (
    <div className="rounded-xl bg-haven-muted px-6 py-12 text-center">
      <h2 className="font-display text-xl font-semibold text-haven-ink">
        No products match these filters
      </h2>
      <p className="mt-2 text-sm text-haven-mutedInk">
        {searchTerm
          ? "Try a different search or adjust your filters."
          : "Try changing your category, producer, or price range."}
      </p>
      <button
        type="button"
        onClick={resetFilters}
        className="mt-5 rounded-full bg-haven-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-haven-primaryHover"
      >
        Reset filters
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {visibleProducts.map((product) => (
        <OurProductItem key={product._id} data={product} />
      ))}
    </div>
  );

  return (
    <main className="min-h-[60vh] bg-haven-canvas">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-haven-green">
              Curated market hall
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-2xl font-semibold tracking-tight text-haven-ink sm:text-3xl">
                {searchTerm
                  ? `Search results for "${searchQuery}"`
                  : "All Artisanal Provisions"}
              </h1>
              <span className="rounded-full bg-haven-muted px-3 py-1 text-xs font-semibold text-haven-mutedInk">
                {visibleProducts.length}{" "}
                {visibleProducts.length === 1 ? "provision" : "provisions"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-haven-ink shadow-card lg:hidden"
            >
              <span aria-hidden="true">☷</span>
              Filters
            </button>
            <label className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs text-haven-mutedInk shadow-card">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="max-w-36 cursor-pointer bg-transparent font-bold text-haven-ink outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 lg:flex-row lg:gap-6">
          <aside
            className={`w-full shrink-0 rounded-xl bg-haven-muted p-5 lg:w-64 ${
              filtersOpen ? "block" : "hidden lg:block"
            }`}
            aria-label="Product filters"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-haven-ink">
                Refine Aisles
              </h2>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-bold text-haven-primary hover:underline"
              >
                Reset All
              </button>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-3 text-xs font-bold text-haven-ink">
                Aisle / Category
              </legend>
              <div className="space-y-2.5">
                {productCategories.map((category) => (
                  <label
                    key={category.value}
                    className="flex cursor-pointer items-center justify-between gap-3 text-xs text-haven-mutedInk"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category.value}
                        onChange={() =>
                          setSelectedCategory((current) =>
                            current === category.value ? "" : category.value
                          )
                        }
                        className="h-4 w-4 accent-haven-green"
                      />
                      {category.label}
                    </span>
                    <span>
                      {
                        pageProducts.filter(
                          (product) => product.category === category.value
                        ).length
                      }
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xs font-bold text-haven-ink">Price Range</h3>
                <span className="text-[11px] font-bold text-haven-primary">
                  Up to ৳{Math.round(activePriceLimit)}
                </span>
              </div>
              <input
                aria-label="Maximum price"
                type="range"
                min={0}
                max={highestPrice}
                value={Math.min(activePriceLimit, highestPrice)}
                onChange={(event) => setPriceLimit(Number(event.target.value))}
                className="w-full cursor-pointer accent-haven-primary"
              />
              <div className="flex justify-between text-[10px] text-haven-mutedInk">
                <span>৳0</span>
                <span>৳{Math.round(highestPrice)}+</span>
              </div>
            </div>

            {producerOptions.length > 0 && (
              <fieldset className="mt-6">
                <legend className="mb-3 text-xs font-bold text-haven-ink">
                  Producer / Kitchen
                </legend>
                <div className="space-y-2.5">
                  {producerOptions.map((producer) => (
                    <label
                      key={producer}
                      className="flex cursor-pointer items-center gap-2 text-xs text-haven-mutedInk"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducers.includes(producer)}
                        onChange={() => toggleProducer(producer)}
                        className="h-4 w-4 accent-haven-green"
                      />
                      <span className="truncate">{producer}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </aside>

          <section className="min-w-0 flex-1" aria-label="Products">
            {content}
            {!isLoading && !isError && !selectedCategory && !searchTerm && (
              <div className="mt-8">
                <p className="mb-3 text-center text-xs text-haven-mutedInk">
                  Showing {visibleProducts.length} products on this page
                </p>
                <ProductPagination
                  currentPage={allProduct?.data?.currentPage ?? 1}
                  pageNumber={allProduct?.data?.numberOfPage ?? 1}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default AllProducts;
