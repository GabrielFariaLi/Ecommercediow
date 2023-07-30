import React from "react";
import styled from "styled-components";
const Container = styled.div`
  /* ... */
  width: 100%;
  background: var(--color-background);
  color: var(--color-text);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10rem;
`;
const CardBanner = styled.div`
  /* ... */
  width: ${(props) => (props.variante === "fullScreen" ? "100%" : "70%")};
  border-radius: ${(props) =>
    props.variante === "fullScreen" ? "0px" : "30px"};
  background: ${(props) =>
    props.variante === "fullScreen"
      ? "url('https://i.ibb.co/VvTQs0X/5f1fbcaf-0818-45ac-b085-55be10324ac7.jpg')  no-repeat"
      : "var(--color-background-contrast-200)"};
  display: flex;

  object-fit: fill;
  background-size: contain;
  height: 550px;

  /* color: white; */
  justify-content: center;
  align-items: center;
`;
const TituloBanner = styled.h1`
  /* ... */
  font-weight: 800;
`;

const DescricaoBanner = styled.p`
  /* ... */
`;
const InfoBanner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 55%;
  gap: 2rem;
  text-align: center;
  /* ... */
`;

const BannerCta = ({ variante }) => {
  return (
    <Container>
      <CardBanner variante={variante}>
        <InfoBanner>
          <TituloBanner>
            Encontre ofertas animadoras e promoções especiais apenas hoje!
            confira!
          </TituloBanner>
          <DescricaoBanner>
            I started painting as a hobby when I was little. I didn't know I had
            any talent. I believe talent is just a pursued interest. Anybody can
            do what I do. Just go back and put one little more happy tree in
            there. Everybody's different.{" "}
          </DescricaoBanner>
        </InfoBanner>
      </CardBanner>
    </Container>
  );
};

export default BannerCta;
