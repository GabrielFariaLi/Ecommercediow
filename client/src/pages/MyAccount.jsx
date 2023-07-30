import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import styled from "styled-components";
import muiChip from "@mui/material/Chip";
import muiTextField from "@mui/material/TextField";
import { Edit } from "@material-ui/icons";

const Container = styled.div`
  /* ... */
  padding-top: 64px;
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContainerInfo = styled.div`
  /* ... */

  background: var(--color-background);
  display: flex;
  box-sizing: border-box;
  padding: 10px 10px;
  border: 1px solid var(--color-text);
  width: 50%;
  height: 75%;

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
  marginLeft: "auto",
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

const MyAccount = () => {
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
            <Card>
              <ContainerPhoto>
                <IMG src="https://i.ibb.co/JBbqbYh/istockphoto-873160746-612x612.jpg"></IMG>
              </ContainerPhoto>
              <ContainerNomePerfil>
                <Nome>Olá, Bárbara</Nome>
                <Pais> Brazil</Pais>
              </ContainerNomePerfil>
              <Chip
                icon={
                  <Edit
                    style={{ fontSize: "14px", width: "14px", height: "14px" }}
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
                    id="standard-basic"
                    label="Nome"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    label="E-mail"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    label="Telefone"
                    variant="standard"
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
                    id="standard-basic"
                    label="Nome"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    label="E-mail"
                    variant="standard"
                  />
                </ContainerInputsInformacoesPessoais>
                <ContainerInputsInformacoesPessoais>
                  <TextField
                    id="standard-basic"
                    label="Nome"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    label="E-mail"
                    variant="standard"
                  />
                </ContainerInputsInformacoesPessoais>
              </ContainerInformacoesPessoais>
            </Card>
          </InformacoesEditaveisContainer>
        </ContainerInfo>
      </Container>
      <Footer />
    </div>
  );
};

export default MyAccount;
