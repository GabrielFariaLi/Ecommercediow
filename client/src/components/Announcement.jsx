import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return (
    <Container>
      Loja dos racistinhas on se vc tbm odeia minorias 50% off TODA A LOJA
    </Container>
  );
};

export default Announcement;
