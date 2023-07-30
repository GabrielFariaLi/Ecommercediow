import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
  YouTube,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

import "../../src/components/css/Footer.css";

const ContainerPrincipal = styled.div`
  display: flex;
  padding: 5% 10%;
  flex-direction: column;
  color: var(--color-background);
  box-shadow: var(--color-text) 0px 2px 4px 0px inset;
  background: var(--color-text);
  font-family: "Exo 2";
  ${mobile({ flexDirection: "column" })}
`;
const Container = styled.div`
  display: flex;

  color: var(--color-background);
  /* box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px; */

  font-family: "Exo 2";
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  font-family: "Exo 2";
  display: flex;
  max-width: fit-content;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  margin-bottom: 16px;
  font-family: "Exo 2";
  font-size: 0.875rem;
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
  color: var(--color-background);
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
  color: var(--color-background);
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

const ContainerTituloDesc = styled.div`
  /* ... */
  margin-bottom: 20px;
  display: flex;
  gap: 18px;
`;

const ContainerInfoAtendimento = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* ... */
`;

const TituloAtendimento = styled.div`
  /* ... */
  font-size: 14px;
  font-weight: 600;
`;

const DescAtendimento = styled.div`
  /* ... */
  font-size: 14px;
  font-weight: 400;
`;

const Footer = () => {
  return (
    <ContainerPrincipal>
      <Container>
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
        <Left>
          <Logo>Atendimento</Logo>
          <ContainerTituloDesc>
            <svg
              className="whatsappIconFooter"
              fill="#f2f2f2"
              height="30px"
              width="30px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 308 308"
            >
              <g id="XMLID_468_">
                <path
                  id="XMLID_469_"
                  d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
		c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
		c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
		c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
		c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
		c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
		c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
		c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
		c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
		C233.168,179.508,230.845,178.393,227.904,176.981z"
                />
                <path
                  id="XMLID_470_"
                  d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
		c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
		c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
		 M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
		l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
		c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
		C276.546,215.678,222.799,268.994,156.734,268.994z"
                />
              </g>
            </svg>
            <ContainerInfoAtendimento>
              <TituloAtendimento>Telefone / WhatsApp</TituloAtendimento>
              <DescAtendimento>(11)96300-2994</DescAtendimento>
            </ContainerInfoAtendimento>
          </ContainerTituloDesc>
          <ContainerTituloDesc>
            <svg
              width="30px"
              height="30px"
              viewBox="0 -2.5 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>email [#1573]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-300.000000, -922.000000)"
                  fill="#f2f2f2"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M262,764.291 L254,771.318 L246,764.281 L246,764 L262,764 L262,764.291 Z M246,775 L246,766.945 L254,773.98 L262,766.953 L262,775 L246,775 Z M244,777 L264,777 L264,762 L244,762 L244,777 Z"
                      id="email-[#1573]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <ContainerInfoAtendimento>
              <TituloAtendimento>E-mail</TituloAtendimento>
              <DescAtendimento>atendimento@matrizskateshop.com</DescAtendimento>
            </ContainerInfoAtendimento>
          </ContainerTituloDesc>
          <ContainerTituloDesc>
            <svg
              fill="#f2f2f2"
              width="30px"
              height="30px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM17 15.594v-9.594c0-0.552-0.448-1-1-1s-1 0.448-1 1v10c0 0.283 0.118 0.537 0.308 0.719 0.017 0.020 0.030 0.041 0.048 0.059l4.949 4.95c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.415z"></path>
            </svg>
            <ContainerInfoAtendimento>
              <TituloAtendimento>Horário de atendimento</TituloAtendimento>
              <DescAtendimento>egunda a Sábado - 10h às 18h</DescAtendimento>
            </ContainerInfoAtendimento>
          </ContainerTituloDesc>

          <SocialContainer>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="c4302b">
              <YouTube />
            </SocialIcon>
          </SocialContainer>
        </Left>
      </Container>
      <BreveTeto>
        The night is dark and full of terrors. The winds of Winter. What is dead
        may never die. And now his watch is ended.{" "}
      </BreveTeto>
    </ContainerPrincipal>
  );
};

export default Footer;
