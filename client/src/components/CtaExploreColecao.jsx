import { React, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel";
import "slick-carousel/slick/slick.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
const ContainerPrincipal = styled.div`
  /* ... */
  padding: 5% 0;
  min-height: fit-content;
  width: 100%;
  min-width: 100%;
  background-color: var(--color-background);
`;
const CardColecao = styled.div`
  /* ... */
  height: 400px;
  width: 95%;
  border-radius: 30px;
  position: relative;
  color: var(--color-text);
  background: var(--color-background-contrast-200);
`;
const Sliderzin = styled.div`
  /* ... */
  min-width: 100%;

  height: fit-content;
  display: flex;
  margin-bottom: 2.5rem;
`;

const Conteudo = styled.div`
  /* ... */
  margin: 0px 20px;
`;

const ButtonCTA = styled.button`
  /* ... */
  background-color: var(--color-text);
  color: var(--color-background);
  border-radius: 30px;
  font-family: "Exo 2";
  padding: 12px 19px;
  border: none;
  margin: 0 auto;
  font-weight: 200;
  font-size: var(--size-large-200);
  outline: none;
`;

const ContainerButtonCta = styled.div`
  /* ... */
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
`;
const ContainerInfo = styled.div`
  /* ... */
  text-align: center;
  width: 90%;
  margin: 0 5%;
  display: flex;
  margin-bottom: 2.5rem;
`;

const TituloSlider = styled.div`
  max-width: 40%;
  color: var(--color-text);
  font-size: var(--size-large-400);
  font-weight: 800;
  /* ... */
`;
const DescSlider = styled.div`
  /* ... */
  margin-left: auto;
  color: var(--color-text-soft);
  max-width: 20%;
  font-size: var(--size-medium);
`;

const TituloCard = styled.div`
  /* ... */
  position: absolute;
  bottom: 12%;
  left: 5%;
  width: 50%;
  font-size: var(--size-large-400);
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
      <ContainerInfo>
        <TituloSlider>
          It's important to me that you're happy. Don't be afraid{" "}
        </TituloSlider>
        <DescSlider>
          to make these big decisions. Once you start, they sort of just make
          themselves. Now we can begin working on lots of happy little things.
          The more we do this - the more it will do good things to our heart.
        </DescSlider>
      </ContainerInfo>
      <Sliderzin id="slickCOntainer" data-slick={settings}>
        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>

        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>

        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>

        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>

        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>

        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>

        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>

        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>

        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>

        <Conteudo>
          <CardColecao>
            <TituloCard>
              Just beat the devil out of it. We don't have anything but happy
              trees here.
            </TituloCard>
          </CardColecao>
        </Conteudo>
      </Sliderzin>
      <ContainerButtonCta>
        <ButtonCTA>Explore Mais</ButtonCTA>
      </ContainerButtonCta>
    </ContainerPrincipal>
  );
};

export default CtaExploreColecao;
