const reviews = [
  {
    initials: "ES",
    name: "Elena S.",
    location: "Queen Anne, Seattle",
    quote:
      "The truffle tagliatelle tasted like it had just been rolled in a Bologna kitchen. Everything arrived fresh, fast, and beautifully packed.",
    tone: "bg-[#e2f4e9] text-haven-green",
  },
  {
    initials: "MR",
    name: "Marcus R.",
    location: "Capitol Hill, Seattle",
    quote:
      "Our weekend feast box turned an ordinary Friday into a little Spanish bistro night. The ingredients were exceptional.",
    tone: "bg-[#ffebe4] text-haven-primary",
  },
  {
    initials: "CL",
    name: "Chloe L.",
    location: "Ballard, Seattle",
    quote:
      "It feels good to support small food makers. The sourdough, cultured butter, and chili oil have become weekly favourites.",
    tone: "bg-[#fff0df] text-[#8b4c11]",
  },
];

const ClientReviews = () => (
  <section className="bg-haven-canvas py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-haven-primary">From the dining table</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-haven-ink sm:text-3xl">Stories from fellow epicures</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-display text-xl font-bold text-haven-ink">4.92 / 5</span>
          <span className="tracking-widest text-[#e99a37]" role="img" aria-label="5 out of 5 stars">★★★★★</span>
          <span className="hidden text-xs text-haven-mutedInk sm:inline">14,200+ orders</span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <blockquote key={review.name} className="flex flex-col justify-between rounded-2xl border border-haven-border bg-white p-5 shadow-card sm:p-6">
            <div>
              <div className="text-sm tracking-widest text-[#e99a37]" role="img" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="mt-3 text-sm italic leading-6 text-haven-ink">&ldquo;{review.quote}&rdquo;</p>
            </div>
            <footer className="mt-5 flex items-center justify-between gap-3 border-t border-haven-border pt-4">
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold ${review.tone}`} aria-hidden="true">
                  {review.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-haven-ink">{review.name}</p>
                  <p className="text-[10px] text-haven-mutedInk">{review.location}</p>
                </div>
              </div>
              <span className="rounded-full bg-haven-muted px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-haven-green">
                Verified
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
);

export default ClientReviews;
