import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
function Orders() {

    const navigate = useNavigate();

    useEffect(() => {
      const isSuccess = sessionStorage.getItem("issuccess");
      if (isSuccess === "false" || isSuccess === null) {
        navigate("/login");
      }
    }, [navigate]);

  const [AllOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      );
      if (response.data) {
        const OrdersList = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        setAllOrders(OrdersList);
      }
    } catch (error) {
      console.error("Error fetching Orders:", error);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <>
        <title>Star Cinemas - All Orders Admin</title>

        <Header />

        <div className="bg-[#240950] min-h-screen p-6 flex flex-col items-center justify-center pt-[100px]">
  <h1 className="text-4xl font-bold text-white mb-6">All Orders</h1>
  <div className="overflow-x-auto w-full bg-white shadow-2xl rounded-xl">
    <table className="min-w-full divide-y divide-gray-300 table-auto">
      <thead className="bg-[#452B6F] text-white">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
            Tickets Count
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
            Total Price
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
            Vip Tickets Count
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
            Vip Total Price
          </th>
        </tr>
      </thead>
      <tbody className="bg-[#5E3A96] text-white divide-y divide-gray-300">
        {AllOrders.map((order) => (
          <tr key={order.id}>
            <td className="px-6 py-4 text-sm">{order.email}</td>
            <td className="px-6 py-4 text-sm">{order.name}</td>
            <td className="px-6 py-4 text-sm">{order.ticketsCount}</td>
            <td className="px-6 py-4 text-sm">{order.totalPrice}</td>
            <td className="px-6 py-4 text-sm">{order.vipTicketsCount}</td>
            <td className="px-6 py-4 text-sm">{order.vipTotalPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
<Footer />

    </>
  );
}
export default Orders;
