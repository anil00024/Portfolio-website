import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

import "./Items.css";

export default function Items() {
  const { addToCart } = useContext(CartContext);
  const [toast, setToast] = useState(null);

  const handleAddToCart = (item) => {
    addToCart(item);
    
    // Show toast notification
    setToast({
      message: `${item.name} added to cart! ✓`,
      itemName: item.name
    });
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const items = [
    { id: 1, name: "Apple", icon: "🍎", color: "gradient-red", price: 80 },
    { id: 2, name: "Banana", icon: "🍌", color: "gradient-yellow", price: 50 },
    { id: 3, name: "Mango", icon: "🥭", color: "gradient-orange-yellow", price: 120 },
    { id: 4, name: "Orange", icon: "🍊", color: "gradient-orange-red", price: 90 }
  ];

  return (
    <div className="items-container">
      {/* Toast Notification */}
      {toast && (
        <div className="toast-notification" style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          backgroundColor: '#00ccc0',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0, 204, 192, 0.3)',
          fontSize: '0.95rem',
          fontWeight: 600,
          zIndex: 1000,
          animation: 'slideInRight 0.3s ease-out'
        }}>
          {toast.message}
        </div>
      )}

      <div className="items-wrapper">
        <div className="items-card">
          {/* Header */}
          <div className="items-header">
            <h2 className="items-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Fresh Items
            </h2>
            <p className="items-subtitle">Choose your favorite fruits</p>
          </div>

          {/* Items Grid */}
          <div className="items-grid-container">
            <div className="items-grid">
              {items.map((item) => (
                <div key={item.id} className="item-card">
                  {/* Gradient Background Overlay */}
                  <div className="item-gradient-overlay"></div>
                  
                  <div className="item-content">
                    <div className="item-info">
                      {/* Icon Circle */}
                      <div className={`item-icon ${item.color}`}>
                        {item.icon}
                      </div>
                      
                      {/* Item Name */}
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p>₹ {item.price}</p>
                      </div>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="add-button"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="items-footer">
            <p>
              <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '1rem', height: '1rem', display: 'inline' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              All items are fresh and ready to be added to your cart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}