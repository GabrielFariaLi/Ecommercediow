import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Paper, Button as ButtonMui } from "@mui/material";
import { styled as styledMui } from "@mui/material/styles";

import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import ArrowRight from "@material-ui/icons/ArrowRight";
import currencyFormatter from "currency-formatter";
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 5px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  /* Your styles here */
  width: 100%;
`;

const fadeSlideDownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContainerComprarBtn = styled.div`
  /* ... */

  opacity: 0;
  display: flex;
  width: 100%;

  transition: cubic-bezier(0.42, 0, 0.58, 1) 0.5s;
  margin-bottom: 8px;
`;

const Container = styled.div`
  flex-basis: 23%;
  margin: 5px auto;
  height: fit-content;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  position: relative;
  transition: cubic-bezier(0.42, 0, 0.58, 1) 0.5s;

  &:hover ${ContainerComprarBtn} {
    opacity: 1;
    transition: cubic-bezier(0.42, 0, 0.58, 1) 0.5s;

    animation: ${fadeSlideDownAnimation} 0.5s ease-out forwards;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
  z-index: 2;
`;

const ContainerImg = styled.div`
  /* ... */
  width: 100%;
  height: 266px;
  box-sizing: border-box;
  padding: 10px 10px 0px 10px;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ContainerInfo = styled.div`
  /* ... */
  box-sizing: border-box;
  align-items: center;
  padding: 0 3.5%;
  margin-top: 17px;
  transition: cubic-bezier(0.42, 0, 0.58, 1);
  width: 100%;
  display: flex;
`;
const CategoriaInfo = styled.div`
  /* ... */
  font-size: var(--size-small);
  color: var(--color-text-soft);
`;

const TituloProduto = styled.div`
  /* ... */
  font-size: var(--size-large);
  color: var(--color-text);
`;

const PrecoProduto = styled.div`
  /* ... */
  border-radius: 15px;
  color: var(--color-text);
  margin: 0px auto;
  height: fit-content;
  padding: 7px 14px;
  font-size: 18px;
  font-weight: bold;
`;

const Column = styled.div`
  /* ... */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const LikeButton = styled.div`
  /* ... */
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--color-text);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 4;
  cursor: pointer;
`;
const Parcelas = styled.div`
  /* ... */
  text-align: center;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
`;

const ComprarBtn = styledMui(ButtonMui)`
width: 100%;
background: var(--color-text);
border-radius: 5px;
color: var(--color-background);
padding: 15px 0px;
display: flex;
justify-content: center;
align-items: center;
&:hover{
  background: var(--color-text);
color: var(--color-background);
}
`;

const Product = ({ item }) => {
  const [like, setLike] = useState(false);
  const darLike = () => {
    like === true ? setLike(false) : setLike(true);
    console.log();
  };
  return (
    <>
      {" "}
      <Container>
        {/*         <LikeButton>
          {like ? (
            <Favorite onClick={() => darLike()} className="likeIconProduct" />
          ) : (
            <FavoriteBorderIcon
              onClick={() => darLike()}
              className="likeIconProduct"
            />
          )}
        </LikeButton> */}

        <ContainerImg>
          <Image src={item.img} />
        </ContainerImg>
        {/*  <Info>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info> */}
        <ContainerInfo>
          <Column>
            {/*   <CategoriaInfo>{item.categories[0]}</CategoriaInfo> */}
            <TituloProduto>{item.title}</TituloProduto>

            <PrecoProduto>
              {currencyFormatter.format(item.price, { code: "BRL" })}
              <Parcelas>2x de {(item.price / 2 + 6).toFixed(2)} </Parcelas>
            </PrecoProduto>

            <ContainerComprarBtn>
              <StyledLink to={`/product/${item._id}`}>
                <ComprarBtn>
                  Comprar <ArrowRight />{" "}
                </ComprarBtn>
              </StyledLink>
            </ContainerComprarBtn>
          </Column>
        </ContainerInfo>
      </Container>
    </>
  );
};

export default Product;
