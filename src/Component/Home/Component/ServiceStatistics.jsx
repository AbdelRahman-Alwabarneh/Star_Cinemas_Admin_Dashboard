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
      <div className="bg-[#270f3b] w-full dark:bg-gray-700 pt-[100px] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl dark:text-white">
            Our service statistics
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
            <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-900">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    All Events
                  </dt>
                  <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                    {Events.length}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-900">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    All Orders
                  </dt>
                  <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                    {Orders.length}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-900">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    All comments
                  </dt>
                  <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                    {contacts.length}
                  </dd>
                </dl>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-900">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    All Users
                  </dt>
                  <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
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
