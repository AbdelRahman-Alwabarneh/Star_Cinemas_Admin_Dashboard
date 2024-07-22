import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
function LogIn() {
  sessionStorage.setItem("issuccess", false);
  const [AdminLogIn, setAdminLogIn] = useState({
    Admin_Email: "",
    Admin_Password: "",
  });
  const [ErrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminLogIn({ ...AdminLogIn, [name]: value });
  };

  async function handleAdminLogIn() {
    try {
      const response = await axios.get(
        "https://test-74298-default-rtdb.firebaseio.com/AdminAccount.json"
      );
      const adminAccounts = response.data || {};

      const emailExists = Object.values(adminAccounts).some(
        (admin) =>
          admin.Admin_Email === AdminLogIn.Admin_Email &&
          admin.Admin_Password === AdminLogIn.Admin_Password
      );

      if (emailExists) {
        sessionStorage.setItem("issuccess", true);
        navigate("/");
      } else {
        setErrorMessage("The email or password is incorrect");
        setTimeout(() => {
          setErrorMessage("");
        }, 8000);
        return;
      }
    } catch (error) {
      console.error("Error Add Admin:", error);
    }
  }

  return (
    <>
    <title>Star Cinemas - LogIn Admin</title>
      <section className="bg-[#270f3b] dark:bg-gray-900 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex justify-center items-center space-x-3 rtl:space-x-reverse mb-10"
          >
            <img
              src="https://cdn.discordapp.com/attachments/993570904544124972/1264878060965199912/images-removebg-preview.png?ex=669f78fe&is=669e277e&hm=8846c3f1aa8d2f26b41b860850706153f18b493c144198c0d980773287a4aa86&"
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
                Log In to your account
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdminLogIn();
                }}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="Admin_Email"
                    id="Admin_Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="Admin_Password"
                    id="Admin_Password"
                    placeholder="Enter your Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-[#592584] hover:bg-[#6b2aa0] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
        {ErrorMessage && (
          <div className="fixed top-4 right-4 bg-red-700 text-white p-4 rounded-lg shadow-lg">
            {ErrorMessage}
          </div>
        )}
      </section>
    </>
  );
}
export default LogIn;
