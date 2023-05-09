import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const ContainerPrincipal = styled.div`
  display: flex;
  padding: 5% 10%;
  flex-direction: column;
  color: var(--color-text);
  box-shadow: var(--color-text) 0px 2px 4px 0px inset;
  background: var(--color-background-footer);
  font-family: "Exo 2";
  ${mobile({ flexDirection: "column" })}
`;
const Container = styled.div`
  display: flex;

  color: var(--color-text);
  /* box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px; */

  font-family: "Exo 2";
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  font-family: "Exo 2";
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  font-family: "Exo 2";
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-family: "Exo 2";
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile({ display: "none" })}
`;

const InfosFooter = styled.div`
  /* ... */
  flex: 1;
  margin-left: auto;
  display: flex;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-family: "Exo 2";
  color: var(--color-green);
`;

const List = styled.ul`
  margin: 0;

  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 100%;
  margin-bottom: 10px;
  font-family: "Exo 2";
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const BreveTeto = styled.span`
  /* ... */
  text-align: center;
  color: var(--color-text-soft);
  margin-top: 3rem;
`;

const Footer = () => {
  return (
    <ContainerPrincipal>
      <Container>
        <Left>
          <Logo>DiowDy</Logo>
          <Desc>描述: Eleve seu nível. 描述:</Desc>
          <Desc>
            Copyright ©️ 2021 DiowDy. <br /> Todos os direitos reservados.
            <br />
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <InfosFooter>
          <Center>
            <Title>Navegação</Title>
            <List>
              <ListItem>Carrrinho</ListItem>
              <ListItem>Minha Conta</ListItem>
              <ListItem>Produtos</ListItem>
              <ListItem>Grips</ListItem>
              <ListItem>Deregsons</ListItem>
              {/*  <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem> */}
            </List>
          </Center>
          <Center>
            <Title>Contato</Title>
            <List>
              <ListItem>Carrrinho</ListItem>
              <ListItem>Minha Conta</ListItem>
              <ListItem>Produtos</ListItem>
              <ListItem>Grips</ListItem>
              <ListItem>Deregsons</ListItem>
              {/*  <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem> */}
            </List>
          </Center>
          <Center>
            <Title>Ajuda</Title>
            <List>
              <ListItem>Carrrinho</ListItem>
              <ListItem>Minha Conta</ListItem>
              <ListItem>Produtos</ListItem>
              <ListItem>Grips</ListItem>
              <ListItem>Deregsons</ListItem>
              {/*  <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem> */}
            </List>
          </Center>
        </InfosFooter>
      </Container>
      <BreveTeto>
        The night is dark and full of terrors. The winds of Winter. What is dead
        may never die. And now his watch is ended.{" "}
      </BreveTeto>
    </ContainerPrincipal>
  );
};

export default Footer;
