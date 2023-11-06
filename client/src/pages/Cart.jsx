import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { estadosBrasil } from "../data";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

import {
  addProduct,
  atualizarProduto,
  resetarCarrinhoSucesso,
  deletarProdutoUnicoDoCarrinho,
} from "../redux/cartRedux";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest, publicRequest } from "../requestMethods";
import { useHistory } from "react-router";
import KonvaTest from "../components/KonvaTest";
import MuiTextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import muiBadge from "@mui/material/Badge";
import currencyFormatter from "currency-formatter";
import MenuItem from "@mui/material/MenuItem";
import { Button as ButtonMui } from "@mui/material";
import LogoDoPix from "../../src/assets/imgs/logo-pix-icone-1024.png";
import {
  AcUnitOutlined,
  LocalShipping,
  FlashOn,
  CreditCard,
  PhoneAndroid,
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
    /* Add other label styles as needed */
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
  padding: 290px 10%;
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
  position: relative;
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
  object-fit: cover;
  height: 75px;
  border-radius: 4px;
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
  margin-top: 44px;
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

const SummaryItemPrice = styled.span`
  font-size: var(--size-large);
`;
const SummaryItemPriceTotal = styled.span`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: var(--size-large-300);
`;

const Button = styled.button`
  width: 100%;
  border: 0;
  outline: 0;

  padding: 15px;
  border-radius: 10px;
  background-color: var(--color-text);
  color: var(--color-background);
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
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
  position: relative;
  gap: 20px;
  flex-direction: column;
`;
const OverlayDisabled = styled.div`
  /* ... */
  opacity: 0.5;
  width: 100%;
  z-index: 3;
  border-radius: 15px;

  background: rgba(0, 0, 0, 0.2);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const OverlayDisabledCart = styled.div`
  /* ... */
  opacity: 0.5;
  width: 100%;
  z-index: 3;
  border-radius: 15px;
  cursor: not-allowed;

  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
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

const Small = styled.span`
  /* ... */
  font-size: var(--size-small);
  font-weight: 200;
`;
const SmallTotal = styled.span`
  /* ... */
  font-size: var(--size-large);
  font-weight: 200;
`;
const Disclaimer = styled.div`
  /* ... */
  margin-top: 15px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
`;

const DeletarCarrinhoInteiro = styledMui(ButtonMui)`
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
const DeletarCarrinho = styledMui(ButtonMui)`
width: fit-content;
font-size:10px;
background: var(--color-text);
border-radius: 5px;
color: var(--color-background);
padding: 7px 14px;
display: flex;

justify-content: center;
align-items: center;
&:hover{
  background: var(--color-text);
color: var(--color-background);
}
`;

const Cart = () => {
  const [estadoParaEntrega, setEstadoParaEntrega] = useState("DF");
  const [optionDelivery, setOptionDelivery] = useState("Normal");
  const [optionPagamento, setOptionPagamento] = useState("Cartão");
  const [prosseguir, setProsseguir] = useState(false);
  const [stripeSuccessFlag, setStripeSuccessFlag] = useState(false);
  const [orderBody, setOrderBody] = useState({});

  const dispatch = useDispatch();

  const handleEstadoChange = (event) => {
    setInputs({ ...inputs, ufInput: event.target.value });
  };
  const cart = useSelector((state) => state.cart);
  const utilizadorAtual = useSelector((estado) => estado?.user.currentUser);

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
  /* -------------------------------------------------------------------------- */
  /*                         Legitimar compra no stripe                         */
  /* -------------------------------------------------------------------------- */
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
        setStripeSuccessFlag(true);
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);
  useEffect(() => {
    console.log(
      "🚀 ~ file: Cart.jsx:449 ~ useEffect ~ utilizadorAtual:",
      utilizadorAtual
    );
    console.log("🚀 ~ file: Cart.jsx:449 ~ useEffect ~ cart:", cart);
  }, []);

  /* ---------------------- GET INFORMAÇÕES ATUAL CLIENTE --------------------- */
  const [inputs, setInputs] = useState({
    nameInput: "",
    emailInput: "",
    telefoneInput: "",
    cpfInput: "",
    cepInput: "",
    numeroInput: "",
    logradouroInput: "",
    complementoInput: "",
    bairroInput: "",
    referenciaInput: "",
    cidadeInput: "",
    ufInput: "",
  });

  useEffect(() => {
    const getUserAtual = async () => {
      try {
        const response = await publicRequest.get(
          `/users/find/${utilizadorAtual._id}`
        );

        const userData = response.data;

        setInputs((prevInputs) => ({
          ...prevInputs,
          nameInput: userData?.name,
          emailInput: userData?.email,
          telefoneInput: userData?.telefone,
          cpfInput: userData?.cpf,
          cepInput: userData?.endereco?.cep,
          numeroInput: userData?.endereco?.numero,
          logradouroInput: userData?.endereco?.logradouro,
          complementoInput: userData?.endereco?.complemento,
          bairroInput: userData?.endereco?.bairro,
          referenciaInput: userData?.endereco?.referencia,
          cidadeInput: userData?.endereco?.cidade,
          ufInput: userData?.endereco?.uf,
        }));
      } catch (err) {
        // Handle error
      }
    };

    getUserAtual();
    console.log("🚀 ~ file: Cart.jsx:433 ~ Cart ~ inputs:", inputs);
  }, []); // Empty dependency array means it runs once after initial render

  /* ----------------------------------- FIM ---------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                   Armazenar compra em nossa base de dados                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const createOrderBody = async () => {
      var productsBody = [];
      for (let i = 0; i < cart.products.length; i++) {
        console.log(cart.products[i].variacoes[0]);

        productsBody.push({
          productId: cart.products[i]._id,
          variacao: [
            {
              size: cart.products[i].variacoes[0].size,
              color: cart.products[i].variacoes[0].color,
              quantity: cart.products[i].quantidadeEscolhida,
            },
          ],
        });
      }
      console.log(
        "🚀 ~ file: Cart.jsx:474 ~ makeRequest ~ productsBody:",
        productsBody
      );

      var orderBody_d = {
        userId: utilizadorAtual._id,
        products: productsBody,
        amount: cart.total,
        address: {
          cep: inputs.cepInput,
          numero: inputs.numeroInput,
          logradouro: inputs.logradouroInput,
          complemento: inputs.complementoInput,
          bairro: inputs.bairroInput,
          referencia: inputs.referenciaInput,
          cidade: inputs.cidadeInput,
          uf: inputs.ufInput,
        },
        status: "Compra aprovada",
      };
      setOrderBody(orderBody_d);
    };
    prosseguir && createOrderBody();
  }, [prosseguir]);
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                Aumentar ou Diminuir a quantidade de um item                */
  /* -------------------------------------------------------------------------- */
  const handleMudarQuantidade = (modo, product) => {
    console.log(
      "🚀 ~ file: Cart.jsx:392 ~ handleMudarQuantidade ~ product:",
      product
    );
    dispatch(atualizarProduto({ ...product, modo: modo }));
  };

  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */

  const handleAddressChanges = (e) => {
    console.log(e);
    switch (e.target.name) {
      case "cep":
        setInputs({ ...inputs, cepInput: e.target.value });
        break;
      case "cidade":
        setInputs({ ...inputs, cidadeInput: e.target.value });
        break;
      case "logradouro":
        setInputs({ ...inputs, logradouroInput: e.target.value });
        break;
      case "bairro":
        setInputs({ ...inputs, bairroInput: e.target.value });
        break;
      case "numero":
        setInputs({ ...inputs, numeroInput: e.target.value });
        break;
      case "complemento":
        setInputs({ ...inputs, complementoInput: e.target.value });
        break;
      case "referencia":
        setInputs({ ...inputs, referenciaInput: e.target.value });
        break;
      case "uf":
        setInputs({ ...inputs, ufInput: e.target.value });
        break;
      default:
      // Add your default behavior here if needed
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              Deletar Carrinho                              */
  /* -------------------------------------------------------------------------- */
  const deletarCarrinho = () => {
    dispatch(resetarCarrinhoSucesso());
  };

  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                       Deletar um produto do carrinho                       */
  /* -------------------------------------------------------------------------- */
  const deletarProdutoUnicoDoCarrinhoFunc = (product) => {
    console.log(
      "🚀 ~ file: Cart.jsx:392 ~ handleMudarQuantidade ~ product:",
      product
    );
    dispatch(deletarProdutoUnicoDoCarrinho({ ...product }));
  };

  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                 Stripe docs                                */
  /* -------------------------------------------------------------------------- */
  // Make sure to call loadStripe outside of a component’s render to avoid
  // recreating the Stripe object on every render.
  // This is a public sample test API key.
  // Don’t submit any personally identifiable information in requests made with this key.
  // Sign in to see your own test API key embedded in code samples.
  const stripePromise = loadStripe(
    "pk_test_51NfUu0LSsmQOX6KQSryAjFcQ7o4rUXuF1CSv7R92mnc6eQbWIHGDFgX4Iv3HGWD60L3lRss0rx9Fbw0qDGDjM6hM00p3rmjQEE"
  );
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    if (!prosseguir) return;
    // Create PaymentIntent as soon as the page loads

    publicRequest
      .post(`/checkout/create-payment-intent`, { total: cart.total })
      .then((data) => setClientSecret(data.data.clientSecret));
  }, [prosseguir, cart.total]); // empty dependency array means the effect runs only once after the initial render

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <Container>
      <Navbar />

      <Wrapper>
        {/* <button onClick={deletarCarrinho}>reset</button> */}
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
                Informações Pessoais
              </TituloSecaoInformacao>
              <ContainerInfo>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Nome Completo"
                    disabled={prosseguir ? true : false}
                    variant="outlined"
                    value={inputs.nameInput}
                    InputLabelProps={{
                      shrink: !!inputs.nameInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                  <CustomTextField
                    id="outlined-basic"
                    label="Numero de telefone"
                    disabled={prosseguir ? true : false}
                    variant="outlined"
                    value={inputs.telefoneInput}
                    InputLabelProps={{
                      shrink: !!inputs.telefoneInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                </Linha>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    disabled={prosseguir ? true : false}
                    label="E-mail"
                    variant="outlined"
                    value={inputs.emailInput}
                    InputLabelProps={{
                      shrink: !!inputs.emailInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                </Linha>
              </ContainerInfo>
              <Disclaimer>
                * Atualizações do pedido serão enviadas para o e-mail informado
              </Disclaimer>
            </div>
            <div>
              <TituloSecaoInformacao>
                Informações da entrega
              </TituloSecaoInformacao>
              <ContainerInfo>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Endereço"
                    disabled={prosseguir ? true : false}
                    value={inputs.logradouroInput}
                    variant="outlined"
                    name="logradouro"
                    onChange={(e) => handleAddressChanges(e)}
                    InputLabelProps={{
                      shrink: !!inputs.logradouroInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                </Linha>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    value={inputs.complementoInput}
                    label="Cont. Endereço"
                    disabled={prosseguir ? true : false}
                    variant="outlined"
                    name="complemento"
                    onChange={(e) => handleAddressChanges(e)}
                    InputLabelProps={{
                      shrink: !!inputs.complementoInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                </Linha>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Cidade"
                    disabled={prosseguir ? true : false}
                    name="cidade"
                    onChange={(e) => handleAddressChanges(e)}
                    value={inputs.cidadeInput}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: !!inputs.cidadeInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                </Linha>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Bairro"
                    disabled={prosseguir ? true : false}
                    name="bairro"
                    onChange={(e) => handleAddressChanges(e)}
                    value={inputs.bairroInput}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: !!inputs.bairroInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                  <CustomTextField
                    id="outlined-basic"
                    label="Refêrencia"
                    disabled={prosseguir ? true : false}
                    name="referencia"
                    onChange={(e) => handleAddressChanges(e)}
                    value={inputs.referenciaInput}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: !!inputs.referenciaInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                </Linha>
                <Linha></Linha>
                <Linha>
                  <CustomTextField
                    id="outlined-basic"
                    label="Número"
                    disabled={prosseguir ? true : false}
                    name="numero"
                    onChange={(e) => handleAddressChanges(e)}
                    value={inputs.numeroInput}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: !!inputs.numeroInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                  <CustomTextField
                    id="outlined-basic"
                    label="CEP"
                    disabled={prosseguir ? true : false}
                    name="cep"
                    onChange={(e) => handleAddressChanges(e)}
                    value={inputs.cepInput}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: !!inputs.cepInput ? true : false, // Force the label to shrink on first load
                    }}
                  />
                  <CustomFormControl>
                    <InputLabel id="demo-simple-select-label">
                      Estado
                    </InputLabel>
                    {!!inputs.ufInput && (
                      <CustomSelect
                        disabled={prosseguir ? true : false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={inputs.ufInput}
                        label="Estado"
                        onChange={handleEstadoChange}
                      >
                        {estadosBrasil.map((estado) => (
                          <MenuItem
                            key={estado.abbreviation}
                            value={estado.abbreviation}
                          >
                            {estado.name} - {estado.abbreviation}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    )}
                  </CustomFormControl>
                </Linha>
              </ContainerInfo>
            </div>
            <div>
              <TituloSecaoInformacao>
                Informações de envio
              </TituloSecaoInformacao>
              <ContainerInfo>
                {prosseguir && <OverlayDisabled></OverlayDisabled>}
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
                    label={"Express (Apenas em Brasília-DF)"}
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
                  {/*    <Chip
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
                  /> */}
                </ContainerChips>

                {/* pagamentos */}
              </ContainerInfo>
            </div>
            <div>
              <TituloSecaoInformacao>
                Informações de pagamento
              </TituloSecaoInformacao>
              <ContainerInfo>
                {prosseguir && <OverlayDisabled></OverlayDisabled>}
                {/*    <   <ContainerChips>
            
                Chip
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
                </ContainerChips>*/}

                {/* pagamentos */}
                <ContainerChips>
                  <Chip
                    icon={
                      <PhoneAndroid
                        style={{
                          color:
                            optionPagamento !== "Pix"
                              ? "var(--color-text)"
                              : "var(--color-background)",
                        }}
                      />
                    }
                    className="chipsFiltro"
                    label={"Pix"}
                    style={{
                      flex: "1",
                      background:
                        optionPagamento !== "Pix"
                          ? "var(--color-background)"
                          : "var(--color-text)",
                      color:
                        optionPagamento !== "Pix"
                          ? "var(--color-text)"
                          : "var(--color-background)",
                    }}
                    variant={optionPagamento !== "Pix" ? "outlined" : "filled"}
                    onClick={() => handleSelecionarPagamentoOption("Pix")}
                  />
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
                  {/* <Chip
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
                  /> */}
                </ContainerChips>
              </ContainerInfo>
            </div>
          </Left>

          <Summary>
            <Info>
              {prosseguir && <OverlayDisabledCart></OverlayDisabledCart>}
              {cart.products.map((product) => (
                <Product key={product.id}>
                  <ProductDetail>
                    <Badge
                      badgeContent={product.quantidadeEscolhida}
                      color="primary"
                    >
                      <Image src={product.img} />
                    </Badge>
                    <Details>
                      <ProductName>{product.title}</ProductName>
                      {/*  <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId> */}

                      <ProductSize>
                        {product.corEscolhida} - {product.tamanhoEscolhido}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ContainerPrecoProduto>
                      <ExpandLess
                        onClick={() => handleMudarQuantidade("+", product)}
                      />
                      {currencyFormatter.format(
                        product.price * product.quantidadeEscolhida,
                        { code: "BRL" }
                      )}
                      <ExpandMore
                        onClick={() => handleMudarQuantidade("-", product)}
                      />
                    </ContainerPrecoProduto>
                    {/*   <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice> */}
                    <DeletarCarrinho
                      onClick={() => deletarProdutoUnicoDoCarrinhoFunc(product)}
                    >
                      Deletar
                    </DeletarCarrinho>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>
                {currencyFormatter.format(cart.total, { code: "BRL" })}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimado Custo de Envio</SummaryItemText>
              <SummaryItemPrice>
                <Small>R$</Small> 5.90
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Desconto</SummaryItemText>
              <SummaryItemPrice>
                <Small>R$</Small> -5.90
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPriceTotal>
                {/*  <SmallTotal>R$</SmallTotal>  */}{" "}
                {currencyFormatter.format(cart.total, { code: "BRL" })}
              </SummaryItemPriceTotal>
            </SummaryItem>
            {prosseguir ? (
              <Button onClick={() => setProsseguir(false)}>Voltar</Button>
            ) : (
              <Button onClick={() => setProsseguir(true)}>Prosseguir</Button>
            )}

            {/* <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>Comprar agora</Button>
            </StripeCheckout> */}
            {clientSecret && !!prosseguir && optionPagamento === "Cartão" && (
              <div style={{ marginTop: "50px" }}>
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm orderBody={orderBody} />
                </Elements>
              </div>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
