import React, { useState, useEffect } from "react";
import axios from 'axios';

function ServiceStatistics() {

  
// عدد الأيفنت
  const [Events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(
          "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
        );
        const data = response.data ? Object.values(response.data) : [];
        setEvents(data);
      } catch (error) {
        console.error("Error fetching contacts data: ", error);
      }
    }
    fetchEvents();
  }, []);
// عدد الأيفنت
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
        );
        const data = response.data ? Object.values(response.data) : [];
        setOrders(data);
      } catch (error) {
        console.error("Error fetching contacts data: ", error);
      }
    }
    fetchOrders();
  }, []);
  //عدد الكومنت
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await axios.get(
          "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/contacts.json"
        );
        const data = response.data ? Object.values(response.data) : [];
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts data: ", error);
      }
    }
    fetchContacts();
  }, []);
  //عدد اليوزرز
  const [AllUser, setAllUser] = useState([]);

  useEffect(() => {
    async function fetchAllUser() {
      try {
        const response = await axios.get(
          "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        );
        const data = response.data ? Object.values(response.data) : [];
        setAllUser(data);
      } catch (error) {
        console.error("Error fetching contacts data: ", error);
      }
    }
    fetchAllUser();
  }, []);
  return (
    <>
<div className="bg-[#1A0D3B] w-full dark:bg-gray-800 pt-[100px]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl dark:text-white">
      Service Statistics
    </h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
      <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 text-white overflow-hidden shadow-lg rounded-lg dark:from-teal-600 dark:via-teal-700 dark:to-teal-800 dark:bg-gray-900">
        <div className="px-6 py-5 sm:p-8">
          <dl>
            <dt className="text-sm font-medium text-gray-200 dark:text-gray-300">
              Total Events
            </dt>
            <dd className="mt-1 text-4xl font-bold text-white">
              {Events.length}
            </dd>
          </dl>
        </div>
      </div>
      <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 text-white overflow-hidden shadow-lg rounded-lg dark:from-indigo-600 dark:via-indigo-700 dark:to-indigo-800 dark:bg-gray-900">
        <div className="px-6 py-5 sm:p-8">
          <dl>
            <dt className="text-sm font-medium text-gray-200 dark:text-gray-300">
              Total Orders
            </dt>
            <dd className="mt-1 text-4xl font-bold text-white">
              {Orders.length}
            </dd>
          </dl>
        </div>
      </div>
      <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700 text-white overflow-hidden shadow-lg rounded-lg dark:from-pink-600 dark:via-pink-700 dark:to-pink-800 dark:bg-gray-900">
        <div className="px-6 py-5 sm:p-8">
          <dl>
            <dt className="text-sm font-medium text-gray-200 dark:text-gray-300">
              Total Comments
            </dt>
            <dd className="mt-1 text-4xl font-bold text-white">
              {contacts.length}
            </dd>
          </dl>
        </div>
      </div>
      <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white overflow-hidden shadow-lg rounded-lg dark:from-purple-600 dark:via-purple-700 dark:to-purple-800 dark:bg-gray-900">
        <div className="px-6 py-5 sm:p-8">
          <dl>
            <dt className="text-sm font-medium text-gray-200 dark:text-gray-300">
              Total Users
            </dt>
            <dd className="mt-1 text-4xl font-bold text-white">
              {AllUser.length}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default ServiceStatistics;
