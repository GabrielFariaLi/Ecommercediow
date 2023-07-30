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
import styled from "styled-components";

import FilterProducts from "../components/FilterProducts";
import CtaExploreColecao from "../components/CtaExploreColecao";
import CarouselProduct from "../components/CarouselProduct";
import HistoriaLoja from "../components/HistoriaLoja";
import { LocalShipping } from "@material-ui/icons";

const ContainerFreteGratis = styled.div`
  /* ... */
  width: 100%;
  padding: 30px 0px;
  height: fit-content;
  display: flex;
  justify-content: center;
  background: white;
  position: relative;
`;

const ContainerInfosHero = styled.div`
  /* ... */
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-text);
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  border-radius: 10px;
  height: 50px;
  color: var(--color-background);
  position: absolute;
  top: -25px;

  padding: 0px 20px;
  gap: 10px;
  z-index: 10;
`;

const ContainerHomePrincipal = styled.div`
  /* ... */
  overflow-x: hidden;
  min-width: 100vw;
  max-width: 100%;
  max-height: 100%;
`;

const ContainerTexto = styled.div`
  /* ... */
`;

const Home = () => {
  const utilizadorAtual = useSelector((estado) => estado?.user);
  useEffect(() => {
    console.log(utilizadorAtual);
  }, [utilizadorAtual]);
  return (
    <ContainerHomePrincipal>
      {/*  <Announcement /> */}
      <Navbar />
      <Hero />

      {/*  <Slider /> */}
      {/*    <Categories /> */}
      <ContainerFreteGratis>
        <ContainerInfosHero>
          <LocalShipping />
          <ContainerTexto>
            FRETE GRÁTIS A PARTIR DE <b>R$200,00*</b>
          </ContainerTexto>
        </ContainerInfosHero>
      </ContainerFreteGratis>
      <CarouselProduct variante={""} />
      <BannerCta variante={"fullScreen"} />
      {/* <Products filters={{ price: [0, 99999] }} /> */}
      <CarouselProduct variante={"singleRow"} />
      <HistoriaLoja />
      {/*   <CtaExploreColecao /> */}

      <Footer />
    </ContainerHomePrincipal>
  );
};

export default Home;
