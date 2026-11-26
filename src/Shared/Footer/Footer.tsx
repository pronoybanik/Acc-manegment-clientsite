import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-haven-border bg-haven-canvas">
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="font-display text-lg font-bold text-haven-primary">Foodie Haven</Link>
          <p className="mt-3 max-w-xs text-xs leading-5 text-haven-mutedInk">
            Connecting home cooks with independent purveyors, farm-fresh
            ingredients, and the people behind every delicious detail.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-haven-ink">Curated aisles</h2>
          <ul className="mt-3 space-y-2 text-xs text-haven-mutedInk">
            <li><Link className="hover:text-haven-primary" to="/allProducts">Artisan pantry</Link></li>
            <li><Link className="hover:text-haven-primary" to="/allProducts">Bakery &amp; pastries</Link></li>
            <li><Link className="hover:text-haven-primary" to="/allProducts">Chef specials</Link></li>
            <li><Link className="hover:text-haven-primary" to="/allProducts">Plant-based finds</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-haven-ink">For makers</h2>
          <ul className="mt-3 space-y-2 text-xs text-haven-mutedInk">
            <li><Link className="hover:text-haven-primary" to="/brands">Meet our artisans</Link></li>
            <li><Link className="hover:text-haven-primary" to="/brands">Become a vendor</Link></li>
            <li><Link className="hover:text-haven-primary" to="/managerDashBoard">Manage your store</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-haven-ink">Our promise</h2>
          <ul className="mt-3 space-y-2 text-xs text-haven-mutedInk">
            <li>Cold-chain delivery</li>
            <li>Thoughtful sourcing</li>
            <li>Independent makers first</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t border-haven-border pt-5 text-[10px] text-haven-mutedInk sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Foodie Haven. Crafted with care.</p>
        <div className="flex flex-wrap gap-4">
          <span>♧ Sustainable packaging</span>
          <span>✓ Secure checkout</span>
          <span>◉ Cold-chain guarantee</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
