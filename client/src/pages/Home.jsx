import React from "react";
import { useEffect } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import FilterProducts from "../components/FilterProducts";
import Slider from "../components/Slider";

const Home = () => {
  const utilizadorAtual = useSelector((estado) => estado?.user);
  useEffect(() => {
    console.log(utilizadorAtual);
  }, [utilizadorAtual]);
  return (
    <div>
      {/*  <Announcement /> */}
      <Navbar />
      <Hero />
      {/*  <Slider /> */}
      <Categories />
      <Products />
      <FilterProducts />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
