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
  width: 70%;
  border-radius: 30px;
  background: var(--color-background-contrast-200);
  display: flex;
  height: 550px;

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

const BannerCta = () => {
  return (
    <Container>
      <CardBanner>
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
