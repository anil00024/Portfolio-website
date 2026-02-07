import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const navLinks = [
    { path: "/", label: "Login", icon: "👤" },
    { path: "/items", label: "Items", icon: "🏪" },
    { path: "/cart", label: "Cart", icon: "🛒", badge: totalItems },
    { path: "/orders", label: "Orders", icon: "📦" }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>🛒 Anil's Mart</h2>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="navbar-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation Links */}
      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        {navLinks.map(({ path, label, icon, badge }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${location.pathname === path ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
            {badge > 0 && <span className="nav-badge">{badge}</span>}
          </Link>
        ))}
      </div>
    </nav>
  );
}