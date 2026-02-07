import { useNavigate } from "react-router-dom";
import "./Orders.css";

export default function Orders() {
  const navigate = useNavigate();
  const rawOrders = JSON.parse(localStorage.getItem("orders")) || [];

  // normalize orders safely
  const orders = rawOrders.map((order) => {
    if (Array.isArray(order)) {
      return { items: order, time: "Unknown time", total: 0 };
    }
    return {
      items: Array.isArray(order.items) ? order.items : [],
      time: order.time || "Unknown time",
      total: order.total || 0
    };
  });

  // Calculate stats
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalItems = orders.reduce((sum, order) => sum + (order.items?.length || 0), 0);

  // Get estimated delivery date (3-5 days from order)
  const getEstimatedDelivery = (orderTime) => {
    const date = new Date(orderTime);
    date.setDate(date.getDate() + 4);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleReorder = (items) => {
    // Add all items from the order back to cart
    items.forEach(item => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existingIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
      if (existingIndex !== -1) {
        cartItems[existingIndex].quantity += item.quantity || 1;
      } else {
        cartItems.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
    });
    navigate("/cart");
  };

  return (
    <div className="orders-container">
      <div className="orders-wrapper">
        {/* Header */}
        <div className="orders-header-section">
          <div className="orders-header">
            <h2 className="orders-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Order History
            </h2>
            <p className="orders-subtitle">Track and manage your orders</p>
          </div>

          {/* Stats Cards */}
          {totalOrders > 0 && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #00ccc0, #0a9396)' }}>
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM5 16a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Orders</p>
                  <p className="stat-value">{totalOrders}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Spent</p>
                  <p className="stat-value">₹{totalSpent}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM5 16a2 2 0 11-4 0 2 2 0 014 0zm8-1a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Items</p>
                  <p className="stat-value">{totalItems}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="orders-list-container">
          {orders.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="empty-state-title">No orders yet</h3>
              <p className="empty-state-text">Start shopping to see your orders here</p>
              <button 
                onClick={() => navigate("/items")}
                className="empty-state-btn"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order, i) => (
                <div key={i} className="order-card">
                  {/* Order Header */}
                  <div className="order-header">
                    <div className="order-info">
                      <div className="order-number-badge">
                        #{i + 1}
                      </div>
                      <div className="order-details">
                        <h3>Order #{i + 1}</h3>
                        <div className="order-meta">
                          <div className="order-time">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {order.time}
                          </div>
                          <div className="order-delivery" style={{ marginLeft: '1.5rem' }}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Arrives by {getEstimatedDelivery(order.time)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="status-badge">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Completed
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="order-items-section">
                    {order.items.length === 0 ? (
                      <p className="empty-order-text">No items in this order</p>
                    ) : (
                      <div className="items-container">
                        <p className="items-header">Items ({order.items.length})</p>
                        <div className="items-grid">
                          {order.items.map((item, idx) => {
                            // Handle both string items (legacy) and object items (new format)
                            const itemName = typeof item === 'string' ? item : (item?.name || 'Unknown Item');
                            const itemPrice = typeof item === 'object' ? item?.price : null;
                            const itemQuantity = typeof item === 'object' ? item?.quantity : 1;
                            
                            // Map item names to icons
                            const icons = {
                              'Apple': '🍎',
                              'Banana': '🍌',
                              'Mango': '🥭',
                              'Orange': '🍊'
                            };
                            const icon = icons[itemName] || '📦';
                            
                            return (
                              <div key={idx} className="order-item">
                                <div className="item-icon-badge">{icon}</div>
                                <div style={{ flex: 1 }}>
                                  <span className="item-name">{itemName}</span>
                                  {itemPrice && (
                                    <p style={{ fontSize: '0.75rem', color: '#636e72', margin: '0.2rem 0 0 0' }}>
                                      ₹{itemPrice} × {itemQuantity} = ₹{itemPrice * itemQuantity}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Order Summary */}
                        <div className="order-summary">
                          <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{order.total}</span>
                          </div>
                          <div className="summary-row">
                            <span>Delivery</span>
                            <span className="delivery-free">FREE</span>
                          </div>
                          <div className="summary-divider"></div>
                          <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{order.total}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="order-actions">
                          <button 
                            onClick={() => handleReorder(order.items)}
                            className="reorder-btn"
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reorder
                          </button>
                          <button className="view-details-btn">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
