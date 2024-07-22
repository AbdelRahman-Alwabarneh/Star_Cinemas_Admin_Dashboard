import ServiceStatistics from "./Component/ServiceStatistics";
import Customers from "./Component/Customers";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSuccess = sessionStorage.getItem("issuccess");
    if (isSuccess === "false" || isSuccess === null) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
    <title>Star Cinemas - Home Admin</title>
      <Header />
      <ServiceStatistics />
      <Customers />
      <Footer />
    </>
  );
}
export default Home;
