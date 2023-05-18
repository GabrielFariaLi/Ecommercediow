import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 30px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  margin: 5px;
  max-width: 280px;
  height: 350px;
  display: flex;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-contrast-200);
  position: relative;

  &:hover ${Info} {
    opacity: 1;
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
  border-radius: 30px;
  z-index: 2;
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
  max-width: 280px;
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
  background-color: var(--color-background-contrast-300);
  border-radius: 15px;
  color: var(--color-text);
  margin-left: auto;
  height: fit-content;
  padding: 7px 14px;
`;

const Column = styled.div`
  /* ... */
  display: flex;
  flex-direction: column;
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

const Product = ({ item }) => {
  const [like, setLike] = useState(false);
  const darLike = () => {
    like === true ? setLike(false) : setLike(true);
    console.log();
  };
  return (
    <>
      {" "}
      <Column>
        <Container>
          <LikeButton>
            {like ? (
              <Favorite onClick={() => darLike()} className="likeIconProduct" />
            ) : (
              <FavoriteBorderIcon
                onClick={() => darLike()}
                className="likeIconProduct"
              />
            )}
          </LikeButton>

          <Image src={item.img} />
          <Info>
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
          </Info>
        </Container>
        <ContainerInfo>
          <Column>
            <CategoriaInfo>{item.categories[0]}</CategoriaInfo>
            <TituloProduto>{item.title}</TituloProduto>
          </Column>
          <PrecoProduto>R$ {item.price}</PrecoProduto>
        </ContainerInfo>
      </Column>
    </>
  );
};

export default Product;
