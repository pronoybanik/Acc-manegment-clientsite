import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BrandCard from "../../Components/BrandCard/BrandCard";
import { useGetBrandQuery } from "../../Features/Brands/BrandsAPi";
import Errors from "../../Shared/Errors/Errors";
import Loading from "../../Shared/Loading/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type BrandData = {
  _id: string;
  name: string;
  description?: string;
  email?: string;
  location?: string;
  products?: {
    _id?: string;
    name?: string;
    description?: string;
    unit?: string;
    imageURLs?: string | string[];
    category?: string;
  }[];
  status?: string;
  image?: string;
  createdAt?: string;
  rating?: number;
  reviewCount?: number;
};

const EMPTY_BRANDS: BrandData[] = [];

const categories = [
  { id: "all", label: "All Makers" },
  { id: "bakeries", label: "Bakeries" },
  { id: "creameries", label: "Creameries" },
  { id: "pantry", label: "Pantry & Oils" },
  { id: "kitchens", label: "Chef Kitchens" },
  { id: "roasters", label: "Roasters" },
];

const categoryTerms: Record<string, string[]> = {
  bakeries: ["bakery", "baker", "bread", "sourdough", "pastry", "croissant", "viennoiserie"],
  creameries: ["creamery", "cream", "dairy", "cheese", "milk", "butter"],
  pantry: ["pantry", "preserve", "oil", "herb", "truffle", "honey", "jam"],
  kitchens: ["chef", "kitchen", "restaurant", "ramen", "pasta", "smokehouse", "seafood"],
  roasters: ["roaster", "coffee", "cafe", "espresso", "bean"],
};

const Brands = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { data, isLoading, isError, error } = useGetBrandQuery({});
  const brands: BrandData[] = data?.data?.brands ?? EMPTY_BRANDS;
  const featuredBrand = brands[0];

  const filteredBrands = useMemo(() => {
    const query = search.trim().toLowerCase();

    return brands.filter((brand) => {
      const productDetails = (brand.products ?? [])
        .map((product) => `${product.name ?? ""} ${product.category ?? ""}`)
        .join(" ");
      const searchableText = `${brand.name} ${brand.location ?? ""} ${brand.description ?? ""} ${productDetails}`.toLowerCase();
      const matchesSearch = !query || searchableText.includes(query);
      const terms = categoryTerms[activeCategory] ?? [];
      const matchesCategory =
        activeCategory === "all" ||
        terms.some((term) => searchableText.includes(term));

      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, brands, search]);

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

  return (
    <main className="bg-haven-canvas text-haven-ink">
      <section className="bg-haven-muted/60 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-haven-greenLight px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-haven-green">
                <span aria-hidden="true">✦</span> Curated Pacific Northwest Purveyors
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Meet Our Artisan Makers &amp; Local Kitchens
              </h1>
              <p className="mt-3 max-w-2xl text-xs leading-5 text-haven-mutedInk sm:text-sm">
                Every loaf, wheel of aged cheese, and small-batch broth is crafted by independent masters who source directly from regional farms and coastal waters.
              </p>
            </div>
            <div className="w-full lg:w-[420px]">
              <div className="flex items-center rounded-full bg-white px-4 py-2.5 shadow-card">
                <span aria-hidden="true" className="mr-2 text-sm text-haven-mutedInk">⌕</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.currentTarget.value)}
                  aria-label="Search makers"
                  placeholder="Search by maker, neighborhood, or craft..."
                  className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-haven-mutedInk"
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")} aria-label="Clear search" className="ml-2 text-sm text-haven-mutedInk hover:text-haven-primary">×</button>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between px-2 text-[8px] text-haven-mutedInk sm:text-[9px]">
                <span>Showing <strong className="text-haven-ink">{filteredBrands.length}</strong> verified kitchens</span>
                <span className="flex items-center gap-1 text-haven-green"><span aria-hidden="true">♧</span> Same-day cold-chain active</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
                className={`shrink-0 rounded-full px-4 py-2 text-[10px] font-semibold shadow-card transition ${
                  activeCategory === category.id
                    ? "bg-haven-primary text-white"
                    : "bg-white text-haven-mutedInk hover:text-haven-primary"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {!isLoading && !isError && featuredBrand && (
        <section className="py-6 sm:py-8">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <article className="grid overflow-hidden rounded-xl bg-white shadow-warm lg:grid-cols-12">
              <div className="relative min-h-56 bg-haven-muted lg:col-span-6 lg:min-h-[320px]">
                <img
                  src={featuredBrand.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=85"}
                  alt={`${featuredBrand.name} artisan maker`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider text-haven-primary shadow-card">
                  ✦ Featured Maker Spotlight
                </span>
              </div>
              <div className="flex flex-col justify-between gap-4 p-5 sm:p-7 lg:col-span-6">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-haven-primary">
                      {featuredBrand.location || "Pacific Northwest"}{featuredBrand.createdAt ? ` • Est. ${new Date(featuredBrand.createdAt).getFullYear()}` : ""}
                    </span>
                    <span className="whitespace-nowrap text-[9px] font-bold text-[#8b4c11]">★ {(featuredBrand.rating ?? 4.98).toFixed(2)} <span className="font-normal">({featuredBrand.reviewCount ?? "640+"} reviews)</span></span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">{featuredBrand.name}</h2>
                  <p className="mt-2 text-[10px] leading-5 text-haven-mutedInk sm:text-xs">
                    {featuredBrand.description || "Independent makers bringing thoughtfully sourced, small-batch artisan goods to your table."}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 rounded-lg bg-haven-muted p-3">
                  <div><p className="text-[7px] font-bold uppercase text-haven-mutedInk">Delivery</p><p className="mt-1 text-[10px] font-semibold">Same-day</p></div>
                  <div><p className="text-[7px] font-bold uppercase text-haven-mutedInk">Signature</p><p className="mt-1 line-clamp-1 text-[10px] font-semibold">{featuredBrand.products?.[0]?.name || "Artisan Selection"}</p></div>
                  <div><p className="text-[7px] font-bold uppercase text-haven-mutedInk">Local Sourcing</p><p className="mt-1 line-clamp-1 text-[10px] font-semibold text-haven-green">{featuredBrand.location || "Pacific Northwest"}</p></div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {(featuredBrand.products ?? []).slice(0, 2).map((product) => (
                      <span key={product._id || product.name} className="rounded-full bg-haven-greenLight px-2.5 py-1 text-[8px] font-semibold text-haven-green">{product.category || product.name}</span>
                    ))}
                  </div>
                  <Link to={`/brands/${featuredBrand._id}`} className="inline-flex items-center gap-2 rounded-full bg-haven-primary px-4 py-2.5 text-[9px] font-bold text-white shadow-card transition hover:bg-haven-primaryHover">
                    Explore Featured Kitchen <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="pb-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Errors>{getErrorText(error)}</Errors>
          ) : filteredBrands.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBrands.map((brand) => (
                <BrandCard key={brand._id} BrandData={brand} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white px-5 py-12 text-center shadow-card">
              <span className="text-3xl text-haven-mutedInk" aria-hidden="true">♧</span>
              <h2 className="mt-2 font-display text-lg font-bold">No matching kitchens found</h2>
              <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-haven-mutedInk">
                Try clearing your search or selecting another culinary category to explore our local purveyors.
              </p>
              <button type="button" onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-4 rounded-full bg-haven-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-haven-primaryHover">
                Show All Makers
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Brands;
