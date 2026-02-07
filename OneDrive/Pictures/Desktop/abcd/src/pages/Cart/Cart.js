import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push({ items: cart, time: new Date().toLocaleString(), total: getCartTotal() });
      localStorage.setItem("orders", JSON.stringify(orders));
      clearCart();
      
      setIsLoading(false);
      setShowSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="cart-container">
      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '3rem 2rem',
            textAlign: 'center',
            maxWidth: '400px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.5s ease-out'
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #00ccc0, #0a9396)',
              borderRadius: '50%',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0, 204, 192, 0.3)'
            }}>
              <svg fill="none" stroke="white" viewBox="0 0 24 24" style={{ width: '2rem', height: '2rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#2d3436',
              margin: '0 0 0.5rem 0'
            }}>
              Order Placed! 🎉
            </h2>
            <p style={{
              color: '#636e72',
              margin: '0 0 1.5rem 0',
              fontSize: '0.95rem'
            }}>
              Your order has been confirmed successfully.
            </p>
            <p style={{
              backgroundColor: '#f5f6fa',
              padding: '1rem',
              borderRadius: '10px',
              color: '#00ccc0',
              fontWeight: 700,
              fontSize: '1.1rem',
              margin: 0
            }}>
              Total: ₹{getCartTotal()}
            </p>
            <p style={{
              color: '#636e72',
              fontSize: '0.85rem',
              marginTop: '1rem',
              margin: '1rem 0 0 0'
            }}>
              Redirecting to your orders...
            </p>
          </div>
        </div>
      )}

      <div className="cart-wrapper">
        <div className="cart-card">
          {/* Header */}
          <div className="cart-header">
            <h2 className="cart-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Shopping Cart
            </h2>
            <p className="cart-count">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Cart Items */}
          <div className="cart-content">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <svg className="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="empty-cart-text">Your cart is empty</p>
                <p style={{ color: '#636e72', marginTop: '0.5rem', fontSize: '0.9rem' }}>Add some items to get started!</p>
              </div>
            ) : (
              <div className="cart-items">
                {cart.map((item, i) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <div className="item-number">
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="item-name">{item.name}</p>
                        <p style={{ fontSize: '0.85rem', color: '#636e72', margin: '0.2rem 0 0 0' }}>
                          ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      disabled={isLoading}
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Checkout Button */}
            {cart.length > 0 && (
              <div className="checkout-section">
                <div className="cart-summary">
                  <span className="cart-summary-label">Total Price:</span>
                  <span className="cart-summary-value">₹{getCartTotal()}</span>
                </div>
                <button
                  onClick={checkout}
                  disabled={isLoading}
                  className="checkout-btn"
                  style={{
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    position: 'relative'
                  }}
                >
                  {isLoading ? (
                    <>
                      <span style={{
                        display: 'inline-block',
                        width: '1rem',
                        height: '1rem',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        marginRight: '0.5rem'
                      }}></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Checkout
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}