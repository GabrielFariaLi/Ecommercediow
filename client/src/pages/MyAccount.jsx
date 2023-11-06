import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { styled as styledMui } from "@mui/material/styles";
import { publicRequest, userRequest } from "../requestMethods";
import styled from "styled-components";
import muiChip from "@mui/material/Chip";
import muiTextField from "@mui/material/TextField";
import { Edit } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { estadosBrasil } from "../data";
import NativeSelect from "@mui/material/NativeSelect";
import { Button } from "@mui/material";

import { editarUtilizador } from "../redux/apiCalls";
const ButtonSubmit = styledMui(Button)`
  width:100%;
  padding:10px 0px;
  display:flex;
  background: var(--color-text);
  color: var(--color-background);
  justify-content: center;  /* aligns the text to the center */


}
  
`;

const Container = styled.div`
  /* ... */
  margin-top: 190px;
  padding: 70px 0px;
  min-height: fit-content;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContainerInfo = styled.div`
  /* ... */
  box-sizing: border-box;
  background: var(--color-background);
  display: flex;
  box-sizing: border-box;
  padding: 10px 10px;
  border: 1px solid var(--color-text);
  width: 50%;
  height: fit-content;

  border-radius: 15px;
`;

const SidebarContainer = styled.div`
  /* ... */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  min-width: fit-content;
  width: 10%;
`;

const ContainerChips = styled.ul`
  /* ... */

  padding: 0px;

  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const Hr = styled.div`
  /* ... */
  height: 100%;
  width: 1px;
  margin-left: 30px;
  background: var(--color-text);
  border-radius: 15px;
  opacity: 0.3;
`;
const InformacoesEditaveisContainer = styled.div`
  /* ... */

  flex: 1;
  padding: 0% 3%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TituloContainer = styled.div`
  /* ... */
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
`;
const Card = styled.div`
  display: flex;
  gap: 10px;
  /* ... */
  height: fit-content;
  border: 1px solid var(--color-background-transparent-invert);
  width: 100%;
  box-sizing: border-box;
  padding: 2% 5%;
  border-radius: 7px;
`;

const ContainerPhoto = styled.div`
  /* ... */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const IMG = styled.img`
  /* ... */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const ContainerNomePerfil = styled.div`
  /* ... */
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`;
const Nome = styled.div`
  /* ... */
  font-size: 18px;
  color: var(--color-text);
`;
const Pais = styled.div`
  /* ... */
  color: var(--color-text-soft);
`;

const Chip = styled(muiChip)(({ theme }) => ({
  justifySelf: "end",
  marginLeft: "auto !important",
  alignSelf: "center",
  "& .MuiChip-icon": {
    order: 2, // Change the order to determine the icon side (1 for text side, 2 for avatar side)
    margin: "0px 4px 0px 0px !important",
    padding: "0px",
  },
  "& .MuiChip-label": {
    paddingRight: "3px",
    color: "var(--color-text)",
  },
}));
const TextField = styled(muiTextField)(({ theme }) => ({
  color: "var(--color-text)",
  flex: "1",
  "& .MuiInputLabel-root": {
    color: "var(--color-text-soft)",
    paddingTop: "10px",
    fontSize: "10px",
  },
  "& .Mui-focused": {
    color: "var(--color-text) !important",
  },
  "& .MuiInput-underline:before": {
    borderBottom: `2px solid var(--color-background-transparent-invert)`, // Customize the border bottom style
  },
  "& .MuiInput-underline:hover": {
    borderBottom: `2px solid var(--color-text)`, // Customize the border bottom style on hover
  },
  "& .MuiInput-underline:after": {
    borderBottom: `2px solid var(--color-text)`, // Customize the border bottom style when focused
  },
}));

const ContainerInformacoesPessoais = styled.div`
  /* ... */
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const ContainerInputsInformacoesPessoais = styled.div`
  /* ... */
  display: flex;

  gap: 10px;
  width: 100%;
`;

const TituloPrincipalPedido = styled.div`
  /* ... */
  font-size: 20px;
  font-weight: 500;
  color: black;
`;
const Linha = styled.div`
  /* ... */
  display: flex;
  height: fit-content;
  align-items: center;
  width: 100%;
`;
const DataPedidoLabel = styled.div`
  /* ... */
  font-size: 12px;
  font-weight: 400;
  color: black;
`;
const DataPedido = styled.div`
  /* ... */
  font-size: 12px;
  font-weight: 700;
  color: black;
`;
const DivisorVertical = styled.div`
  /* ... */
  width: 1.5px;
  background: rgba(0, 0, 0, 0.2);
  height: 14px;
`;
const DataEstimativaPedidoLabel = styled.div`
  /* ... */
  font-size: 12px;
  font-weight: 700;
  color: green;
`;
const HRPER = styled.div`
  /* ... */
  width: 100%;
  height: 1.5px;
  background: rgba(0, 0, 0, 0.2);
`;
const ContainerFotoProdutoUnitarioPedido = styled.div`
  /* ... */
  min-width: 75px;
  max-width: 75px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  max-height: 75px;
  min-height: 75px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
`;
const FotoEfetivaProdutoUnitarioPedido = styled.img`
  /* ... */
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
const Coluna = styled.div`
  /* ... */
  display: flex;
  flex-direction: column;
`;
const TituloProdutoUnico = styled.div`
  /* ... */
  font-size: 16px;
  max-width: 40%;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 600;
  color: black;
`;
const TituloColunaInfoPedidos = styled.div`
  /* ... */
  font-size: 16px;

  font-weight: 600;
  color: black;
`;

const SubTituloColunaInfoPedidos = styled.div`
  /* ... */
  font-size: 14px;

  font-weight: 500;
  color: black;
`;
const SubLabelColunaInfoPedidos = styled.div`
  /* ... */
  font-size: 12px;

  font-weight: 400;
  color: black;
`;
const ValorProdutoUnico = styled.div`
  /* ... */
  font-size: 16px;
  max-width: 40%;
  font-weight: 600;
  color: black;
`;
const VariacaoProdutoUnicoPedido = styled.div`
  /* ... */
  font-size: 12px;
  font-weight: 400;
  color: black;
`;
const QuantidadeVariacaoProdutoUnicoPedido = styled.div`
  /* ... */
  font-size: 12px;
  font-weight: 400;
  color: black;
`;

const MyAccount = () => {
  const dispatch = useDispatch();

  /* checar se existe um usuario logado */
  const utilizadorAtual = useSelector((estado) => estado?.user.currentUser);
  const ChipSidebar = styled.div`
    cursor: pointer;
    /* ... */

    background: ${(props) =>
      tab === props.name ? "var(--color-text)" : "var(--color-background)"};
    color: ${(props) =>
      tab === props.name ? "var(--color-background)" : "var(--color-text)"};
    border-radius: 30px;
    font-size: 12px;
    padding: 5px;
    width: fit-content;
    margin-bottom: 10px;
  `;
  const [tab, setTab] = useState("Minha Conta");

  /* -------------------------------------------------------------------------- */
  /*                          INPUTS CADASTRAR ENDEREÇO                         */
  /* -------------------------------------------------------------------------- */
  const [inputs, setInputs] = useState({});
  const [orders, setOrders] = useState({});
  const [allProducts, setAllProducts] = useState({});

  /* ---------------------- GET INFORMAÇÕES ATUAL CLIENTE --------------------- */
  useEffect(() => {
    const getUserAtual = async () => {
      try {
        const response = await userRequest.get(
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
    const getPedidosUserAtual = async () => {
      try {
        const response = await userRequest.get(
          `/orders/find/${utilizadorAtual._id}`
        );

        const orderData = response.data;
        console.log(orderData, "😊");
        setOrders(orderData);
      } catch (err) {
        // Handle error
      }
    };
    const getAllProducts = async () => {
      try {
        const response = await publicRequest.get(`/products`);

        const productData = response.data;
        console.log(productData, "😊2");
        setAllProducts(productData);
      } catch (err) {
        // Handle error
      }
    };

    getAllProducts();

    getUserAtual();
    getPedidosUserAtual();
  }, []); // Empty dependency array means it runs once after initial render

  /* ----------------------------------- FIM ---------------------------------- */

  const gerirMudancaInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  /* -------------------------------------------------------------------------- */
  /*                                     FIM                                    */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                               EDITAR USUARIO                               */
  /* -------------------------------------------------------------------------- */
  const handleEditUser = (e) => {
    inputs.idUtilizador = utilizadorAtual._id;

    editarUtilizador(dispatch, { inputs });
  };
  /* -------------------------------------------------------------------------- */
  /*                                     FIM                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <div>
      <Navbar />
      <Container>
        <ContainerInfo>
          <SidebarContainer>
            <ContainerChips>
              <ChipSidebar
                name="Minha Conta"
                onClick={() => setTab("Minha Conta")}
              >
                Minha conta
              </ChipSidebar>
              <ChipSidebar
                name="Meus Pedidos"
                onClick={() => setTab("Meus Pedidos")}
              >
                Meus Pedidos
              </ChipSidebar>
              <ChipSidebar name="Suporte" onClick={() => setTab("Suporte")}>
                Suporte
              </ChipSidebar>
            </ContainerChips>
          </SidebarContainer>{" "}
          <Hr></Hr>
          <InformacoesEditaveisContainer>
            <TituloContainer>{tab}</TituloContainer>
            {tab === "Minha Conta" && (
              <div>
                {" "}
                <Card>
                  <ContainerPhoto>
                    <IMG src="https://i.ibb.co/JBbqbYh/istockphoto-873160746-612x612.jpg"></IMG>
                  </ContainerPhoto>
                  <ContainerNomePerfil>
                    <Nome>Olá, {utilizadorAtual.name}</Nome>
                    <Pais> Brazil</Pais>
                  </ContainerNomePerfil>
                  <Chip
                    onClick={(e) => {
                      handleEditUser(e);
                    }}
                    icon={
                      <Edit
                        style={{
                          fontSize: "14px",
                          width: "14px",
                          height: "14px",
                        }}
                      />
                    }
                    size="small"
                    label="Editar"
                    variant="outlined"
                  />
                </Card>
                <Card>
                  <ContainerInformacoesPessoais>
                    <TituloContainer>Informações Pessoais</TituloContainer>
                    <ContainerInputsInformacoesPessoais>
                      <TextField
                        onChange={gerirMudancaInputs}
                        id="standard-basic"
                        name="nameInput"
                        label="Nome"
                        value={inputs.nameInput}
                        variant="standard"
                        InputLabelProps={{
                          shrink: !!inputs.nameInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                      <TextField
                        onChange={gerirMudancaInputs}
                        id="standard-basic"
                        name="emailInput"
                        disabled
                        label="E-mail"
                        value={inputs.emailInput}
                        variant="standard"
                        InputLabelProps={{
                          shrink: !!inputs.emailInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                    </ContainerInputsInformacoesPessoais>
                    <ContainerInputsInformacoesPessoais>
                      <TextField
                        onChange={gerirMudancaInputs}
                        id="standard-basic"
                        label="Telefone"
                        name="telefoneInput"
                        value={inputs.telefoneInput}
                        variant="standard"
                        InputLabelProps={{
                          shrink: !!inputs.telefoneInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                      <TextField
                        onChange={gerirMudancaInputs}
                        id="standard-basic"
                        name="cpfInput"
                        value={inputs.cpfInput}
                        label="CPF"
                        variant="standard"
                        InputLabelProps={{
                          shrink: !!inputs.cpfInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                    </ContainerInputsInformacoesPessoais>
                  </ContainerInformacoesPessoais>
                </Card>
                <Card>
                  {" "}
                  <ContainerInformacoesPessoais>
                    <TituloContainer>Endereço</TituloContainer>
                    <ContainerInputsInformacoesPessoais>
                      <TextField
                        onChange={gerirMudancaInputs}
                        id="standard-basic2"
                        label="Endereço"
                        name="logradouroInput"
                        variant="standard"
                        value={inputs.logradouroInput}
                        InputLabelProps={{
                          shrink: !!inputs.logradouroInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                    </ContainerInputsInformacoesPessoais>
                    <TextField
                      onChange={gerirMudancaInputs}
                      name="complementoInput"
                      id="standard-basic"
                      label="Complemento"
                      variant="standard"
                      value={inputs.complementoInput}
                      InputLabelProps={{
                        shrink: !!inputs.complementoInput ? true : false, // Force the label to shrink on first load
                      }}
                    />
                    {/*                 <TextField
                  onChange={gerirMudancaInputs}
                  id="standard-basic"
                  label="Nome deste endereço"
                  name="indentificacaoInput"
                  variant="standard"
                  value={inputs.indentificacaoInput}
                /> */}

                    <ContainerInputsInformacoesPessoais>
                      <TextField
                        onChange={gerirMudancaInputs}
                        id="standard-basic"
                        name="numeroInput"
                        label="Número"
                        variant="standard"
                        value={inputs.numeroInput}
                        InputLabelProps={{
                          shrink: !!inputs.numeroInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                      <TextField
                        onChange={gerirMudancaInputs}
                        id="standard-basic"
                        label="CEP"
                        name="cepInput"
                        variant="standard"
                        value={inputs.cepInput}
                        InputLabelProps={{
                          shrink: !!inputs.cepInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                    </ContainerInputsInformacoesPessoais>
                    <ContainerInputsInformacoesPessoais>
                      <TextField
                        onChange={gerirMudancaInputs}
                        name="bairroInput"
                        id="standard-basic"
                        label="Bairro"
                        variant="standard"
                        value={inputs.bairroInput}
                        InputLabelProps={{
                          shrink: !!inputs.bairroInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                      <TextField
                        onChange={gerirMudancaInputs}
                        name="referenciaInput"
                        id="standard-basic"
                        label="Referência"
                        variant="standard"
                        value={inputs.referenciaInput}
                        InputLabelProps={{
                          shrink: !!inputs.referenciaInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                    </ContainerInputsInformacoesPessoais>
                    <ContainerInputsInformacoesPessoais>
                      <TextField
                        onChange={gerirMudancaInputs}
                        id="standard-basic"
                        name="cidadeInput"
                        label="Cidade"
                        variant="standard"
                        value={inputs.cidadeInput}
                        InputLabelProps={{
                          shrink: !!inputs.cidadeInput ? true : false, // Force the label to shrink on first load
                        }}
                      />
                      <FormControl>
                        <InputLabel
                          variant="standard"
                          htmlFor="uncontrolled-native"
                        >
                          UF
                        </InputLabel>
                        <NativeSelect
                          onChange={gerirMudancaInputs}
                          name="ufInput"
                          inputProps={{
                            name: "ufInput",
                            id: "uncontrolled-native",
                          }}
                        >
                          {estadosBrasil.map((estado) => (
                            <option
                              key={estado.abbreviation}
                              value={estado.abbreviation}
                              selected={
                                estado.abbreviation === inputs.ufInput
                                  ? "true"
                                  : "false"
                              }
                            >
                              {estado.name} - {estado.abbreviation}
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    </ContainerInputsInformacoesPessoais>
                  </ContainerInformacoesPessoais>
                </Card>
                {/*    <ButtonSubmit
              onClick={(e) => {
                handleEditUser(e);
              }}
            >
              Editar
            </ButtonSubmit> */}{" "}
              </div>
            )}
            {tab === "Meus Pedidos" && (
              <div>
                {" "}
                <Card>
                  <ContainerPhoto>
                    <IMG src="https://i.ibb.co/JBbqbYh/istockphoto-873160746-612x612.jpg"></IMG>
                  </ContainerPhoto>
                  <ContainerNomePerfil>
                    <Nome>Olá, {utilizadorAtual.name}</Nome>
                    <Pais> Brazil</Pais>
                  </ContainerNomePerfil>
                </Card>
                <ContainerInformacoesPessoais>
                  <TituloContainer style={{ marginTop: "35px" }}>
                    Informações dos Pedidos
                  </TituloContainer>

                  {orders.map((order) => {
                    return (
                      <div
                        style={{
                          borderRadius: "15px",
                          padding: "10px",
                          marginBottom: "50px",

                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                        }}
                        key={order._id}
                      >
                        <TituloPrincipalPedido style={{ marginBottom: "30px" }}>
                          ID Pedido:{order._id}
                        </TituloPrincipalPedido>
                        <Linha style={{ marginBottom: "15px" }}>
                          <DataPedidoLabel>
                            Dia do Pedido: {order.createdAt}
                          </DataPedidoLabel>
                          <DataPedido></DataPedido>
                          <DivisorVertical
                            style={{
                              marginLeft: "10px",
                              marginRight: "10px",
                            }}
                          ></DivisorVertical>
                          <DataEstimativaPedidoLabel>
                            Status Entrega : {order.status}
                          </DataEstimativaPedidoLabel>
                        </Linha>
                        <HRPER style={{ marginBottom: "15px" }}></HRPER>

                        {order.products.map((productOrdered) => {
                          const product = allProducts.find(
                            (product) =>
                              product._id === productOrdered.productId
                          );
                          if (product) {
                            return (
                              <Linha
                                style={{ marginBottom: "30px", width: "100%" }}
                              >
                                <ContainerFotoProdutoUnitarioPedido>
                                  <FotoEfetivaProdutoUnitarioPedido
                                    src={product.img[0]}
                                  />
                                </ContainerFotoProdutoUnitarioPedido>
                                <Coluna
                                  style={{ marginLeft: "20px", width: "100%" }}
                                >
                                  <Linha style={{ marginBottom: "12px" }}>
                                    <TituloProdutoUnico>
                                      {product.title}
                                    </TituloProdutoUnico>
                                    <ValorProdutoUnico
                                      style={{ marginLeft: "auto" }}
                                    >
                                      {/* TODO trocar para currency brl */}$
                                      {
                                        /* productOrdered.variacao[0].quantity * */ product.price
                                      }
                                      .00
                                    </ValorProdutoUnico>
                                  </Linha>
                                  <Linha>
                                    {" "}
                                    <VariacaoProdutoUnicoPedido>
                                      {productOrdered.variacao[0].size}
                                    </VariacaoProdutoUnicoPedido>
                                    <DivisorVertical
                                      style={{
                                        height: "12px",
                                        marginLeft: "7px",
                                        marginRight: "7px",
                                      }}
                                    ></DivisorVertical>{" "}
                                    <VariacaoProdutoUnicoPedido>
                                      {productOrdered.variacao[0].color}
                                    </VariacaoProdutoUnicoPedido>
                                    <QuantidadeVariacaoProdutoUnicoPedido
                                      style={{ marginLeft: "auto" }}
                                    >
                                      Qnt: {productOrdered.variacao[0].quantity}
                                    </QuantidadeVariacaoProdutoUnicoPedido>
                                  </Linha>
                                </Coluna>
                              </Linha>
                            );
                          } else {
                            return null; // Return null if product is not found
                          }
                        })}
                        <HRPER style={{ marginBottom: "15px" }}></HRPER>
                        <Linha>
                          <Coluna
                            style={{
                              flex: "1",
                              height: "100%",
                              marginBottom: "auto",
                            }}
                          >
                            <TituloColunaInfoPedidos
                              style={{ marginBottom: "15px" }}
                            >
                              Pagamento
                            </TituloColunaInfoPedidos>
                            <SubTituloColunaInfoPedidos>
                              Cartão de crédito 💳
                            </SubTituloColunaInfoPedidos>
                          </Coluna>
                          <Coluna style={{ flex: "1" }}>
                            <TituloColunaInfoPedidos
                              style={{ marginBottom: "15px" }}
                            >
                              Entrega
                            </TituloColunaInfoPedidos>
                            <SubLabelColunaInfoPedidos
                              style={{ marginBottom: "7px" }}
                            >
                              Endereço
                            </SubLabelColunaInfoPedidos>
                            <SubTituloColunaInfoPedidos
                              style={{ marginBottom: "15px" }}
                            >
                              {order.address.logradouro},
                              {order.address.complemento} N°
                              {order.address.numero}
                              <br></br>
                              {order.address.bairro} | ref:
                              {order.address.referencia}
                              <br></br>
                              {order.address.cidade} - {order.address.uf}
                              <br></br>
                              {order.address.cep}
                            </SubTituloColunaInfoPedidos>

                            <SubLabelColunaInfoPedidos
                              style={{ marginBottom: "7px" }}
                            >
                              Método de entrega
                            </SubLabelColunaInfoPedidos>
                            <SubTituloColunaInfoPedidos
                              style={{ marginBottom: "15px" }}
                            >
                              Normal
                            </SubTituloColunaInfoPedidos>
                          </Coluna>
                        </Linha>
                        <HRPER style={{ marginBottom: "15px" }}></HRPER>
                        <Linha>
                          <Coluna
                            style={{
                              flex: "1",
                              height: "100%",
                              marginBottom: "auto",
                            }}
                          >
                            <TituloColunaInfoPedidos
                              style={{ marginBottom: "15px" }}
                            >
                              Precisa de ajuda?
                            </TituloColunaInfoPedidos>
                            <Linha>
                              <SubTituloColunaInfoPedidos>
                                Problemas com o pedido ↗
                              </SubTituloColunaInfoPedidos>
                            </Linha>
                          </Coluna>
                          <Coluna style={{ flex: "1" }}>
                            <TituloColunaInfoPedidos
                              style={{ marginBottom: "15px" }}
                            >
                              Sumário do pedido
                            </TituloColunaInfoPedidos>
                            <Linha style={{ marginBottom: "15px" }}>
                              <SubTituloColunaInfoPedidos>
                                Subtotal
                              </SubTituloColunaInfoPedidos>
                              <SubTituloColunaInfoPedidos
                                style={{ marginLeft: "auto" }}
                              >
                                {order.amount}
                              </SubTituloColunaInfoPedidos>
                            </Linha>

                            <Linha style={{ marginBottom: "7px" }}>
                              <SubTituloColunaInfoPedidos>
                                Delivery
                              </SubTituloColunaInfoPedidos>
                              <SubTituloColunaInfoPedidos
                                style={{ marginLeft: "auto" }}
                              >
                                5,90
                              </SubTituloColunaInfoPedidos>
                            </Linha>
                            <Linha style={{ marginBottom: "15px" }}>
                              <SubTituloColunaInfoPedidos>
                                Desconto
                              </SubTituloColunaInfoPedidos>
                              <SubTituloColunaInfoPedidos
                                style={{ marginLeft: "auto" }}
                              >
                                -5.90
                              </SubTituloColunaInfoPedidos>
                            </Linha>
                            <Linha style={{ marginBottom: "15px" }}>
                              <TituloColunaInfoPedidos>
                                Total
                              </TituloColunaInfoPedidos>
                              <TituloColunaInfoPedidos
                                style={{ marginLeft: "auto" }}
                              >
                                {order.amount}
                              </TituloColunaInfoPedidos>
                            </Linha>
                          </Coluna>
                        </Linha>
                      </div>
                    );
                  })}
                </ContainerInformacoesPessoais>
                {/*    <ButtonSubmit
              onClick={(e) => {
                handleEditUser(e);
              }}
            >
              Editar
            </ButtonSubmit> */}{" "}
              </div>
            )}
          </InformacoesEditaveisContainer>
        </ContainerInfo>
      </Container>
      <Footer />
    </div>
  );
};

export default MyAccount;
