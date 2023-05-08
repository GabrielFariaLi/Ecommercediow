import { Badge } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Search, ShoppingCartOutlined, Person } from "@material-ui/icons";
import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, resetarCarrinho } from "../redux/apiCalls";
import ToggleThemeButton from "../components/props/toggleThemeButton/toggleThemeButton";
import logoImage from "../../src/assets/imgs/logo.png"; // import the image file

const Container = styled.div`
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  border-bottom: 5px solid var(--color-text);
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-background);
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
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

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
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
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const StyledMenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Logo = styled.img`
  height: 40px;
  filter: var(--color-filter);
`;

const Navbar = () => {
  //LOGOUT
  const dispatch = useDispatch();
  /* checar se existe um usuario logado */
  const utilizadorAtual = useSelector((estado) => estado?.user.currentUser);
  useEffect(() => {
    console.log(utilizadorAtual);
  }, [utilizadorAtual]);
  /* checar se existe um usuario logado */

  /* checarCarrinho propriedades */
  const quantity = useSelector((state) => state.cart.quantity);
  /* checarCarrinho propriedades */

  const gerirLogout = () => {
    console.log("ahn porra");
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
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="">
            <Logo alt="logo" src={logoImage} />
          </Link>
        </Left>
        <Center>
          Ligue agora <GreenText>(xx) xxxxx-xxxx</GreenText>
        </Center>
        <Right>
          {!utilizadorAtual ? (
            <>
              {" "}
              <Link to="/register">
                <StyledMenuItem>REGISTER</StyledMenuItem>
              </Link>
              <Link to="/login">
                {" "}
                <StyledMenuItem>SIGN IN</StyledMenuItem>
              </Link>
            </>
          ) : (
            <>
              <div>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Person />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <span>Minha Conta</span>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <span onClick={() => gerirLogout()}>Logout</span>
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}

          <Link to="/cart">
            <StyledMenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </StyledMenuItem>
          </Link>
          <ToggleThemeButton />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
