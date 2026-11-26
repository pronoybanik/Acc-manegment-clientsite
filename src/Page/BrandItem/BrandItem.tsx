import { Link, useParams } from "react-router-dom";
import { useGetBrandItemQuery } from "../../Features/Brands/BrandsAPi";
import Loading from "../../Shared/Loading/Loading";
import Errors from "../../Shared/Errors/Errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type BrandProduct = {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  imageURLs?: string | string[];
  price?: number;
  unit?: string;
};

type BrandDetails = {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  status?: string;
  image?: string;
  products?: BrandProduct[];
};

const BrandItem = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetBrandItemQuery(id);
  const brand: BrandDetails | undefined = data?.data;
  const products = brand?.products ?? [];

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

  if (isLoading) {
    return <main className="mx-auto max-w-7xl px-5 py-10"><Loading /></main>;
  }

  if (isError) {
    return <main className="mx-auto max-w-7xl px-5 py-10"><Errors>{getErrorText(error)}</Errors></main>;
  }

  if (!brand) {
    return <main className="mx-auto max-w-7xl px-5 py-10"><Errors>Maker not found.</Errors></main>;
  }

  const getImageUrl = (imageURLs?: string | string[]) =>
    Array.isArray(imageURLs) ? imageURLs[0] : imageURLs;

  return (
    <main className="bg-haven-canvas text-haven-ink">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[10px] text-haven-mutedInk">
          <Link to="/" className="transition hover:text-haven-primary">Market</Link>
          <span className="opacity-40">/</span>
          <Link to="/brands" className="transition hover:text-haven-primary">Artisan Makers</Link>
          <span className="opacity-40">/</span>
          <span className="truncate font-semibold text-haven-ink">{brand.name}</span>
        </nav>

        <section className="overflow-hidden rounded-xl bg-white shadow-warm">
          <div className="grid lg:grid-cols-12">
            <div className="relative min-h-64 bg-haven-muted lg:col-span-6 lg:min-h-[420px]">
              <img
                src={brand.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=85"}
                alt={`${brand.name} artisan kitchen`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider text-haven-green shadow-card">
                ✦ Verified Maker Spotlight
              </span>
            </div>
            <div className="flex flex-col justify-between gap-5 p-5 sm:p-8 lg:col-span-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-haven-primary">{brand.location || "Independent Artisan"}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-haven-greenLight/60 px-2.5 py-1 text-[8px] font-bold text-haven-green">
                    <span aria-hidden="true">✓</span>{brand.status || "Verified Maker"}
                  </span>
                </div>
                <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{brand.name}</h1>
                <p className="mt-3 text-xs leading-6 text-haven-mutedInk">{brand.description || "A local artisan kitchen creating small-batch goods with care."}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-lg bg-haven-muted p-3">
                <div>
                  <p className="text-[8px] font-bold uppercase text-haven-mutedInk">Menu</p>
                  <p className="mt-1 font-display text-sm font-bold">{products.length} items</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold uppercase text-haven-mutedInk">Kitchen</p>
                  <p className="mt-1 line-clamp-1 text-[10px] font-semibold">{brand.name}</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold uppercase text-haven-mutedInk">Sourcing</p>
                  <p className="mt-1 line-clamp-1 text-[10px] font-semibold text-haven-green">{brand.location || "Local"}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-haven-greenLight px-3 py-1.5 text-[8px] font-semibold text-haven-green">Independent maker</span>
                <span className="rounded-full bg-[#ffebe4] px-3 py-1.5 text-[8px] font-semibold text-haven-primary">Small-batch craft</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-wider text-haven-green">Made by {brand.name}</p>
              <h2 className="mt-1 font-display text-2xl font-bold">Kitchen &amp; Menu</h2>
            </div>
            <Link to="/brands" className="text-[10px] font-bold text-haven-primary hover:underline">← Back to all makers</Link>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const imageUrl = getImageUrl(product.imageURLs);

                return (
                  <article key={product._id} className="group flex flex-col overflow-hidden rounded-xl border border-haven-border/70 bg-white p-2 shadow-card transition hover:-translate-y-1 hover:shadow-warm">
                    <Link to={`/product/${product._id}`} className="flex flex-1 flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-haven-muted">
                        {imageUrl && <img src={imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
                        {product.category && <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[8px] font-bold text-haven-green">{product.category}</span>}
                      </div>
                      <h3 className="mt-3 font-display text-sm font-bold text-haven-ink transition group-hover:text-haven-primary">{product.name}</h3>
                      <p className="mt-1 line-clamp-2 min-h-8 text-[10px] leading-4 text-haven-mutedInk">{product.description}</p>
                    </Link>
                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-haven-border pt-3">
                      <p className="font-display text-sm font-bold text-haven-ink">
                        {product.price != null ? `৳${product.price}` : "Ask for price"}
                        {product.unit && <span className="ml-1 text-[9px] font-normal text-haven-mutedInk">/ {product.unit}</span>}
                      </p>
                      <Link to={`/product/${product._id}`} className="rounded-full bg-haven-primary px-3 py-1.5 text-[9px] font-bold text-white transition hover:bg-haven-primaryHover">View item</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-8 text-center shadow-card">
              <h3 className="font-display text-base font-bold">This kitchen is preparing its menu</h3>
              <p className="mt-1 text-xs text-haven-mutedInk">Check back soon for this maker's latest offerings.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BrandItem;
