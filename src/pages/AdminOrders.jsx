import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = 'supersecretadmintoken123'; // In real app, use JWT stored in localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('❌ Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📦 Admin Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Total Price</th>
              <th>Payment Ref</th>
              <th>Items</th>
              <th>Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.user?.fullName || o.user?.name || 'N/A'}</td>
                <td>{o.user?.email || 'N/A'}</td>
                <td>₦{o.totalPrice}</td>
                <td>{o.paymentReference}</td>
                <td>
                  {o.cartItems?.map((item, i) => (
                    <div key={i}>
                      {item.name} x{item.quantity} (₦{item.price})
                    </div>
                  ))}
                </td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
