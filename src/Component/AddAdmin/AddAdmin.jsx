import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AddAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSuccess = sessionStorage.getItem("issuccess");
    if (isSuccess === "false" || isSuccess === null) {
      navigate("/login");
    }
  }, [navigate]);

  const [AddNewAdmin, setAddNewAdmin] = useState({
    Admin_Name: "",
    Admin_Email: "",
    Admin_Password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddNewAdmin({ ...AddNewAdmin, [name]: value });
  };

  async function NewAdmin() {
    try {
      const response = await axios.get(
        "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/AdminAccount.json"
      );
      const adminAccounts = response.data || {};

      const emailExists = Object.values(adminAccounts).some(
        (admin) => admin.Admin_Email === AddNewAdmin.Admin_Email
      );

      if (emailExists) {
        setErrorMessage("The email address is already in use.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      const nextIndex = Object.keys(adminAccounts).length;

      await axios.put(
        `https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/AdminAccount/${nextIndex}.json`,
        {
          Admin_Name: AddNewAdmin.Admin_Name,
          Admin_Email: AddNewAdmin.Admin_Email,
          Admin_Password: AddNewAdmin.Admin_Password,
          id: nextIndex,
        }
      );

      setSuccessMessage("A new admin has been added successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setAddNewAdmin({
        Admin_Name: "",
        Admin_Email: "",
        Admin_Password: "",
      });
    } catch (error) {
      console.error("Error Add Admin:", error);
    }
  }

  return (
    <>
        <title>Star Cinemas - Add Admin</title>

      <Header />
      <section className="bg-[#270f3b] h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex justify-center items-center space-x-3 rtl:space-x-reverse mb-10"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Star Cinemas
            </span>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add a new admin
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  NewAdmin();
                }}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="Name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Admin Name
                  </label>
                  <input
                    onChange={handleChange}
                    value={AddNewAdmin.Admin_Name}
                    type="text"
                    name="Admin_Name"
                    id="Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter the admin Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Admin email
                  </label>
                  <input
                    onChange={handleChange}
                    value={AddNewAdmin.Admin_Email}
                    type="email"
                    name="Admin_Email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter the admin email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Admin Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={AddNewAdmin.Admin_Password}
                    type="password"
                    name="Admin_Password"
                    id="password"
                    placeholder="Enter the admin password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-[#592584] hover:bg-[#6b2aa0] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
              </form>
            </div>
          </div>
        </div>
        {successMessage && (
          <div className="mt-[70px] fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            {successMessage}
          </div>
        )}
        {ErrorMessage && (
          <div className="mt-[70px] fixed top-4 right-4 bg-red-700 text-white p-4 rounded-lg shadow-lg">
            {ErrorMessage}
          </div>
        )}
      </section>
    </>
  );
}

export default AddAdmin;
