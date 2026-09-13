import { createContext,useState,useEffect } from 'react';
import axios from 'axios';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);

  const getOrders = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/api/get-orders');

      setOrder(response.data.orders);
    } catch (error) {
      console.log('Get Orders Error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ order, setOrder, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
