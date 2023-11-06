import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { registrarUtilizador } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
/* import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer"; */
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const dispatch = useDispatch();
  const navigate = useHistory();
  //const navegarParaHome = () => navigate('/');
  const navegarParaLogin = () => navigate.push("/login");
  const utilizadorAtual = useSelector((estado) => estado?.user);
  const emailExistente = useSelector((estado) => estado?.user);

  const gerirMudança = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const confirmarInputs = (e) => {
    e.preventDefault();
    if (!inputs.nome) {
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
    } else if (!inputs.telefone) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Não se esqueça de preencher seu Telemóvel :)",
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
      inputs.nome &&
      inputs.email &&
      inputs.telefone
    ) {
      registrarUtilizador(dispatch, inputs);
      if (emailExistente === true) {
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
        navegarParaLogin();
      }
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            onChange={gerirMudança}
          />
          <Input
            type="text"
            name="email"
            placeholder="email"
            onChange={gerirMudança}
          />
          <Input
            type="text"
            name="telefone"
            placeholder="telefone"
            onChange={gerirMudança}
          />
          <Input
            name="password"
            type="password"
            placeholder="senha"
            onChange={gerirMudança}
          />
          <Input
            name="password_confirm"
            type="password"
            placeholder="confimar sua senha"
            onChange={(e) => setConfirmacaoSenha(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={confirmarInputs}>Criar conta</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
