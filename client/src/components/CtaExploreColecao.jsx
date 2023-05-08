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
  width: 95%;
  border-radius: 30px;

  color: var(--color-text);
  background: var(--color-background-contrast-200);
`;
const Sliderzin = styled.div`
  /* ... */
  min-width: 100%;

  height: 600px;
  display: flex;
`;

const Conteudo = styled.div`
  /* ... */
  margin: 0px 20px;
`;

const CtaExploreColecao = () => {
  useEffect(() => {
    $("#slickCOntainer").slick({
      centerMode: true,
      centerPadding: "60px",
      slidesToShow: 2,

      dots: true,
      infinite: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1,
          },
        },
      ],
    });
  }, []);

  const settings = {
    centerMode: true,
    arrows: false,
    dots: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <ContainerPrincipal>
      <Sliderzin id="slickCOntainer" data-slick={settings}>
        <Conteudo>
          <CardColecao></CardColecao>
        </Conteudo>
        <Conteudo>
          <CardColecao></CardColecao>
        </Conteudo>
        <Conteudo>
          <CardColecao></CardColecao>
        </Conteudo>
        <Conteudo>
          <CardColecao></CardColecao>
        </Conteudo>
        <Conteudo>
          <CardColecao></CardColecao>
        </Conteudo>
        <Conteudo>
          <CardColecao></CardColecao>
        </Conteudo>
        <Conteudo>
          <CardColecao></CardColecao>
        </Conteudo>
        <Conteudo>
          <CardColecao></CardColecao>
        </Conteudo>
        <Conteudo>
          <CardColecao></CardColecao>
        </Conteudo>
      </Sliderzin>
    </ContainerPrincipal>
  );
};

export default CtaExploreColecao;
