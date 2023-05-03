import React from "react";
import { useEffect } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  const utilizadorAtual = useSelector((estado) => estado?.user);
  useEffect(() => {
    console.log(utilizadorAtual);
  }, [utilizadorAtual]);
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
