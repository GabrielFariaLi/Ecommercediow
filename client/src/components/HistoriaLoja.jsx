import React from "react";
import styled from "styled-components";

const ContainerPrincipal = styled.div`
  /* ... */
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
  background: white;
`;
const Wrapper = styled.div`
  /* ... */
  width: 100%;
  padding: 5% 10%;
`;
const Texto = styled.div`
  /* ... */
  font-family: "Noto Serif JP";
  font-size: 18px;
`;

const Titulo = styled.div`
  /* ... */
  text-align: center;
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 2.307692308em;
  margin-bottom: 5px;
`;
const Subtitulo = styled.div`
  /* ... */
  text-align: center;
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 15px;
`;

const LinhaDivisoria = styled.div`
  /* ... */
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const HistoriaLoja = () => {
  return (
    <ContainerPrincipal>
      <Wrapper>
        <Titulo>DSPS Skateshop</Titulo>
        <Subtitulo>A sua loja virtual de skate</Subtitulo>
        <LinhaDivisoria></LinhaDivisoria>
        <Texto>
          A RETTA SKATESHOP é uma loja especializada em skate que atende todo
          território brasileiro e tem a missão de oferecer peças, tênis, roupas
          e acessórios com propriedade de conhecimento. Oferecemos aos nossos
          clientes, as principais marcas importadas: Vans, Nike SB, Adidas
          Skateboarding, Primitive, Bones, Element, Thrasher, Spitfire,
          Independent, Magenta, Thunder e nacionais: ÖUS, Future, Hocks, High,
          Class e muito mais. Criada em 2009, nossa equipe de atendimento é
          capacitada para oferecer o melhor atendimento especializado e conta
          com skatistas influentes em sua equipe formada por Rafael Gomes,
          Wilton Souza, Pedro Biagio, Léo Adrian e Thiago Neves que tem partes
          em vídeos e publicações em importantes mídias, redes sociais de marcas
          internacionais como Thrasher Skateboard Magazine, New Balance Numeric,
          Honeypot Wheels e nacionais como a revista Cemporcento skate, Tribo
          Skate, Vista Skate Magazine entre outras. Nossa primeira loja física
          foi inaugurada em 2015, atendendo a região e constantemente trazendo
          novidades em materiais, além da realização de ações como: eventos,
          restauração de locais e conquista de novos espaços para a prática de
          skate.
        </Texto>
      </Wrapper>
    </ContainerPrincipal>
  );
};

export default HistoriaLoja;
