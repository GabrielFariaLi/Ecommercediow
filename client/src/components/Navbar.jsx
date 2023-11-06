import { Badge } from "@material-ui/core";
import { categoriasNSubCategorias } from "../../src/data";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { styled as styledMui } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import InputMui from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import "../components/css/Navbar.css";
import Swal from "sweetalert2";

import {
  Search,
  ShoppingCartOutlined,
  Person,
  Lock,
  Login,
  ExpandMoreSharp,
} from "@material-ui/icons";
import { React, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  logout,
  resetarCarrinho,
  login,
  registrarUtilizador,
} from "../redux/apiCalls";
import ToggleThemeButton from "../components/props/toggleThemeButton/toggleThemeButton";
import logoImage from "../../src/assets/imgs/LogoDSP.jpg"; // import the image file
import { Button } from "@mui/material";
const Input = styledMui(InputMui)`
  text-align:start !important;
  height: 40px;
&:placeholder{
  text-transform: uppercase;

}
  
`;
const ButtonSubmit = styledMui(Button)`
  width:100%;
  padding:10px 0px;
  display:flex;
  background: var(--color-text);
  color: var(--color-background);
  justify-content: center;  /* aligns the text to the center */


}
  
`;
const CategoriaDropdown = styledMui(Button)`
font-size: 18px;
font-weight: bold;

color: var(--color-text);
display: flex;
align-items: center;
gap: 7px;
  width:100%;
  text-transform: capitalize;

  display:flex;


}
  
`;
const InputLogin = styledMui(InputMui)`
  height: 20px;

  
`;

const Container = styled.div`
  height: fit-content;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;

  /* Adjust the blur amount as desired */
  background-color: var(--color-background);
  border-bottom: 2.5px solid var(--color-text);

  /* &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-background-transparent);
    filter: blur(1px); 
    opacity: 0.8; 
    z-index: -1;
  } */
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10% 0px 10%;
  align-items: start;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  /* Adjust the transparency as desired */
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const InputS = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 2;
  padding: 0px 0px 0px 8%;
  text-align: center;
  font-family: "Exo 2";
  font-size: var(--size-medium);
  text-transform: uppercase;
  color: var(--color-text-soft);
`;

const GreenText = styled.span`
  color: var(--color-green);

  ${mobile({ fontSize: "24px" })};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const StyledMenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Logo = styled.img`
  height: 100px;

  width: auto;
  /* filter: var(--color-filter); */
`;

const PositionRelative = styled.div`
  /* ... */

  position: relative;
`;

const OverlayTransparent = styled.div`
  /* ... */
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  width: 100%;
  right: -10px;
  bottom: -10px;

  filter: blur(100px); /* Adjust the blur amount as desired */
  opacity: 0.8; /* Adjust the opacity as desired */
  z-index: 98; /* Position the pseudo-element behind the navbar */
`;

const BoxSearch = styled.div`
  /* ... */
  border: 1px solid black;
  width: 100%;
  height: fit-content;
  padding: 10px;
`;

const PrimeiraLinha = styled.div`
  /* ... */
  display: flex;
  max-height: 100px;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
`;

const WhatsappContainer = styled.div`
  width: 100%;
  height: 20px;
  background: var(--color-text);
  color: var(--color-background);
  justify-content: center;
  display: flex;
  align-items: center;
`;
const WhatsappWrapper = styled.div`
  /* ... */
`;
const TextWhatsapp = styled.div``;

const SegundaLinha = styled.div`
  margin: 20px 0px;
  /* ... */
  display: flex;
  justify-content: space-around;
  height: 30px;
  width: 100%;
`;

const ContainerMegaMenu = styled.div`
  /* ... */

  flex: 1;
  height: 30px;
  width: 100%;
  font-family: "Montserrat";
  font-weight: 400;
  max-width: fit-content;
`;
const TituloMegaMenu = styled.div`
  /* ... */
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 7px;
`;
const MegaMenu = styled.div`
  /* ... */
`;

const ContainerLoginNav = styled.div`
  /* ... */
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const TituloLogin = styled.div`
  /* ... */
  font-size: 24px;
  font-weight: 500;
`;

const Navbar = () => {
  //LOGOUT
  const dispatch = useDispatch();
  /* checar se existe um usuario logado */
  const utilizadorAtual = useSelector((estado) => estado?.user.currentUser);
  useEffect(() => {}, [utilizadorAtual]);

  /* checar se existe um usuario logado */

  /* checarCarrinho propriedades */
  const quantity = useSelector((state) => state.cart.quantity);
  /* checarCarrinho propriedades */

  const gerirLogout = () => {
    logout(dispatch);
    resetarCarrinho(dispatch);
  };

  /* -------------------------------------------------------------------------- */
  /*                         menu dropdown usuario ações                        */
  /* -------------------------------------------------------------------------- */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                             mega menu dropdowns                            */
  /* -------------------------------------------------------------------------- */
  const [openMenus, setOpenMenus] = useState({});
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [senhaRegistrar, setSenhaRegistrar] = useState("");
  const [senhaConfirmar, setSenhaConfirmarRegistrar] = useState("");
  const [nomeRegistrar, setNomeRegistrar] = useState("");
  const [emailRegistrar, setEmailRegistrar] = useState("");

  const [anchorElCategoria, setAnchorElCategoria] = useState({});

  const handleClickCategoria = (event, id) => {
    setAnchorElCategoria({ ...anchorElCategoria, [id]: event.currentTarget });
    setOpenMenus({ ...openMenus, [id]: true });
  };

  const handleCloseCategoria = (id) => {
    setAnchorElCategoria({ ...anchorElCategoria, [id]: null });
    setOpenMenus({ ...openMenus, [id]: false });
  };
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    Login                                   */
  /* -------------------------------------------------------------------------- */
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email: emailLogin, password: senhaLogin });
  };
  const handleEmailChange = (event) => {
    setEmailLogin(event.target.value);
  };
  const handleSenhaChange = (event) => {
    setSenhaLogin(event.target.value);
  };

  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  Registrar                                 */
  /* -------------------------------------------------------------------------- */
  const [inputs, setInputs] = useState({});
  const [confirmacaoSenha, setConfirmacaoSenha] = useState({});

  const gerirMudançaRegistrar = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleConfirmacaoSenha = (e) => {
    setConfirmacaoSenha(e.target.value);
  };
  const confirmarInputs = (e) => {
    e.preventDefault();
    if (!inputs.name) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Não se esqueça de preencher seu nome completo :)",
        confirmButtonColor: "#0B3C49",
        confirmButtonText: "ok",
      });
    } else if (!inputs.email) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Não se esqueça de preencher seu E-mail :)",
        confirmButtonColor: "#0B3C49",
        confirmButtonText: "ok",
      });
    } else if (confirmacaoSenha !== inputs.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parece que você digitou duas senhas diferentes!",
        confirmButtonColor: "#0B3C49",
        confirmButtonText: "ok",
      });
    } else if (
      confirmacaoSenha === inputs.password &&
      inputs.name &&
      inputs.email
    ) {
      alert("vi começa putaria");
      registrarUtilizador(dispatch, inputs);
      if (false === true) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          confirmButtonColor: "#0B3C49",
          text: "Parece que alguem já se cadastrou com esse E-mail, porfavor utilize outro",
          confirmButtonText: "ok",
          footer: '<a href="/registrar">Acha que já tem cadastro?</a>',
        });
      } else {
        Swal.fire(
          "Tudo feito!",
          "Registrado com sucesso,seja bem vindo a esse conceito!",
          "success"
        );
        // navegarParaLogin();
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                            Usabilidades no menu                            */
  /* -------------------------------------------------------------------------- */
  const menuRef = useRef(null);
  const handleTabKeyPress = (event) => {
    event.stopPropagation();
    if (event.key === "Tab") {
      event.preventDefault();
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  const [loginState, setLoginState] = useState("Login");
  const handleTrocarLoginRegistrar = (state) => {
    setLoginState(state);
  };

  return (
    <>
      <Container>
        <WhatsappContainer>
          <WhatsappWrapper>
            <TextWhatsapp>acesse o zap imediatamente</TextWhatsapp>
          </WhatsappWrapper>
        </WhatsappContainer>
        <Wrapper>
          <PrimeiraLinha>
            <Left>
              <Link to="/home">
                <Logo alt="logo" src={logoImage} />
              </Link>
            </Left>
            <Center>
              <BoxSearch>
                {" "}
                <FormControl
                  style={{ width: "100%", textAlign: "start" }}
                  variant="standard"
                >
                  <Input
                    className="searchInputNavBar"
                    style={{ textAlign: "start" }}
                    id="input-with-icon-adornment"
                    placeholder="teste"
                    inputProps={{
                      style: { textAlign: "left" },
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </BoxSearch>
            </Center>
            <Right>
              <>
                <div>
                  <IconButton
                    style={{
                      color: "var(--color-text)",
                      transform: "scale(1.05)",
                    }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Person />
                  </IconButton>
                  <Menu
                    PaperProps={{
                      onKeyDown: handleTabKeyPress, // Capture Tab key press
                      ref: menuRef, // To capture focus
                    }}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {!utilizadorAtual ? (
                      <div key={1}>
                        {loginState === "Login" ? (
                          <MenuItem>
                            <ContainerLoginNav>
                              <TituloLogin>Login</TituloLogin>
                              <InputLogin
                                onKeyDown={handleTabKeyPress} // Handle Tab key press
                                onChange={handleEmailChange}
                                placeholder="E-mail"
                                inputProps={{
                                  style: { textAlign: "left" },
                                }}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Person />
                                  </InputAdornment>
                                }
                              ></InputLogin>
                              <InputLogin
                                onKeyDown={handleTabKeyPress} // Handle Tab key press
                                onChange={handleSenhaChange}
                                type="password"
                                placeholder="Senha"
                                inputProps={{
                                  style: { textAlign: "left" },
                                }}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Lock />
                                  </InputAdornment>
                                }
                              ></InputLogin>
                              <ButtonSubmit
                                onClick={(e) => {
                                  handleLogin(e);
                                }}
                              >
                                Login
                              </ButtonSubmit>
                            </ContainerLoginNav>
                          </MenuItem>
                        ) : (
                          <MenuItem>
                            <ContainerLoginNav>
                              <TituloLogin>Registrar</TituloLogin>
                              <InputLogin
                                onKeyDown={handleTabKeyPress} // Handle Tab key press
                                onChange={gerirMudançaRegistrar}
                                placeholder="Seu Nome"
                                name="name"
                                inputProps={{
                                  style: { textAlign: "left" },
                                }}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Person />
                                  </InputAdornment>
                                }
                              ></InputLogin>
                              <InputLogin
                                onKeyDown={handleTabKeyPress} // Handle Tab key press
                                onChange={gerirMudançaRegistrar}
                                placeholder="E-mail"
                                name="email"
                                inputProps={{
                                  style: { textAlign: "left" },
                                }}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Person />
                                  </InputAdornment>
                                }
                              ></InputLogin>
                              <InputLogin
                                onKeyDown={handleTabKeyPress} // Handle Tab key press
                                onChange={gerirMudançaRegistrar}
                                placeholder="Sua senha"
                                name="password"
                                type="password"
                                inputProps={{
                                  style: { textAlign: "left" },
                                }}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Person />
                                  </InputAdornment>
                                }
                              ></InputLogin>
                              <InputLogin
                                onKeyDown={handleTabKeyPress} // Handle Tab key press
                                onChange={handleConfirmacaoSenha}
                                type="password"
                                placeholder="Confirme sua senha"
                                inputProps={{
                                  style: { textAlign: "left" },
                                }}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Lock />
                                  </InputAdornment>
                                }
                              ></InputLogin>
                              <ButtonSubmit
                                onClick={(e) => {
                                  confirmarInputs(e);
                                }}
                              >
                                Registrar
                              </ButtonSubmit>
                            </ContainerLoginNav>
                          </MenuItem>
                        )}
                        {loginState === "Login" ? (
                          <MenuItem
                            onClick={() => {
                              handleTrocarLoginRegistrar("Registrar");
                            }}
                          >
                            {" "}
                            <span>Registrar</span>{" "}
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() => {
                              handleTrocarLoginRegistrar("Login");
                            }}
                          >
                            {" "}
                            <span>Login</span>{" "}
                          </MenuItem>
                        )}
                      </div>
                    ) : (
                      <div key={2}>
                        {" "}
                        <Link to="/myAccount">
                          <MenuItem onClick={handleClose}>
                            <span>Minha Conta</span>
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={handleClose}>
                          <span onClick={() => gerirLogout()}>Logout</span>
                        </MenuItem>
                      </div>
                    )}
                  </Menu>
                </div>
              </>

              <Link to="/cart">
                <StyledMenuItem>
                  <IconButton style={{ transform: "scale(1)" }}>
                    <Badge
                      overlap="rectangular"
                      badgeContent={quantity}
                      color="primary"
                    >
                      <ShoppingCartOutlined
                        style={{ color: "var(--color-text)" }}
                      />
                    </Badge>
                  </IconButton>
                </StyledMenuItem>
              </Link>
              <ToggleThemeButton />
            </Right>
          </PrimeiraLinha>
          <SegundaLinha>
            <>
              {categoriasNSubCategorias.map((item) => (
                <ContainerMegaMenu key={item.categoria}>
                  <CategoriaDropdown
                    id={`basic-Categoria${item.id}`}
                    aria-controls={
                      openMenus[item.id] ? "basic-Categoria-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openMenus[item.id] ? "true" : undefined}
                    onClick={(event) => handleClickCategoria(event, item.id)}
                  >
                    {item.categoria}
                    <ExpandMoreSharp />
                  </CategoriaDropdown>
                  <Menu
                    id="basic-Categoria-menu"
                    anchorEl={anchorElCategoria[item.id]}
                    open={openMenus[item.id] || false}
                    onClose={() => handleCloseCategoria(item.id)}
                    MenuListProps={{
                      "aria-labelledby": "basic-Categoria",
                    }}
                  >
                    {!!item.subcategorias
                      ? item.subcategorias?.map((subitem) => (
                          <Link
                            key={subitem.nome}
                            to={"/products/" + subitem.nome}
                          >
                            <MenuItem
                              onClick={() => handleCloseCategoria(item.id)}
                            >
                              {subitem.nome}
                            </MenuItem>
                          </Link>
                        ))
                      : ""}
                  </Menu>
                </ContainerMegaMenu>
              ))}
            </>
          </SegundaLinha>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
