import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import KonvaTest from "../components/KonvaTest";
import MuiTextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import muiBadge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import {
  AcUnitOutlined,
  LocalShipping,
  FlashOn,
  CreditCard,
  BarChart,
  AccountBalanceWallet,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";

import { styled as styledMui } from "@mui/material/styles";

const KEY = process.env.REACT_APP_STRIPE;
const Badge = styled(muiBadge)(({ theme }) => ({
  "& .MuiBadge-colorPrimary": {
    background: "var(--color-text) ",
    color: "var(--color-background)",
  },
}));
const CustomFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: "var(--color-text) !important",
  },
  "& .MuiInputLabel-root": {
    color: "var(--color-text) !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-text)",
  },
  "& .MuiOutlinedInput-input": {
    borderColor: "var(--color-text)",
  },
  "& .Mui-focused": {
    borderColor: "var(--color-text) !important",
    color: "var(--color-text) !important",
  },
}));
const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "var(--color-text)",
    fill: "var(--color-text)",
  },
  "& .MuiInputBase-input": {
    color: "var(--color-text)",
    fill: "var(--color-text)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-text)",
    fill: "var(--color-text)",
  },
  "& .MuiOutlinedInput-input": {
    borderColor: "var(--color-text)",
    fill: "var(--color-text)",
  },
  "& .Mui-focused": {
    borderColor: "var(--color-text) !important",
    fill: "var(--color-text)",
    color: "var(--color-text) !important",
  },
  "& .MuiSvgIcon-root": {
    fill: "var(--color-text)",
  },
}));

const CustomTextField = styled(MuiTextField)(({ theme }) => ({
  flex: "1",
  "& .MuiInputLabel-root": {
    color: "var(--color-text)",
  },
  "& .MuiInputBase-input": {
    color: "var(--color-text)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-text)",
  },
  "& .MuiOutlinedInput-input": {
    borderColor: "var(--color-text)",
  },
  "& .Mui-focused": {
    borderColor: "var(--color-text) !important",
    color: "var(--color-text) !important",
  },
}));

const Container = styled.div`
  background: var(--color-background);
  max-width: 100vw;
`;

const Wrapper = styled.div`
  padding: 80px 10%;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 15px;
`;

const Details = styled.div`
  padding: 0px 0px 0px 20px;
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-weight: 800;
`;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
  font-weight: 300;
  color: var(--color-text-soft);
`;

const PriceDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const ContainerConteudos = styled.div`
  /* ... */
  width: 100%;
  height: 100%;
`;

const Left = styled.div`
  /* ... */
  flex: 1;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const TituloSecaoInformacao = styled.div`
  /* ... */
  font-size: var(--size-large);

  color: var(--color-text);
  font-weight: 800;
  margin-bottom: 20px;
`;
const ContainerInfo = styled.div`
  /* ... */
  background: var(--color-background-soft);
  color: var(--color-text);
  padding: 20px;
  display: flex;
  border-radius: 15px;
  gap: 20px;
  flex-direction: column;
`;

const Linha = styled.div`
  /* ... */
  width: 100%;
  display: flex;
  gap: 20px;
`;

const ContainerChips = styled.div`
  /* ... */
  display: flex;
  gap: 20px;
`;

const ContainerPrecoProduto = styled.div`
  /* ... */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Cart = () => {
  const [estadoParaEntrega, setEstadoParaEntrega] = useState("DF");
  const [optionDelivery, setOptionDelivery] = useState("Normal");
  const [optionPagamento, setOptionPagamento] = useState("Cartão");

  const handleEstadoChange = (event) => {
    setEstadoParaEntrega(event.target.value);
  };
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleSelecionarDeliveryOption = (event) => {
    setOptionDelivery(event);
  };
  const handleSelecionarPagamentoOption = (event) => {
    setOptionPagamento(event);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);
  return (
    <Container>
      <Navbar />

      <Wrapper>
        {/*  <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top> */}
        <ContainerConteudos></ContainerConteudos>
        <Bottom>
          <Left>
            <div>
              <TituloSecaoInformacao>
                Informações da entrega
              </TituloSecaoInformacao>
              <ContainerInfo>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                  <CustomTextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                </Linha>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                  <CustomTextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                </Linha>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                  <CustomTextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                  <CustomFormControl>
                    <InputLabel id="demo-simple-select-label">
                      Estado
                    </InputLabel>
                    <CustomSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={estadoParaEntrega}
                      label="Estado"
                      onChange={handleEstadoChange}
                    >
                      <MenuItem value={"DF"}>DF</MenuItem>
                      <MenuItem value={"SP"}>SP</MenuItem>
                      <MenuItem value={"RJ"}>RJ</MenuItem>
                    </CustomSelect>
                  </CustomFormControl>
                </Linha>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                </Linha>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                </Linha>
              </ContainerInfo>
            </div>
            <div>
              <TituloSecaoInformacao>
                Informações de envio
              </TituloSecaoInformacao>
              <ContainerInfo>
                <ContainerChips>
                  <Chip
                    icon={
                      <AcUnitOutlined
                        style={{
                          color:
                            optionDelivery !== "Normal"
                              ? "var(--color-text)"
                              : "var(--color-background)",
                        }}
                      />
                    }
                    className="chipsFiltro"
                    label={"Normal"}
                    style={{
                      flex: "1",
                      background:
                        optionDelivery !== "Normal"
                          ? "var(--color-background)"
                          : "var(--color-text)",
                      color:
                        optionDelivery !== "Normal"
                          ? "var(--color-text)"
                          : "var(--color-background)",
                    }}
                    variant={
                      optionDelivery !== "Normal" ? "outlined" : "filled"
                    }
                    onClick={() => handleSelecionarDeliveryOption("Normal")}
                  />
                  <Chip
                    icon={
                      <LocalShipping
                        style={{
                          color:
                            optionDelivery !== "Express"
                              ? "var(--color-text)"
                              : "var(--color-background)",
                        }}
                      />
                    }
                    className="chipsFiltro"
                    label={"Express"}
                    style={{
                      flex: "1",
                      background:
                        optionDelivery !== "Express"
                          ? "var(--color-background)"
                          : "var(--color-text)",
                      color:
                        optionDelivery !== "Express"
                          ? "var(--color-text)"
                          : "var(--color-background)",
                    }}
                    variant={
                      optionDelivery !== "Express" ? "outlined" : "filled"
                    }
                    onClick={() => handleSelecionarDeliveryOption("Express")}
                  />
                  <Chip
                    icon={
                      <FlashOn
                        style={{
                          color:
                            optionDelivery !== "Mesmo dia"
                              ? "var(--color-text)"
                              : "var(--color-background)",
                        }}
                      />
                    }
                    className="chipsFiltro"
                    label={"Mesmo dia"}
                    style={{
                      flex: "1",
                      padding: "10px",
                      background:
                        optionDelivery !== "Mesmo dia"
                          ? "var(--color-background)"
                          : "var(--color-text)",
                      color:
                        optionDelivery !== "Mesmo dia"
                          ? "var(--color-text)"
                          : "var(--color-background)",
                    }}
                    variant={
                      optionDelivery !== "Mesmo dia" ? "outlined" : "filled"
                    }
                    onClick={() => handleSelecionarDeliveryOption("Mesmo dia")}
                  />
                </ContainerChips>

                {/* pagamentos */}
                <ContainerChips>
                  <Chip
                    icon={
                      <CreditCard
                        style={{
                          color:
                            optionPagamento !== "Cartão"
                              ? "var(--color-text)"
                              : "var(--color-background)",
                        }}
                      />
                    }
                    className="chipsFiltro"
                    label={"Cartão"}
                    style={{
                      flex: "1",
                      background:
                        optionPagamento !== "Cartão"
                          ? "var(--color-background)"
                          : "var(--color-text)",
                      color:
                        optionPagamento !== "Cartão"
                          ? "var(--color-text)"
                          : "var(--color-background)",
                    }}
                    variant={
                      optionPagamento !== "Cartão" ? "outlined" : "filled"
                    }
                    onClick={() => handleSelecionarPagamentoOption("Cartão")}
                  />
                  <Chip
                    icon={
                      <BarChart
                        style={{
                          color:
                            optionPagamento !== "Boleto"
                              ? "var(--color-text)"
                              : "var(--color-background)",
                        }}
                      />
                    }
                    className="chipsFiltro"
                    label={"Boleto"}
                    style={{
                      flex: "1",
                      background:
                        optionPagamento !== "Boleto"
                          ? "var(--color-background)"
                          : "var(--color-text)",
                      color:
                        optionPagamento !== "Boleto"
                          ? "var(--color-text)"
                          : "var(--color-background)",
                    }}
                    variant={
                      optionPagamento !== "Boleto" ? "outlined" : "filled"
                    }
                    onClick={() => handleSelecionarPagamentoOption("Boleto")}
                  />
                  <Chip
                    icon={
                      <AccountBalanceWallet
                        style={{
                          color:
                            optionPagamento !== "Paypal"
                              ? "var(--color-text)"
                              : "var(--color-background)",
                        }}
                      />
                    }
                    className="chipsFiltro"
                    label={"Paypal"}
                    style={{
                      flex: "1",

                      background:
                        optionPagamento !== "Paypal"
                          ? "var(--color-background)"
                          : "var(--color-text)",
                      color:
                        optionPagamento !== "Paypal"
                          ? "var(--color-text)"
                          : "var(--color-background)",
                    }}
                    variant={
                      optionPagamento !== "Paypal" ? "outlined" : "filled"
                    }
                    onClick={() => handleSelecionarPagamentoOption("Paypal")}
                  />
                </ContainerChips>
              </ContainerInfo>
            </div>
          </Left>

          <Summary>
            <Info>
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Badge badgeContent={product.quantity} color="primary">
                      <Image src={product.img} />
                    </Badge>
                    <Details>
                      <ProductName>{product.title}</ProductName>
                      {/*  <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId> */}

                      <ProductSize>
                        {product.color} - {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ContainerPrecoProduto>
                      <ExpandLess />
                      R${product.price * product.quantity}
                      <ExpandMore />
                    </ContainerPrecoProduto>
                    {/*   <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice> */}
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimado Custo de Envio</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Desconto</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
