import { Link } from "react-router-dom";

type productData = {
  _id: string;
  brand?: {
    name?: string;
    _id?: string;
  };
  category: string;
  description: string;
  imageURLs: string;
  name: string;
  unit: string;
  price: number;
};

const OurProductItem = ({ data }: { data: productData }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-haven-border/60 bg-white p-2 shadow-card transition hover:-translate-y-1 hover:shadow-warm">
      <Link
        key={data?._id}
        to={`/product/${data?._id}`}
        className="flex flex-1 flex-col"
      >
        <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-haven-muted">
          <img
            src={data?.imageURLs}
            alt={data?.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-2 top-2 rounded-full bg-haven-green px-2.5 py-1 text-[10px] font-bold text-white shadow">
            {data?.category}
          </span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-haven-green">
          {data?.brand?.name}
        </p>
        <h3 className="mt-1 flex-1 truncate font-display text-sm font-semibold leading-snug text-haven-ink group-hover:text-haven-primary">
          {data?.name}
        </h3>
        <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-4 text-haven-mutedInk">
          {data?.description}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-haven-border/60 pt-3">
          <p className="font-display text-sm font-bold text-haven-ink">
            ৳{data?.price}
            <span className="ml-1 text-xs font-normal text-haven-mutedInk">/ {data?.unit}</span>
          </p>
          <span className="shrink-0 rounded-full bg-haven-primary px-3 py-1.5 text-[11px] font-bold text-white transition group-hover:bg-haven-primaryHover">
            View item
          </span>
        </div>
      </Link>
    </article>
  );
};

export default OurProductItem;
