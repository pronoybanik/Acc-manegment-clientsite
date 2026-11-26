import { Link } from "react-router-dom";

type BrandCardData = {
  _id: string;
  name: string;
  description?: string;
  email?: string;
  location?: string;
  products?: {
    _id?: string;
    name?: string;
    category?: string;
  }[];
  status?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
};

const BrandCard = ({ BrandData }: { BrandData: BrandCardData }) => {
  const categories = Array.from(
    new Set(
      (BrandData.products ?? [])
        .map((product) => product.category)
        .filter((category): category is string => Boolean(category))
    )
  ).slice(0, 3);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-haven-border/70 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-warm">
      <Link
        to={`/brands/${BrandData._id}`}
        aria-label={`View ${BrandData.name} kitchen and menu`}
        className="relative block h-48 overflow-hidden bg-haven-muted"
      >
        <img
          src={BrandData.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=85"}
          alt={`${BrandData.name} artisan kitchen`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[9px] font-semibold text-haven-ink shadow-card">
          <span aria-hidden="true" className="text-haven-green">✓</span> Verified Maker
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold text-haven-ink shadow-card">
          ★ {(BrandData.rating ?? 4.98).toFixed(2)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4">
        <div className="relative z-10 -mt-7 mb-2 flex items-end justify-between gap-2">
          <img
            src={BrandData.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300&q=80"}
            alt=""
            className="h-14 w-14 rounded-full border-4 border-white bg-haven-muted object-cover shadow-card"
          />
          <span className="rounded-full bg-haven-muted px-2 py-1 text-[8px] font-semibold text-haven-mutedInk">
            {BrandData.location || "Independent artisan"}
          </span>
        </div>
        <h2 className="font-display text-base font-bold text-haven-ink transition group-hover:text-haven-primary">
          {BrandData.name}
        </h2>
        <p className="mt-1 line-clamp-2 min-h-9 text-[10px] leading-4 text-haven-mutedInk">
          {BrandData.description || "Small-batch goods, made with care by local artisans."}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(categories.length > 0 ? categories : [BrandData.status || "Small Batch"]).map((category) => (
            <span key={category} className="rounded-full bg-haven-greenLight/50 px-2 py-1 text-[8px] font-semibold text-haven-green">
              {category}
            </span>
          ))}
        </div>
        <Link
          to={`/brands/${BrandData._id}`}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-haven-muted py-2.5 text-[10px] font-semibold text-haven-ink transition hover:bg-haven-primary hover:text-white"
        >
          View Kitchen &amp; Menu <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
};

export default BrandCard;
