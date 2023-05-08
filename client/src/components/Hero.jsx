import React from "react";
import styled from "styled-components";
import pinheirosIMAGE from "../../src/assets/imgs/pinheiros.png"; // import the image file
import airsoftDude from "../../src/assets/imgs/airsoftDude.png"; // import the image file
import "../components/css/Hero.css";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background: var(--color-background);
  overflow: hidden;
`;
const ContainerImg = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const BackgroundImage = styled.img`
  height: 100%;
  width: 100%;
  object-position: 50% 20%;
  filter: grayscale(80%);
  object-fit: cover;
`;
const AirsoftDudeImage = styled.img`
  position: absolute;
  bottom: -80%;
  left: 50%;
  transform: translate(-50%, 0);
`;

const ContainerGrafismoAirsoft = styled.div`
  /* ... */
  position: absolute;
  bottom: 0%;
  left: 49%;
  color: var(--color-text);
  opacity: 0.3;
  filter: blur(1px);
  transform: translate(-50%, 0);
  width: 900px;
  height: 900px;
`;
const ContainerInfosHero = styled.div`
  /* ... */
  position: absolute;
  bottom: 10%;
  left: 10%;
`;

const TextoNomeLoja = styled.h1`
  /* ... */

  font-family: "AudioWide";
  color: var(--color-text);
`;
const PrimeiraLinhaTextoNomeLoja = styled.span`
  /* ... */
  font-family: "AudioWide";
  font-size: 50px;
`;
const SegundaLinhaTextoNomeLoja = styled.span`
  /* ... */
  font-family: "AudioWide";
  font-size: 150px;
`;
const ContainerCTA = styled.div`
  /* ... */
  color: var(--color-green);
  display: flex;
  gap: 10px;
  align-items: center;
  font-family: "Exo 2";
  text-transform: uppercase;
`;
const ContainerBreveDescricao = styled.div`
  /* ... */
  color: var(--color-text-soft);
  margin-bottom: 30px;
  font-family: "Exo 2";
`;

const Hero = () => {
  return (
    <Container>
      <ContainerImg>
        <BackgroundImage src={pinheirosIMAGE}></BackgroundImage>
      </ContainerImg>
      <ContainerGrafismoAirsoft>
        <svg
          fill="currentColor"
          width="100%"
          height="100%"
          stroke="true"
          strokeWidth="0.2"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>square</title>
          <path
            strokeWidth="0.2"
            d="M0.75 0.75v30.5h30.5v-30.5zM28.75 28.75h-25.5v-25.5h25.5z"
          ></path>
        </svg>
      </ContainerGrafismoAirsoft>
      <AirsoftDudeImage src={airsoftDude}></AirsoftDudeImage>
      <ContainerInfosHero>
        {" "}
        <TextoNomeLoja>
          <PrimeiraLinhaTextoNomeLoja>TACTICAL</PrimeiraLinhaTextoNomeLoja>
          <br />
          <SegundaLinhaTextoNomeLoja>AIRSOFT</SegundaLinhaTextoNomeLoja>
        </TextoNomeLoja>
        <ContainerBreveDescricao>
          Airsoft Upgrades & Melhoramentos Tácticos.
        </ContainerBreveDescricao>
        <ContainerCTA>
          Compre agora <div class="blinking-lineCTA"></div>
        </ContainerCTA>
      </ContainerInfosHero>
    </Container>
  );
};

export default Hero;
