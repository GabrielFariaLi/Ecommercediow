import React from "react";
import { useEffect } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BannerCta from "../components/BannerCta";
import Products from "../components/Products";
import FilterProducts from "../components/FilterProducts";
import CtaExploreColecao from "../components/CtaExploreColecao";

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
      {/*    <Categories /> */}
      <Products filters={{ price: [0, 99999] }} />
      <CtaExploreColecao />
      <BannerCta />

      <Footer />
    </div>
  );
};

export default Home;
