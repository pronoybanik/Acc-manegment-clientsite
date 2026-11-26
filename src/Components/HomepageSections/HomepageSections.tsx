import { Link } from "react-router-dom";
import { HomepageBrand } from "./homepageTypes";

const FeastBox = () => (
  <section className="bg-haven-muted py-12 sm:py-16" id="feast-box">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl bg-[#202b25] text-white shadow-warm">
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-haven-primary/20 blur-3xl" />
        <div className="relative grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-5 lg:p-12">
          <div className="lg:col-span-3">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ffb59f]">
              Chef&apos;s weekly signature box
            </span>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight sm:text-4xl">
              Weekend Mediterranean Tapas Feast Box
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              A generous spread of Iberico ham, aged Manchego, marinated olives,
              toasted tomato bread, and single-estate olive oil, curated for a
              memorable evening around the table.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-xs font-medium text-white/85 sm:grid-cols-3">
              {["Ibérico de Bellota", "Aged Manchego", "Pan con tomate", "Gordal olives", "Cold-pressed olive oil", "Serves 2–3"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-haven-greenLight" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <span className="font-display text-2xl font-bold">$48.00</span>
              <span className="rounded-full bg-haven-primary/20 px-3 py-2 text-xs font-semibold text-[#ffb59f]">
                Limited Friday delivery
              </span>
            </div>
            <Link
              to="/allProducts"
              className="mt-5 inline-flex rounded-xl bg-haven-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-haven-primaryHover"
            >
              Explore weekend favourites <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="relative lg:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
              alt="Mediterranean feast with fresh bread, olives, and vegetables"
              className="h-64 w-full rounded-2xl object-cover sm:h-80"
            />
            <span className="absolute bottom-3 left-3 rounded-lg bg-[#202b25]/85 px-3 py-2 text-xs font-semibold text-white">
              Delivered chilled and ready to share
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

type FeaturedKitchensProps = {
  brands: HomepageBrand[];
  isLoading: boolean;
  isError: boolean;
};

const FeaturedKitchens = ({
  brands,
  isLoading,
  isError,
}: FeaturedKitchensProps) => {
  return (
    <section className="bg-haven-canvas py-12 sm:py-16" id="artisan-kitchens">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-haven-green">Meet the creators</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-haven-ink sm:text-3xl">Featured artisan kitchens</h2>
          </div>
          <Link to="/brands" className="text-xs font-bold text-haven-primary hover:underline sm:text-sm">
            Explore all kitchens <span aria-hidden="true">→</span>
          </Link>
        </div>
        {isLoading ? (
          <p className="rounded-xl bg-white p-5 text-sm text-haven-mutedInk" role="status">Loading artisan kitchens…</p>
        ) : isError ? (
          <p className="rounded-xl bg-white p-5 text-sm text-haven-primary" role="alert">
            Artisan kitchens could not be loaded. Please try again later.
          </p>
        ) : brands.length === 0 ? (
          <p className="rounded-xl bg-white p-5 text-sm text-haven-mutedInk">No artisan kitchens are available right now.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brands.slice(0, 4).map((brand) => (
              <Link
                to={`/brands/${brand._id}`}
                key={brand._id}
                className="group overflow-hidden rounded-2xl border border-haven-border bg-white shadow-card transition hover:-translate-y-1 hover:shadow-warm"
              >
                <img
                  src={brand.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"}
                  alt={brand.name}
                  className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-haven-ink group-hover:text-haven-primary">{brand.name}</h3>
                    <span className="text-xs font-bold text-haven-ink">★ 4.9</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-haven-mutedInk">
                    {brand.description || "Small-batch goods, made with care by local artisans."}
                  </p>
                  <p className="mt-3 text-[10px] font-semibold text-haven-green">
                    {brand.location || "Independent artisan"}
                  </p>
                  <span className="mt-4 block rounded-lg bg-haven-muted py-2 text-center text-xs font-bold text-haven-ink transition group-hover:bg-haven-green group-hover:text-white">
                    View kitchen
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const FoodieDifference = () => {
  const benefits = [
    { icon: "✦", title: "Vetted artisans only", text: "Every maker is selected for thoughtful craft, honest sourcing, and quality you can taste.", tone: "bg-[#ffebe4] text-haven-primary" },
    { icon: "❄", title: "Guaranteed fresh", text: "Careful handling keeps every delivery fresh from the maker to your table.", tone: "bg-[#e2f4e9] text-haven-green" },
    { icon: "♧", title: "Nothing unnecessary", text: "Simple, recognizable ingredients—without fillers or artificial shortcuts.", tone: "bg-[#fff0df] text-[#8b4c11]" },
    { icon: "♡", title: "Support makers directly", text: "Every order helps independent farms, bakeries, and kitchens thrive.", tone: "bg-[#e2f4e9] text-haven-green" },
  ];

  return (
    <section className="bg-haven-muted py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-haven-green">Our culinary charter</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-haven-ink sm:text-3xl">The Foodie Haven difference</h2>
          <p className="mt-3 text-sm leading-6 text-haven-mutedInk">
            Bringing master producers and curious food lovers together through
            honest sourcing and a love of culinary craft.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-2xl border border-haven-border bg-white p-5 shadow-card transition hover:-translate-y-1">
              <span className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${benefit.tone}`} aria-hidden="true">{benefit.icon}</span>
              <h3 className="mt-4 font-display text-base font-bold text-haven-ink">{benefit.title}</h3>
              <p className="mt-2 text-xs leading-5 text-haven-mutedInk">{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClubBanner = () => (
  <section className="bg-haven-muted py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-haven-green p-6 text-white shadow-warm sm:p-9 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="rounded-full bg-haven-greenLight px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-haven-green">
            The culinary club
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">A little more joy in every delivery.</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
            Discover limited-run artisan releases, seasonal menus, and new makers
            worth gathering around.
          </p>
        </div>
        <Link
          to="/allProducts"
          className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-bold text-haven-green transition hover:bg-haven-greenLight"
        >
          Explore the marketplace <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  </section>
);

export { FeaturedKitchens, FoodieDifference, FeastBox, ClubBanner };
