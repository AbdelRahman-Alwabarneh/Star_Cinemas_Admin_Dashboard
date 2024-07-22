import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Customers() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const isSuccess = sessionStorage.getItem("issuccess");
  //   if (isSuccess === "false" || isSuccess === null) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const [Registered, setRegistered] = useState([]);

  useEffect(() => {
    async function fetchRegistered() {
      try {
        const response = await axios.get(
          "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        );
        const data = response.data ? Object.values(response.data) : [];
        setRegistered(data);
      } catch (error) {
        console.error("Error fetching contacts data: ", error);
      }
    }
    fetchRegistered();
  }, []);
  async function NotActive(id) {
    try {
      await axios.patch(
        `https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
        { isDeleted: true }
      );
      setRegistered((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isDeleted: true } : user
        )
      );
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  }
  async function Active(id) {
    try {
      await axios.patch(
        `https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
        { isDeleted: false }
      );
      setRegistered((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isDeleted: false } : user
        )
      );
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  }
  return (
    <>
      <div className="p-6 bg-[#270F3B] min-h-screen pt-[90px]">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white">
          All Users
        </h1>
        {Registered.length > 0 ? (
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
                    Condition
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Registered.map((register, index) => (
                  <tr
                    key={index}
                    className="bg-[#5e3a96] border-b border-[#452b6f]"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap"
                    >
                      {register.name}
                    </th>
                    <td className="px-6 py-4 text-gray-200">
                      {register.email}
                    </td>
                    {register.isDeleted ? (
                      <td className="px-6 py-4 text-gray-200">
                        <span className="bg-[#ff1b1b] text-white px-4 py-1 rounded-[5px] font-bold text-sm">
                          NotActive
                        </span>
                      </td>
                    ) : (
                      <td className="px-6 py-4 text-gray-200">
                        <span className="bg-[#1da438] text-white px-4 py-1 rounded-[5px] font-bold text-sm">
                          Active
                        </span>
                      </td>
                    )}

                    <td className="px-6 py-4 text-center">
                      {register.isDeleted ? (
                        <button
                          onClick={() => Active(register.id)}
                          className="bg-[#3a9228] text-white px-4 py-2 rounded hover:bg-[#35a035] transition duration-300"
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          onClick={() => NotActive(register.id)}
                          className="bg-[#be3737] text-white px-4 py-2 rounded hover:bg-[#ff2828] transition duration-300"
                        >
                          Not Active
                        </button>
                      )}
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
    </>
  );
}
export default Customers;
