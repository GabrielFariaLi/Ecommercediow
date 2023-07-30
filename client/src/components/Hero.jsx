import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button as ButtonMui } from "@mui/material";
import { styled as styledMui } from "@mui/material/styles";
import styled from "styled-components";
import { ArrowRight } from "@material-ui/icons";
import bannerImage from "../assets/imgs/banner.jpg";

const Button = styledMui(ButtonMui)`
  color:var(--color-text) !important;
  background: var(--color-background) !important;
  padding: 12px 27px;
  min-height: 60px;
  max-height: 60px;
  font-family: var(--font-corpo);
`;
const ContainerPrincipal = styled.div`
  /* ... */
  margin-top: 212px;
  height: calc(100vh - 212px);

  width: 100%;
  position: relative;
`;

const ImagemBanner = styled.img`
  /* ... */
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
  max-width: 100%;
  max-height: 100%;
`;

const Wrapper = styled.div`
  /* ... */

  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 30%;
  left: 3%;
`;

const Hero = () => {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  return (
    <ContainerPrincipal>
      <ImagemBanner src={bannerImage}></ImagemBanner>
      <Wrapper>
        <Button variant="contained" className="CheckButton">
          COMPRE AGORA IMUNDO <ArrowRight />
        </Button>
      </Wrapper>
    </ContainerPrincipal>
  );
}
export default Hero;
