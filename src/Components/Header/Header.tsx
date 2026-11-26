import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1200&q=85",
];

const ImageBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-haven-canvas via-haven-muted to-haven-canvas">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-20">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-haven-green shadow-card">
            <span aria-hidden="true">✦</span>
            Curated independent makers
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-haven-ink sm:text-5xl lg:text-6xl">
            Craft food &amp; chef creations{" "}
            <span className="font-serif italic text-haven-primary">delivered</span>{" "}
            to your door.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-haven-mutedInk sm:text-lg">
            Discover small-batch pantry staples, farm-fresh delicacies, award-winning
            bakeries, and chef-prepared feasts from the artisans who make them.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/allProducts"
              className="inline-flex items-center gap-2 rounded-xl bg-haven-primary px-6 py-3.5 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-haven-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haven-primary"
            >
              Explore fresh finds <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/brands"
              className="inline-flex items-center gap-2 rounded-xl border border-haven-border bg-white px-6 py-3.5 text-sm font-bold text-haven-ink transition hover:-translate-y-0.5 hover:text-haven-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haven-primary"
            >
              Find local kitchens
            </Link>
          </div>
          <div className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-haven-mutedInk">
              Popular aisles
            </p>
            <div className="flex flex-wrap gap-2">
              {["🥖 Sourdough", "🧀 Artisan cheese", "🍝 Truffle pasta", "🥐 Vegan bakery", "🍯 Small-batch honey"].map((item) => (
                <Link
                  key={item}
                  to="/allProducts"
                  className="rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-haven-ink shadow-card transition hover:bg-haven-greenLight"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-xs font-medium text-haven-mutedInk">
            <span><strong className="text-haven-ink">120+</strong> eco-certified purveyors</span>
            <span><strong className="text-haven-ink">34 min</strong> average express courier</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div className="absolute -right-5 -top-5 z-10 grid h-20 w-20 rotate-6 place-content-center rounded-full bg-haven-greenLight text-center text-[10px] font-bold uppercase leading-tight text-haven-green shadow-card">
            Farm
            <br />
            fresh
          </div>
          <article className="overflow-hidden rounded-3xl bg-white shadow-warm">
            <div className="relative h-72 overflow-hidden sm:h-96">
              {images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt="Freshly baked artisan sourdough"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <span className="absolute left-4 top-4 rounded-full bg-haven-green px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Today&apos;s oven drop
              </span>
              <span className="absolute bottom-4 right-4 rounded-xl bg-white px-4 py-2 font-display text-lg font-bold text-haven-primary shadow-card">
                $8.50
              </span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-haven-primary">
                  Golden Hearth Bakery
                </span>
                <span className="text-sm font-bold text-haven-ink">★ 4.9 <span className="font-normal text-haven-mutedInk">(320)</span></span>
              </div>
              <h2 className="mt-2 font-display text-xl font-bold text-haven-ink">
                Smoked Honey &amp; Sea Salt Sourdough
              </h2>
              <p className="mt-2 text-sm leading-6 text-haven-mutedInk">
                Stone-milled heritage grains, slow-fermented for 36 hours, finished
                with flaky sea salt and wildflower honey.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-haven-border pt-4">
                <span className="text-xs font-semibold text-haven-green">◉ 25-min delivery</span>
                <Link to="/allProducts" className="rounded-lg bg-haven-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-haven-primaryHover">
                  Shop artisan food
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ImageBanner;
