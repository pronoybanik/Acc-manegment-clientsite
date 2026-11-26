
import { Link } from "react-router-dom";

const OurServices = () => {
  const aisles = [
    {
      icon: "🥐",
      title: "Bakery & Pastries",
    },
    {
      icon: "🧀",
      title: "Artisan Pantry",
    },
    {
      icon: "🥬",
      title: "Farm Cheeses",
    },
    {
      icon: "🍲",
      title: "Chef Kits",
    },
    {
      icon: "🫙",
      title: "Desserts & Cacao",
    },
    {
      icon: "☕",
      title: "Coffee & Herbs",
    },
    {
      icon: "🌿",
      title: "Plant-Based",
    },
  ];

  return (
    <section className="bg-haven-canvas py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-haven-green">Epicurean directory</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-haven-ink sm:text-3xl">Curated aisles</h2>
          </div>
          <p className="hidden max-w-sm text-right text-xs leading-5 text-haven-mutedInk sm:block">
            Explore artisan provisions, thoughtfully vetted for heritage sourcing and craft.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {aisles.map((aisle) => (
            <Link
              key={aisle.title}
              to="/allProducts"
              className="group rounded-2xl border border-transparent bg-white px-3 py-4 text-center shadow-card transition hover:-translate-y-1 hover:border-haven-greenLight"
            >
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-haven-muted text-2xl transition group-hover:bg-haven-greenLight">
                {aisle.icon}
              </span>
              <h3 className="mt-3 text-xs font-bold text-haven-ink">{aisle.title}</h3>
              <p className="mt-1 text-[10px] text-haven-mutedInk">Explore aisle</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
