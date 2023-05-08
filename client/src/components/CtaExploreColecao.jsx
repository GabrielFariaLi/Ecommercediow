import { React, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel";
import "slick-carousel/slick/slick.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
const ContainerPrincipal = styled.div`
  /* ... */
  min-height: 1000px;
  width: 100%;
  background-color: var(--color-background);
`;
const CardColecao = styled.div`
  /* ... */
  height: 400px;
  width: 500px;
  border-radius: 30px;
  background: var(--color-background-contrast-200);
`;
const Sliderzin = styled.div`
  /* ... */
  width: 100%;
  height: 600px;
  display: flex;
  max-height: 600px;
`;

const CtaExploreColecao = () => {
  useEffect(() => {
    $("#slickCOntainer").slick();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <ContainerPrincipal>
      <Sliderzin id="slickCOntainer" data-slick={settings}>
        <CardColecao>a</CardColecao>
        <CardColecao>b</CardColecao>
        <CardColecao>c</CardColecao>
        <CardColecao>d</CardColecao>
        <CardColecao>e</CardColecao>
      </Sliderzin>
    </ContainerPrincipal>
  );
};

export default CtaExploreColecao;
