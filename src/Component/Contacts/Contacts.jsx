import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

function Contacts() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSuccess = sessionStorage.getItem("issuccess");
    if (isSuccess === "false" || isSuccess === null) {
      navigate("/login");
    }
  }, [navigate]);

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

  return (
    <>
        <title>Star Cinemas - Messages Admin</title>
      <Header />
      <div className="p-6 bg-[#270F3B] min-h-screen pt-[90px]">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white">
        All Messages
        </h1>
        {contacts.length > 0 ? (
          <div className="relative overflow-x-auto rounded-[10px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-100">
              <thead className="text-xs text-gray-200 uppercase bg-[#452b6f]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr
                    key={index}
                    className="bg-[#5e3a96] border-b border-[#452b6f]"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap"
                    >
                      {contact.name}
                    </th>
                    <td className="px-6 py-4 text-gray-200">{contact.email}</td>
                    <td className="px-6 py-4 text-gray-200">
                      {contact.message}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                        <a href={`mailto:${contact.email}`}>Reply</a>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-200">No contacts found.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Contacts;
