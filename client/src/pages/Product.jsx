import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import ChevronRight from "@material-ui/icons/ChevronRight";
import StarRate from "@material-ui/icons/StarRate";
import ChatIcon from "@material-ui/icons/Chat";
import CreditCard from "@material-ui/icons/CreditCard";
import LocalShipping from "@material-ui/icons/LocalShipping";
import Loyalty from "@material-ui/icons/Loyalty";
import Inbox from "@material-ui/icons/Inbox";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  padding-top: 100px;
  background: var(--color-background);
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  border-radius: 30px;
`;

const Image = styled.img`
  border-radius: 30px;
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  color: var(--color-text);
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: var(--size-medium);
  border: 1px solid var(--color-text);
  color: var(--color-text);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 34px;
  height: 46px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 7px 34px;
  height: 46px;
  box-sizing: border-box;
  border-radius: 30px;
  border: none;
  outline: none;
  cursor: pointer;
  width: fit-content;
  font-weight: 500;
  display: flex;
  align-items: center;
  &:hover {
    /* background-color: #f8f4f4; */
  }
`;
const ContainerBreadCrumbs = styled.div`
  /* ... */
  display: flex;
  align-items: center;
`;
const ContainerComentariosAvaliacoes = styled.div`
  /* ... */
  display: flex;
`;

const ContainerAvaliacoes = styled.div`
  /* ... */
  align-items: center;
  flex: 1;
  display: flex;
`;
const ContainerComentarios = styled.div`
  /* ... */
  flex: 1;
  align-items: center;
  display: flex;
`;
const ContainerSelecionarTamanho = styled.div`
  /* ... */
  flex: 1;
  margin-top: 2rem;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const TituloTamanho = styled.div`
  /* ... */
  font-size: var(--size-medium);
  color: var(--color-text);
  font-weight: 800;
`;
const TituloCor = styled.div`
  /* ... */
  /* ... */
  font-size: var(--size-medium);
  color: var(--color-text);
  font-weight: 800;
`;
const ContainerSelecionarCor = styled.div`
  /* ... */
  flex: 1;
  margin-top: 2rem;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const TamanhosSelect = styled.div`
  /* ... */
  margin-top: 0.5rem;
  display: flex;
  gap: 20px;
  height: fit-content;
  align-items: center;
`;
const TamanhoOption = styled.div`
  /* ... */
  display: flex;

  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  align-items: center;
  min-width: 30px;
  justify-content: center;
  border: 1px solid var(--color-text);
  color: 1px solid var(--color-text);
`;
const CoresSelect = styled.div`
  /* ... */
  margin-top: 0.5rem;
  height: fit-content;
  display: flex;
  gap: 20px;
  align-items: center;
`;
const CorOption = styled.div`
  /* ... */
  cursor: pointer;
  display: flex;
  gap: 20px;
  height: 30px;
  width: 30px;
  background-color: ${(props) =>
    props.color === "Vermelho"
      ? "red"
      : props.color === "Verde"
      ? "green"
      : props.color === "Azul"
      ? "blue"
      : ""};
  border: 1px solid grey;
  border-radius: 50%;
  align-items: center;
`;
const Divider = styled.div`
  /* ... */
  height: 1px;
  background: var(--color-text-soft);
  width: 100%;
  margin: 3rem 0;
`;

const H1 = styled.h1`
  /* ... */
  text-align: center;
  background: var(--color-background);
  color: var(--color-text);
  padding-bottom: 1rem;
  font-weight: 500;
  font-family: "Exo 2";
`;
const ContainerVantagensIcons = styled.div`
  /* ... */
  width: 100%;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ContainerBackgroundIcone = styled.div`
  /* ... */
  width: 40px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: var(--color-background-soft);
`;

const ContainerItemVantagem = styled.div`
  /* ... */
  width: 50%;
  margin-bottom: 2rem;
  gap: 15px;
  display: flex;
  align-items: center;
`;

const ContainerTextoVantagem = styled.p`
  /* ... */
  color: var(--color-text);
  font-size: var(--size-medium);
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };
  return (
    <Container>
      <Navbar />

      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <ContainerBreadCrumbs>
            Comprar <ChevronRight />
            Categoria <ChevronRight /> Subcategoria
          </ContainerBreadCrumbs>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <ContainerComentariosAvaliacoes>
            <ContainerAvaliacoes>
              <StarRate />
              <StarRate />
              <StarRate />
              <StarRate />
              <StarRate />
              5.0
            </ContainerAvaliacoes>
            <ContainerComentarios>
              <ChatIcon /> 999 Comentários
            </ContainerComentarios>
          </ContainerComentariosAvaliacoes>
          <ContainerSelecionarTamanho>
            <TituloTamanho>Selecionar Tamanho</TituloTamanho>
            <TamanhosSelect>
              {product.size?.map((c) => (
                <TamanhoOption
                  style={{
                    background:
                      size === c ? "var(--color-text)" : "transparent",
                    color:
                      size === c
                        ? "var(--color-background)"
                        : "var(--color-text)",
                    borderColor:
                      size === c
                        ? "var(--color-background)"
                        : "var(--color-text)",
                  }}
                  color={c}
                  key={c}
                  onClick={() => setSize(c)}
                >
                  {c}
                </TamanhoOption>
              ))}
            </TamanhosSelect>
          </ContainerSelecionarTamanho>
          <ContainerSelecionarCor>
            <TituloCor>Cores Disponíveis</TituloCor>
            <CoresSelect>
              {product.color?.map((c) => (
                <CorOption
                  style={{
                    content: color === c ? "\\2713" : "",
                    border: color === c ? "2px solid var(--color-text)" : "",
                    backgroundClip: color === c ? "content-box" : "",
                    padding: color === c ? "2px" : "",
                  }}
                  color={c}
                  key={c}
                  onClick={() => setColor(c)}
                />
              ))}
            </CoresSelect>
          </ContainerSelecionarCor>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <Button onClick={handleClick}>
              ADD TO CART{" "}
              <AmountContainer>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity("inc")} />
              </AmountContainer>
            </Button>
            <Price>$ {product.price}</Price>
          </AddContainer>
          <Divider />

          <ContainerVantagensIcons>
            <ContainerItemVantagem>
              <ContainerBackgroundIcone>
                <CreditCard />
              </ContainerBackgroundIcone>
              <ContainerTextoVantagem>Pagamento Seguro</ContainerTextoVantagem>
            </ContainerItemVantagem>
            <ContainerItemVantagem>
              <ContainerBackgroundIcone>
                <LocalShipping />
              </ContainerBackgroundIcone>
              <ContainerTextoVantagem>
                Entrega ao menor preço{" "}
              </ContainerTextoVantagem>
            </ContainerItemVantagem>
            <ContainerItemVantagem>
              <ContainerBackgroundIcone>
                <Loyalty />
              </ContainerBackgroundIcone>
              <ContainerTextoVantagem>
                {" "}
                Encaixe perfeito{" "}
              </ContainerTextoVantagem>
            </ContainerItemVantagem>
            <ContainerItemVantagem>
              <ContainerBackgroundIcone>
                <Inbox />
              </ContainerBackgroundIcone>
              <ContainerTextoVantagem>
                {" "}
                Devolução em itens quebrados{" "}
              </ContainerTextoVantagem>
            </ContainerItemVantagem>
          </ContainerVantagensIcons>
        </InfoContainer>
      </Wrapper>
      <H1>Mais itens que podem ser do seu interesse!</H1>
      <Products />
      <Footer />
    </Container>
  );
};

export default Product;
