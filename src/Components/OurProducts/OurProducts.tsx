import React from "react";
import { Link } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import OurProductItem from "../OurProductItem/OurProductItem";
import Errors from "../../Shared/Errors/Errors";
import Loading from "../../Shared/Loading/Loading";
import { HomepageBrand, HomepageProduct } from "../HomepageSections/homepageTypes";

type OurProductsProps = {
  products: HomepageProduct[];
  brands: HomepageBrand[];
  brandsLoading: boolean;
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
};

const OurProducts = ({
  products,
  brands,
  brandsLoading,
  isLoading,
  isError,
  error,
}: OurProductsProps) => {
  const [brandName, setBrandName] = React.useState("");

  const getErrorText = (
    queryError: FetchBaseQueryError | SerializedError | undefined
  ): string => {
    if (
      queryError &&
      "data" in queryError &&
      queryError.data &&
      typeof queryError.data === "object" &&
      "error" in queryError.data &&
      typeof queryError.data.error === "string"
    ) {
      return queryError.data.error || "An error occurred";
    }

    return "An error occurred";
  };

  const filteredProducts = brandName
    ? products.filter(
        (product) =>
          product.brand?.name?.toLowerCase() === brandName.toLowerCase()
      )
    : products;

  const sortedProducts = [...filteredProducts]
    .sort((first, second) => second.price - first.price)
    .slice(0, 6);

  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <Errors>{getErrorText(error)}</Errors>;
  } else if (sortedProducts.length === 0) {
    content = <Errors>No products are available for this maker.</Errors>;
  } else {
    content = sortedProducts.map((product) => (
      <OurProductItem key={product._id} data={product} />
    ));
  }

  return (
    <section className="bg-haven-muted py-12 sm:py-16" id="trending">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-haven-primary">
              Customer obsessions
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-haven-ink sm:text-3xl">
              Trending pantry &amp; kitchen releases
            </h2>
          </div>
          <Link
            to="/allProducts"
            className="text-sm font-bold text-haven-primary hover:underline"
          >
            Browse all products <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setBrandName("")}
            aria-pressed={brandName === ""}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              brandName === ""
                ? "bg-haven-green text-white"
                : "bg-white text-haven-mutedInk hover:text-haven-primary"
            }`}
          >
            All trending
          </button>
          {brands.slice(0, 5).map((brand) => (
            <button
              type="button"
              key={brand._id}
              onClick={() => setBrandName(brand.name)}
              aria-pressed={brandName === brand.name}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                brandName === brand.name
                  ? "bg-haven-green text-white"
                  : "bg-white text-haven-mutedInk hover:text-haven-primary"
              }`}
            >
              {brand.name}
            </button>
          ))}
          {brandsLoading && brands.length === 0 && (
            <span className="ml-2 text-xs text-haven-mutedInk" role="status">
              Loading makers…
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {content}
        </div>
        <Link
          to="/allProducts"
          className="mx-auto mt-8 flex w-fit rounded-xl bg-haven-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-haven-primaryHover"
        >
          See more products
        </Link>
      </div>
    </section>
  );
};

export default OurProducts;
