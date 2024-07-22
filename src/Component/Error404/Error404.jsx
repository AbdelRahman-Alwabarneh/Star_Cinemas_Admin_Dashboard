import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Error404() {
    const navigate = useNavigate();

    useEffect(() => {
      const isSuccess = sessionStorage.getItem("issuccess");
      if (isSuccess === "false" || isSuccess === null) {
        navigate("/login");
      }
    }, [navigate]);
  return (
    <>
    <title>Star Cinemas - Error404 Admin</title>

      <section className="flex items-center h-screen p-16 bg-[#270F3B] dark:bg-gray-700">
        <div className="container flex flex-col items-center ">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-white dark:text-gray-100">
              <span className="sr-only ">Error</span>404
            </h2>
            <p className="text-2xl md:text-3xl text-white">
              Sorry, we couldn't find this page.
            </p>
            <Link
              to="/"
              className="px-8 py-4 text-xl font-semibold rounded bg-white text-black hover:text-[#7c257e]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error404;
