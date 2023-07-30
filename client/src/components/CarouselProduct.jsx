import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

import styled from "styled-components";
import Products from "./Products";

const ContainerPrincipal = styled.div`
  /* ... */
  margin-top: 212px;
  height: 80vh;
  width: 100vw;
`;

const CarouselProduct = (variante) => {
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
    <Carousel navButtonsAlwaysVisible={true} indicators={false}>
      {[0, 1].map((item, i) => (
        <Products
          variante={variante ? variante : ""}
          indexCarousel={i}
          origem={"CarouselHomePageNovidades"}
          filters={{ price: [0, 99999] }}
        />
      ))}
    </Carousel>
  );
};

function Item(props) {
  return (
    <ContainerPrincipal>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </ContainerPrincipal>
  );
}
export default CarouselProduct;
