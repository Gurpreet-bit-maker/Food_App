import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);
  const [users, setUsers] = useState([]);

  const getOrders = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

      const token = credentials ? credentials.password : null;

      if (!token) {
        console.log("token not found");
        return;
      }

      const response = await axios.get('http://10.0.2.2:8080/api/get-orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(response.data.orders);
    } catch (error) {
      console.log('Get Orders Error:', error.response?.data || error.message);
    }
  };

  //* Admin Dashboard
  const adminDeshboard_data = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

      const token = credentials ? credentials.password : null;

      if (!token) {
        console.log("token not found");
        return;
      }

      const res = await axios.get('http://10.0.2.2:8080/api/admin/deshboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);

      console.log('Dashboard Data:', res.data);
    } catch (error) {
      console.log('Dashboard Error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getOrders();
    adminDeshboard_data();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        getOrders,
        adminDeshboard_data,
        users,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
