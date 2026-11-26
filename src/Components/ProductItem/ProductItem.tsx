import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetProductItemQuery, useGetProductsQuery } from "../../Features/Products/ProductApi";
import { useCreateOrderMutation } from "../../Features/Orders/OrdersApi";
import Loading from "../../Shared/Loading/Loading";
import Errors from "../../Shared/Errors/Errors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const galleryImages = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDApfOavvqSYW363Q85V-gY8Gl4P56qJKii9yfMOPCG-vz_tcm7uiQklQECWCwKv_1Xiu7-2B58Rk3dGRUbNw9b36ruKyOT3ogI6Z2TlRamD6ZMZUAF1tqHPH32U78eT5ROxkaaNBsNkIdFb6yb6QLhgUtUdB1WYCixNUk_JzJLgtBsAFf05HcdLO16SuYFYuMR2xoH-GVVciyVwfgfI3f50FZBg-7woE9K0z0Z41w",
    alt: "Whole rustic artisan sourdough loaf with a deeply caramelized crust",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5EPUJObP4rE_nP0e5X6jY_c_j5xLaKtiIVD_ns9wKlVDlDLggiFIkhe-JjmuH2faitQCrlVU-PwuztTOD4kH4FiM4ket9LVWuS0OuejnDN9I49hCUcD7FPAJRWXvitSKCwMz4LE9mR9w9TrZ9HYYag30mAOSqvLpsPW_BH4Mpqv7xUmcQSGjzY8SmUwsff-LNP1W6ixm0-VuBSQFQCxRuG1ZPZEqwhU028AeKrBM",
    alt: "Slice of sourdough bread showing its open crumb and cultured butter",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpOsY6nTb1S0eVZmzl-2cOG35dZOJQ40zrNuHdSp2ejvu1Qi6LFlUzJq_NfTLGOY13Uvx7HMLBqH-vW1TZkLiT-iX1IihymiALUWnBIdQ4dAMpcgtTFb6cspt_7s6mHl__6ZK0AulXH3wC-2rJKo5FxxSp2jiICLtQxztT17PUzJGwa50XShRLJKl4LkoOP8bvmjSYz62SKtZhaI4livmklK3b8v3OMO3sE2vjxIs",
    alt: "Baker scoring sourdough dough before baking",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWLUcUZidbWjdIFDwx1FD3XnrWaQZdrD-4KDlb_YZEodQCM6dKaUe3RuTRc764IW9UwboAAH43kzdkJeAWTeXGu-Lum-O0cZRzeUwjIsdL7fY1HKg0HBvFmXig9I_dCVpTeXXgZbDgoKM8nm_PxDzWsxXU3wMtF5MPsEor-AuUZXAYtDozUPB2Ae3k5XoMDv-lOUYDLy8Hbbs48J50PEjzHezvczif3bzZLj5Az3o",
    alt: "Artisan sourdough in a stamped kraft paper bag",
  },
];

const ingredientCards = [
  {
    image: galleryImages[2].src,
    alt: "Heritage einkorn grain flour",
    label: "Item 01",
    name: "Organic Einkorn & Red Fife Flour",
    description: "Stone-milled heritage grain from Skagit Valley, unbleached and unbromated. Rich in carotenoids and easy-to-digest ancient gluten proteins.",
    detail: "Net Weight: 450g Flour Base",
  },
  {
    image: galleryImages[0].src,
    alt: "Bubbling sourdough starter",
    label: "Item 02",
    name: "120-Year Mother Levain",
    description: "Wild yeasts nurtured since 1904, delivering complex lactic floral acidity without sharp sourness and incredible natural rise.",
    detail: "Culture: 100% Wild Ferment",
  },
  {
    image: galleryImages[1].src,
    alt: "Buttered sourdough crumb",
    label: "Item 03",
    name: "Pure Alpine Well Water",
    description: "Mineral-rich filtered mountain water provides optimal enzymatic activity for the signature 82% high-hydration open crumb.",
    detail: "Hydration: 82% Ratio",
  },
  {
    image: galleryImages[3].src,
    alt: "Artisan bread in kraft packaging",
    label: "Item 04",
    name: "Maldon Flaky Sea Salt",
    description: "Hand-harvested pyramid sea salt crystals kneaded into the dough and lightly dusted on its blistered caramelized crust.",
    detail: "Net Weight: 18g Mineral Salt",
  },
];

const reviews = [
  {
    name: "Jean-Luc M.",
    location: "Ballard",
    date: "Yesterday",
    title: "The crust crackles like firewood",
    quote: "I grew up in Brittany eating wood-fired sourdough. This loaf from Golden Hearth is the closest thing I have tasted on the West Coast. The blistered crust and its dark amber caramelized without bitterness, and the crumb is wonderfully moist and custardy.",
  },
  {
    name: "Sarah L.",
    location: "Capitol Hill",
    date: "4 days ago",
    title: "Best toast vehicle known to science",
    quote: "Thickly sliced, toasted in the pan with Normandy salted cultured butter—it is sublime. The 36-hour long fermentation gives it this mellow, wheaty sweetness rather than a harsh vinegar punch. Will order the double loaf next time!",
  },
  {
    name: "David K.",
    location: "Seattle",
    date: "1 week ago",
    title: "Still warm from the morning bake",
    quote: "Delivered in a breathable kraft bread bag around 4:15 PM, perfectly intact with zero steam sogginess. We tore into it immediately with some estate olive oil and flake salt. This bakery is an absolute Seattle gem.",
  },
];

const tabs = [
  { id: "inside", icon: "grain", label: "Loaf & Grain Anatomy" },
  { id: "prep", icon: "oven_gen", label: "Baker's Reheat & Slicing Guide" },
  { id: "provenance", icon: "agriculture", label: "Grain Provenance & Farmers" },
  { id: "nutrition", icon: "nutrition", label: "Nutrition & Storage" },
];

const ProductItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [productQuantity, setProductQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("inside");
  const [loafFormat, setLoafFormat] = useState<"single" | "double">("single");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const userItem = localStorage.getItem("userId");
  const userId = userItem ? JSON.parse(userItem) : null;

  const {
    data: productResponse,
    isError,
    isLoading,
    error,
  } = useGetProductItemQuery(id);
  const { data: productsResponse } = useGetProductsQuery({});
  const [
    createOrder,
    {
      isSuccess,
      isError: orderIsError,
      isLoading: orderLoading,
      error: orderError,
    },
  ] = useCreateOrderMutation();

  const product = productResponse?.data;
  const availableProducts = productsResponse?.data?.products ?? [];
  const relatedProducts = availableProducts
    .filter((item: { _id: string }) => item._id !== product?._id)
    .slice(0, 4);
  const photos = useMemo(
    () => [
      { src: product?.imageURLs || galleryImages[0].src, alt: product?.name || galleryImages[0].alt },
      ...galleryImages.slice(1),
    ],
    [product?.imageURLs, product?.name]
  );

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

  useEffect(() => {
    setActiveImageIndex(0);
    setProductQuantity(1);
    setLoafFormat("single");
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/addCard");
    }
  }, [isSuccess, navigate]);

  const handleAddProduct = () => {
    if (!product?._id) return;

    if (!userId) {
      navigate("/login", { state: { from: location } });
      return;
    }

    const formatMultiplier = loafFormat === "double" ? 2 : 1;
    void createOrder({
      productId: product._id,
      quantity: productQuantity * formatMultiplier,
      userId,
    });
  };

  const price = Number(product?.price ?? 0);
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(amount);

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-5 py-10"><Loading /></div>;
  }

  if (isError) {
    return <div className="mx-auto max-w-7xl px-5 py-10"><Errors>{getErrorText(error)}</Errors></div>;
  }

  if (!product) {
    return <div className="mx-auto max-w-7xl px-5 py-10"><Errors>Product not found.</Errors></div>;
  }

  return (
    <main className="bg-haven-canvas text-haven-ink">
      <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-5 flex min-w-0 items-center gap-2 text-[10px] text-haven-mutedInk">
          <Link className="flex items-center gap-1 transition hover:text-haven-primary" to="/">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">home</span>Market
          </Link>
          <span className="opacity-40">/</span>
          <Link className="truncate transition hover:text-haven-primary" to="/allProducts">{product.category}</Link>
          <span className="opacity-40">/</span>
          <span className="truncate font-semibold text-haven-ink">{product.name}</span>
          <span className="ml-auto hidden items-center gap-1 rounded-full bg-haven-muted px-3 py-1 text-[9px] font-bold text-haven-green sm:flex">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">local_fire_department</span>
            Trending in Seattle Epicure Top 10
          </span>
        </nav>

        <section className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-3 lg:col-span-7">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-card">
              <img
                src={photos[activeImageIndex]?.src}
                alt={photos[activeImageIndex]?.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-haven-primary px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-white shadow-card">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">local_fire_department</span>
                  Today's Oven Drop
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-haven-greenLight px-2.5 py-1 text-[8px] font-bold text-haven-green">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">eco</span>
                  Organic Wild Ferment
                </span>
              </div>
              <button
                type="button"
                aria-label="View product image"
                onClick={() => setActiveImageIndex((index) => (index + 1) % photos.length)}
                className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-haven-ink shadow-card transition hover:text-haven-primary"
              >
                <span className="material-symbols-outlined" aria-hidden="true">zoom_in</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {photos.map((photo, index) => (
                <button
                  type="button"
                  key={photo.src}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={activeImageIndex === index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-lg bg-white p-1 shadow-card transition ${
                    activeImageIndex === index ? "ring-2 ring-haven-primary" : "hover:ring-2 hover:ring-haven-primary/40"
                  }`}
                >
                  <img src={photo.src} alt={photo.alt} className="aspect-square w-full rounded object-cover" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-card">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-haven-muted text-haven-primary">
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">bakery_dining</span>
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 truncate font-display text-sm font-bold">
                    {product.brand?.name || "Independent Artisan"}
                    <span className="material-symbols-outlined text-base text-haven-green" aria-label="Verified maker">verified</span>
                  </p>
                  <p className="truncate text-[9px] text-haven-mutedInk">Ballard, Seattle • Master Baker • 4.98 Maker Score</p>
                </div>
              </div>
              <Link to={`/brands/${product.brand?._id || ""}`} className="flex shrink-0 items-center gap-1 text-[9px] font-bold text-haven-primary hover:underline">
                Visit Bakery <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5">
            <article className="rounded-xl bg-white p-4 shadow-card sm:p-5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-haven-greenLight/50 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-haven-green">
                  <span className="material-symbols-outlined text-xs" aria-hidden="true">eco</span>
                  Baked this morning
                </span>
                <span className="whitespace-nowrap text-[9px] font-bold text-haven-ink">★ 4.98 <span className="font-normal text-haven-mutedInk">(248 Epicures)</span></span>
              </div>
              <h1 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{product.name}</h1>
              <p className="mt-2 text-[10px] leading-5 text-haven-mutedInk">{product.description}</p>

              <div className="mt-3 rounded-lg bg-haven-muted p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-2xl font-bold text-haven-primary">{formatPrice(price)}</p>
                  <span className="rounded-full bg-[#ffebe4] px-2.5 py-1 text-[8px] font-bold text-haven-primary">Freshly baked</span>
                </div>
                <p className="mt-1 text-[8px] text-haven-mutedInk">
                  <span className="material-symbols-outlined mr-1 align-middle text-xs text-haven-green" aria-hidden="true">verified</span>
                  Foodie Club member pricing available at checkout
                </p>
              </div>

              <fieldset className="mt-3">
                <legend className="mb-1.5 text-[8px] font-bold uppercase tracking-wide">Select loaf format</legend>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2.5 transition ${loafFormat === "single" ? "border-haven-primary bg-[#fff7f3]" : "border-transparent bg-haven-muted"}`}>
                    <input type="radio" name="loaf-format" checked={loafFormat === "single"} onChange={() => setLoafFormat("single")} className="mt-0.5 accent-[#a93102]" />
                    <span><strong className="block text-[9px]">Single Boule</strong><span className="text-[8px] text-haven-mutedInk">Single Hearth Boule (850g)</span></span>
                  </label>
                  <label className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2.5 transition ${loafFormat === "double" ? "border-haven-primary bg-[#fff7f3]" : "border-transparent bg-haven-muted"}`}>
                    <input type="radio" name="loaf-format" checked={loafFormat === "double"} onChange={() => setLoafFormat("double")} className="mt-0.5 accent-[#a93102]" />
                    <span><strong className="block text-[9px]">Baker's Double</strong><span className="text-[8px] text-haven-mutedInk">Double pack (2 × 850g) · {formatPrice(price * 2)}</span></span>
                  </label>
                </div>
              </fieldset>

              <div className="mt-3">
                <p className="mb-1.5 text-[8px] font-bold uppercase tracking-wide">Enhance your tasting</p>
                <div className="space-y-1.5">
                  <label className="flex items-start gap-2 rounded-lg bg-haven-muted px-2.5 py-2 text-[8px]">
                    <input type="checkbox" className="mt-0.5 accent-[#2c694e]" />
                    <span className="flex-1"><strong className="block font-semibold">Whipped Normandy Cultured Butter (150g crock)</strong><span className="text-haven-mutedInk">AOP churned salted sea salt butter</span></span>
                    <strong className="text-haven-primary">+ $6.50</strong>
                  </label>
                  <label className="flex items-start gap-2 rounded-lg bg-haven-muted px-2.5 py-2 text-[8px]">
                    <input type="checkbox" className="mt-0.5 accent-[#2c694e]" />
                    <span className="flex-1"><strong className="block font-semibold">Wild Blackberry &amp; Thyme Preserve (240ml jar)</strong><span className="text-haven-mutedInk">Copper-kettle simmered Northwest mountain berries</span></span>
                    <strong className="text-haven-primary">+ $8.00</strong>
                  </label>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <div className="flex h-10 items-center rounded-lg border border-haven-border bg-haven-muted">
                  <button type="button" aria-label="Decrease quantity" disabled={productQuantity <= 1} onClick={() => setProductQuantity((quantity) => Math.max(1, quantity - 1))} className="grid h-9 w-9 place-items-center text-haven-mutedInk transition hover:text-haven-primary disabled:opacity-40">−</button>
                  <input aria-label="Quantity" type="number" min={1} value={productQuantity} onChange={(event) => setProductQuantity(Math.max(1, Number(event.currentTarget.value) || 1))} className="h-9 w-8 appearance-none bg-transparent text-center text-xs font-bold outline-none" />
                  <button type="button" aria-label="Increase quantity" onClick={() => setProductQuantity((quantity) => quantity + 1)} className="grid h-9 w-9 place-items-center text-haven-mutedInk transition hover:text-haven-primary">+</button>
                </div>
                <button type="button" onClick={handleAddProduct} disabled={orderLoading} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-haven-primary px-3 py-2 text-[9px] font-bold text-white shadow-card transition hover:bg-haven-primaryHover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">{orderLoading ? "hourglass_top" : "shopping_basket"}</span>
                  {orderLoading ? "Adding to basket..." : `Add to Feast Basket · ${formatPrice(price * productQuantity * (loafFormat === "double" ? 2 : 1))}`}
                </button>
                <button type="button" aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={isWishlisted} onClick={() => setIsWishlisted((value) => !value)} className={`grid h-10 w-10 place-items-center rounded-lg border border-haven-border bg-white transition ${isWishlisted ? "text-haven-primary" : "text-haven-mutedInk hover:text-haven-primary"}`}>
                  <span className="material-symbols-outlined" aria-hidden="true">{isWishlisted ? "favorite" : "favorite_border"}</span>
                </button>
              </div>
              {orderIsError && <div className="mt-2" role="alert"><Errors>{getErrorText(orderError)}</Errors></div>}
            </article>

            <div className="space-y-1 rounded-lg bg-haven-muted p-3 text-[9px] leading-4 text-haven-mutedInk">
              <p><span className="material-symbols-outlined mr-1 align-middle text-sm text-haven-green" aria-hidden="true">local_shipping</span><strong className="text-haven-green">Warm Hearth Drop:</strong> Baked fresh this morning. Arrives today by 4:30 PM in Downtown, Seattle (98101).</p>
              <p><span className="material-symbols-outlined mr-1 align-middle text-sm text-haven-primary" aria-hidden="true">schedule</span><strong className="text-haven-ink">Peak freshness:</strong> Best enjoyed within 4–5 days or sliced and frozen up to 60 days.</p>
              <p><span className="material-symbols-outlined mr-1 align-middle text-sm text-haven-green" aria-hidden="true">eco</span>100% breathable unbleached linen &amp; recycled kraft bread sack.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-xl bg-white shadow-card">
          <div className="flex gap-1 overflow-x-auto bg-haven-muted px-2">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-selected={activeTab === tab.id}
                role="tab"
                className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-[9px] font-semibold transition sm:px-4 ${
                  activeTab === tab.id
                    ? "border-haven-primary text-haven-primary"
                    : "border-transparent text-haven-mutedInk hover:text-haven-ink"
                }`}
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "inside" && (
              <div role="tabpanel" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {ingredientCards.map((card) => (
                  <article key={card.label} className="flex flex-col justify-between rounded-lg bg-haven-muted p-3">
                    <div>
                      <div className="mb-2 aspect-[4/3] overflow-hidden rounded bg-white">
                        <img src={card.image} alt={card.alt} className="h-full w-full object-cover" />
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-wider text-haven-green">{card.label}</span>
                      <h3 className="mt-1 font-display text-[11px] font-bold">{card.name}</h3>
                      <p className="mt-1 text-[9px] leading-4 text-haven-mutedInk">{card.description}</p>
                    </div>
                    <p className="mt-2 border-t border-haven-border pt-2 text-[8px] font-semibold">{card.detail}</p>
                  </article>
                ))}
              </div>
            )}

            {activeTab === "prep" && (
              <div role="tabpanel" className="space-y-4">
                <div className="max-w-3xl">
                  <h2 className="font-display text-lg font-bold">How to Revive &amp; Cut Your Boule</h2>
                  <p className="mt-1 text-xs leading-5 text-haven-mutedInk">Follow the baker's method to restore a crackling crust and warm custardy crumb at home.</p>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    ["Mist & Oven Wake-Up", "Preheat oven to 375°F (190°C). Lightly mist the crust with cool water and place the whole boule on the middle rack for 8 to 10 minutes.", "Listen for the gentle crust singing"],
                    ["The Mandatory Rest", "Allow the loaf to cool on a wire rack for 15 minutes before slicing. Cutting too quickly compresses the steam pockets and damages the crumb.", "Preserves airy open crumb"],
                    ["Serrated Sawing", "Use a scalloped bread knife with gentle sawing motions. Serve with salted Normandy butter or extra virgin olive oil while warm.", "Ideal for skillet pan-scraping"],
                  ].map(([title, description, note], index) => (
                    <article key={title} className="rounded-xl bg-haven-muted p-4">
                      <span className="mb-2 grid h-7 w-7 place-items-center rounded-full bg-haven-primary text-xs font-bold text-white">{index + 1}</span>
                      <h3 className="font-display text-sm font-bold">{title}</h3>
                      <p className="mt-1 text-[10px] leading-5 text-haven-mutedInk">{description}</p>
                      <p className="mt-3 rounded bg-white p-2 text-[9px] font-semibold text-haven-green">{note}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "provenance" && (
              <div role="tabpanel" className="grid items-center gap-5 lg:grid-cols-12">
                <div className="space-y-3 lg:col-span-5">
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-haven-green"><span className="material-symbols-outlined text-sm" aria-hidden="true">verified</span>Direct Pacific Northwest Grain Supply</span>
                  <h2 className="font-display text-xl font-bold">Reviving Ancient Einkorn Varieties</h2>
                  <p className="text-xs leading-5 text-haven-mutedInk">“Einkorn is humankind's oldest cultivated wheat grain—untouched by modern hybridization. We work with family farmers in the Skagit Valley who treat soil biology as a heritage craft.”</p>
                  <p className="text-[10px] font-bold">Clara Vance <span className="font-normal text-haven-mutedInk">· Master Baker &amp; Founder</span></p>
                </div>
                <div className="grid gap-2 rounded-xl bg-haven-muted p-3 sm:grid-cols-2 lg:col-span-7">
                  {[
                    ["Grain Farm", "Hedlin Family Farm", "Centennial organic farmland cultivating heritage einkorn in nutrient-dense marine soil."],
                    ["Mill Partner", "Cairnspring Mills", "Slow stone-milling keeps flour cool to retain healthy fats and aromatics."],
                    ["Levain Ancestry", "1904 Mother Starter", "Maintained daily with whole-milled rye and spring water for over a century."],
                    ["Oven Mechanics", "Spanish Deck Hearth", "Refractory stone plates flooded with high-pressure steam."],
                  ].map(([label, title, description]) => (
                    <article key={label} className="rounded-lg bg-white p-3">
                      <span className="text-[8px] font-bold uppercase text-haven-primary">{label}</span>
                      <h3 className="mt-1 text-xs font-bold">{title}</h3>
                      <p className="mt-1 text-[9px] leading-4 text-haven-mutedInk">{description}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div role="tabpanel" className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="font-display text-base font-bold">Dietary &amp; Allergen Facts</h2>
                  <dl className="mt-3 divide-y divide-dotted divide-haven-border text-[10px]">
                    {[["Serving size", "1 slice (55g)"], ["Calories", "140 kcal"], ["Protein", "5g"], ["Carbohydrates", "27g"], ["Dietary fiber", "3g"], ["Allergens", "Wheat / gluten"]].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 py-2"><dt className="font-semibold">{label}</dt><dd className="text-haven-mutedInk">{value}</dd></div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h2 className="font-display text-base font-bold">Freshness &amp; Storage</h2>
                  <p className="mt-2 text-[10px] leading-5 text-haven-mutedInk">Store cut-side down in its breathable paper bag at room temperature. For longer storage, slice and freeze in a sealed container for up to 60 days. Toast directly from frozen.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 rounded-xl bg-white p-4 shadow-card sm:p-6">
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[8px] font-bold uppercase tracking-wider text-haven-primary">Epicure Community Feedback</p>
              <div className="mt-1 flex items-baseline gap-1"><strong className="font-display text-4xl">4.98</strong><span className="text-xs text-haven-mutedInk">/ 5.0</span></div>
              <p className="mt-1 text-lg tracking-widest text-haven-primary" aria-label="5 out of 5 stars">★★★★★</p>
              <p className="mt-1 text-[9px]">248 Verified Epicures</p>
              <p className="mt-2 text-[9px] leading-4 text-haven-mutedInk">99% of buyers said they would make this heritage einkorn loaf their weekly standing bakery delivery.</p>
              <button type="button" onClick={() => navigate("/login", { state: { from: location } })} className="mt-3 flex w-full items-center justify-between rounded-lg bg-haven-muted px-3 py-2 text-[9px] font-bold transition hover:text-haven-primary">Write an Epicure Review <span className="material-symbols-outlined text-sm" aria-hidden="true">rate_review</span></button>
            </div>
            <div className="space-y-1 lg:col-span-4">
              {[["5 Star", "96%"], ["4 Star", "4%"], ["3 Star", "0%"], ["2 Star", "0%"], ["1 Star", "0%"]].map(([label, percentage]) => (
                <div key={label} className="flex items-center gap-2 text-[8px]"><span className="w-10 text-right">{label}</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-haven-muted"><div className="h-full rounded-full bg-haven-primary" style={{ width: percentage }} /></div><span className="w-8">{percentage}</span></div>
              ))}
            </div>
            <div className="rounded-xl bg-haven-muted p-3 lg:col-span-4">
              <p className="text-[8px] font-bold uppercase">Top Taste Highlights</p>
              <div className="mt-2 flex flex-wrap gap-1.5">{["✓ Caramelized Blistered Crust (210)", "✓ Custardy Open Crumb (185)", "✓ Mild Floral Sourdough (164)", "✓ Toasts to Perfection (142)"].map((highlight) => <span key={highlight} className="rounded-full bg-white px-2 py-1 text-[8px] font-semibold text-haven-primary">{highlight}</span>)}</div>
            </div>
            <div className="grid gap-3 md:grid-cols-3 lg:col-span-12">
              {reviews.map((review) => (
                <article key={review.name} className="rounded-xl bg-haven-muted p-3">
                  <div className="flex justify-between gap-2"><span className="text-[10px] tracking-wider text-haven-primary">★★★★★</span><span className="text-[8px] text-haven-mutedInk">{review.date}</span></div>
                  <h3 className="mt-1 text-[10px] font-bold">{review.title}</h3>
                  <p className="mt-1 text-[9px] leading-4 text-haven-mutedInk">“{review.quote}”</p>
                  <div className="mt-3 flex justify-between gap-2 text-[8px]"><strong>{review.name} · {review.location}</strong><span className="flex items-center gap-1 font-semibold text-haven-green"><span className="material-symbols-outlined text-xs" aria-hidden="true">verified</span>Verified Epicure</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div><p className="text-[8px] font-bold uppercase tracking-wider text-haven-primary">Perfect Pairings</p><h2 className="font-display text-xl font-bold sm:text-2xl">Complete Your Artisanal Feast</h2></div>
            <Link to="/allProducts" className="text-[9px] font-bold text-haven-green hover:underline">View All Sommelier &amp; Pantry Curations →</Link>
          </div>
          {relatedProducts.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item: { _id: string; imageURLs: string; category: string; brand?: { name?: string }; name: string; description?: string; price: number; unit?: string }) => (
                <article key={item._id} className="flex flex-col rounded-xl bg-white p-2 shadow-card transition hover:-translate-y-1 hover:shadow-warm">
                  <Link to={`/product/${item._id}`} className="group flex flex-1 flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-haven-muted">
                      <img src={item.imageURLs} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-[7px] font-bold text-haven-green">{item.category}</span>
                    </div>
                    <p className="mt-2 text-[7px] font-bold uppercase text-haven-green">{item.brand?.name}</p>
                    <h3 className="mt-1 line-clamp-2 min-h-8 font-display text-[10px] font-bold group-hover:text-haven-primary">{item.name}</h3>
                    <p className="mt-1 line-clamp-2 text-[8px] leading-4 text-haven-mutedInk">{item.description}</p>
                  </Link>
                  <div className="mt-2 flex items-center justify-between border-t border-haven-border pt-2">
                    <span className="text-[10px] font-bold">{formatPrice(Number(item.price))}</span>
                    <Link to={`/product/${item._id}`} className="rounded-lg bg-haven-muted px-2.5 py-1.5 text-[8px] font-bold transition hover:bg-haven-green hover:text-white">View item</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-lg bg-white p-4 text-xs text-haven-mutedInk">No pairings are available right now.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductItem;
