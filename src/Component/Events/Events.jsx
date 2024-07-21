import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSuccess = sessionStorage.getItem("issuccess");
    if (isSuccess === "false" || isSuccess === null) {
      navigate("/login");
    }
  }, [navigate]);

  const [event, setEvent] = useState({
    author: "",
    couponCode: "",
    description: "",
    discountPercentage: "",
    image: "",
    numberOfTickets: "",
    price: "",
    rating: "",
    release_year: "",
    title: "",
    vipTicketCouponCode: "",
    vipTicketName: "",
    vipTicketNumberOfTickets: "",
    vipTicketPrice: "",
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );
      if (response.data) {
        const movieList = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        setMovies(movieList);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const addEvent = async () => {
    try {
      const nextIndex = movies.length;

      await axios.put(
        `https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/movies/${nextIndex}.json`,
        {
          author: event.author,
          couponCode: event.couponCode,
          description: event.description,
          discountPercentage: event.discountPercentage,
          image: event.image,
          numberOfTickets: event.numberOfTickets,
          price: event.price,
          rating: event.rating,
          release_year: event.release_year,
          title: event.title,
          vipTicketCouponCode: event.vipTicketCouponCode,
          vipTicketName: event.vipTicketName,
          vipTicketNumberOfTickets: event.vipTicketNumberOfTickets,
          vipTicketPrice: event.vipTicketPrice,
          delete: false,
          id: nextIndex + 1,
        }
      );
      console.log("Event added successfully");

      //لتحديث الكاردات بدون رفرش
      fetchMovies();

      // حذف الموجود في الفورم
      setEvent({
        author: "",
        couponCode: "",
        description: "",
        discountPercentage: "",
        image: "",
        numberOfTickets: "",
        price: "",
        rating: "",
        release_year: "",
        title: "",
        vipTicketCouponCode: "",
        vipTicketName: "",
        vipTicketNumberOfTickets: "",
        vipTicketPrice: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  async function EditEvent(id) {
    const nextIndex = movies.length;
    await axios.put(
      `https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/movies/${
        id - 1
      }.json`,
      {
        author: event.author,
        couponCode: event.couponCode,
        description: event.description,
        discountPercentage: event.discountPercentage,
        image: event.image,
        numberOfTickets: event.numberOfTickets,
        price: event.price,
        rating: event.rating,
        release_year: event.release_year,
        title: event.title,
        vipTicketCouponCode: event.vipTicketCouponCode,
        vipTicketName: event.vipTicketName,
        vipTicketNumberOfTickets: event.vipTicketNumberOfTickets,
        vipTicketPrice: event.vipTicketPrice,
        delete: false,
        id: id,
      }
    );
    fetchMovies();
    setEvent({
      author: "",
      couponCode: "",
      description: "",
      discountPercentage: "",
      image: "",
      numberOfTickets: "",
      price: "",
      rating: "",
      release_year: "",
      title: "",
      vipTicketCouponCode: "",
      vipTicketName: "",
      vipTicketNumberOfTickets: "",
      vipTicketPrice: "",
    });
  }

  async function DeleteEvent(id) {
    try {
      await axios.patch(
        `https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/movies/${
          id - 1
        }.json`,
        { delete: true }
      );
    } catch (error) {
      console.error("Error deleting DeleteEvent: ", error);
    }
    fetchMovies();
  }
  async function ReturnEvent(id) {
    try {
      await axios.patch(
        `https://cinema-website-b44c3-default-rtdb.europe-west1.firebasedatabase.app/movies/${
          id - 1
        }.json`,
        { delete: false }
      );
    } catch (error) {
      console.error("Error deleting DeleteEvent: ", error);
    }
    fetchMovies();
  }

  return (
    <>
        <title>Star Cinemas - Events Admin</title>
      <div className="bg-[#351251]">
        <Header />
        <div className="bg-[#351251] h-auto pt-20 mp-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addEvent();
            }}
            className="max-w-4xl mx-auto font-bold text-white bg-[#6f0e99] p-8 rounded-md shadow-md grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <h1 className="col-span-2 text-center text-[30px] font-bold text-[#ffffff] mb-6">
              Add Events
            </h1>

            {/* Title */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="title"
                name="title"
                value={event.title}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="title"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Title
              </label>
            </div>

            {/* Description */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="description"
                name="description"
                value={event.description}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="description"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            {/* Author */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="author"
                name="author"
                value={event.author}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="author"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Author
              </label>
            </div>

            {/* Rating */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="rating"
                name="rating"
                value={event.rating}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="rating"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Rating
              </label>
            </div>

            {/* Release Year */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="release_year"
                name="release_year"
                value={event.release_year}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="release_year"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Release Year
              </label>
            </div>

            {/* Number of Tickets */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="numberOfTickets"
                name="numberOfTickets"
                value={event.numberOfTickets}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="numberOfTickets"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Number of Tickets
              </label>
            </div>

            {/* Coupon Code */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="couponCode"
                name="couponCode"
                value={event.couponCode}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="couponCode"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Coupon Code (optional)
              </label>
            </div>

            {/* Discount Percentage */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="discountPercentage"
                name="discountPercentage"
                value={event.discountPercentage}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="discountPercentage"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Discount Percentage (optional)
              </label>
            </div>

            {/* Price */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="price"
                name="price"
                value={event.price}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="price"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>

            {/* VipTicket CouponCode */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="vipTicketCouponCode"
                name="vipTicketCouponCode"
                value={event.vipTicketCouponCode}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="vipTicketCouponCode"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                VipTicket CouponCode (optional)
              </label>
            </div>

            {/* Vip Ticket Name */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="vipTicketName"
                name="vipTicketName"
                value={event.vipTicketName}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="vipTicketName"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Vip Ticket Name
              </label>
            </div>

            {/* Vip Ticket Number Of Tickets */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="vipTicketNumberOfTickets"
                name="vipTicketNumberOfTickets"
                value={event.vipTicketNumberOfTickets}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="vipTicketNumberOfTickets"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Vip Ticket Number Of Tickets
              </label>
            </div>

            {/* Vip Ticket Price */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="vipTicketPrice"
                name="vipTicketPrice"
                value={event.vipTicketPrice}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="vipTicketPrice"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Vip Ticket Price
              </label>
            </div>

            {/* Image */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="image"
                name="image"
                value={event.image}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="image"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#f4e1ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Image
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="col-span-2 w-full bg-[#c783ff] text-white p-2 rounded-md hover:bg-[#d48cf6] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Event
            </button>
          </form>
        </div>

        {/* Display new event card immediately */}
        <div>
  <hr className="mt-[50px] h-[5px] bg-white" />
  <h2 className="mt-[20px] text-center text-2xl font-bold text-white">
    All Events
  </h2>
  {movies.length > 0 && (
    <div className="pt-[20px] px-2 py-5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-[#452B6F] text-white">
            <tr>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Image</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Title</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Description</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Author</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Rating</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Release Year</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Tickets</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Coupon Code</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Discount</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">VIP Coupon</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">VIP Name</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">VIP Tickets</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">VIP Price</th>
              <th className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#5E3A96] text-white divide-y divide-gray-200">
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td className="px-1 py-1">
                  <img src={movie.image} alt={movie.title} className="w-10 h-10 object-cover" />
                </td>
                <td className="px-1 py-1 text-xs">{movie.title}</td>
                <td className="px-1 py-1 text-xs">{movie.description}</td>
                <td className="px-1 py-1 text-xs">{movie.author}</td>
                <td className="px-1 py-1 text-xs">{movie.rating}</td>
                <td className="px-1 py-1 text-xs">{movie.release_year}</td>
                <td className="px-1 py-1 text-xs">{movie.numberOfTickets}</td>
                <td className="px-1 py-1 text-xs">{movie.couponCode}</td>
                <td className="px-1 py-1 text-xs">{movie.discountPercentage}</td>
                <td className="px-1 py-1 text-xs">{movie.price}</td>
                <td className="px-1 py-1 text-xs">{movie.vipTicketCouponCode}</td>
                <td className="px-1 py-1 text-xs">{movie.vipTicketName}</td>
                <td className="px-1 py-1 text-xs">{movie.vipTicketNumberOfTickets}</td>
                <td className="px-1 py-1 text-xs">{movie.vipTicketPrice}</td>
                <td className="px-1 py-1 text-xs flex space-x-1">
                <button
  onClick={() => EditEvent(movie.id)}
  type="button"
  className="bg-[#3a9228] text-white px-4 py-2 rounded hover:bg-[#35a035] transition duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
>
  Edit
</button>
                  {movie.delete ? (
                 <button
                 onClick={() => ReturnEvent(movie.id)}
                 type="button"
                 className="bg-[#983ce3] text-white px-4 py-2 rounded hover:bg-[#a12fff] transition duration-300 focus:outline-none focus:ring-2  focus:ring-opacity-50"
               >
                 Retrieve
               </button>
                  ) : (
                    <button
                    onClick={() => DeleteEvent(movie.id)}
                    type="button"
                    className="bg-[#c53131] text-white px-4 py-2 rounded hover:bg-[#ff3131] transition duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>


        <Footer />
      </div>
    </>
  );
}

export default Events;
