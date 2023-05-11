import styled from "styled-components";

import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import mUIAccordion from "@mui/material/Accordion";
import mUIAccordionSummary from "@mui/material/AccordionSummary";
import mUIAccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import { categoriasAirsfot, dummyCores, dummyTamanhos } from "../data";
import { ImportContacts } from "@material-ui/icons";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { styled as styledMui } from "@mui/material/styles";

const Container = styled.div`
  padding-top: 60px;
  background: var(--color-text);
`;
const Accordion = styledMui(mUIAccordion)`
  background:transparent;
  color: var(--color-text) ;
  margin: 0px;
  width:100%;
  fill: var(--color-text) ;
  stroke: var(--color-text);
  border:none;
  outline:none;
  box-shadow:none;
`;
const AccordionSummary = styledMui(mUIAccordionSummary)`
  background:transparent;
  color: var(--color-text) ;
  margin: 0px;

  padding: 0px 5%;
  fill: var(--color-text) ;
  stroke: var(--color-text);
 
  outline:none;  
  border-bottom: 1px solid var(--color-text);
  border-top: 1px solid var(--color-text);
  box-shadow:none;
`;
const AccordionDetails = styledMui(mUIAccordionDetails)`
  background:transparent;
  color: var(--color-text) ;
  margin: 0px;padding: 0px 5%;
  fill: var(--color-text) ;
  stroke: var(--color-text);
  border:none;border-bottom: 1px solid var(--color-text);
  outline:none;
  box-shadow:none;
`;

const Title = styled.h1``;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ContainerProdutosFiltros = styled.div`
  /* ... */
  color: var(--color-text);
  background: var(--color-background);
  width: 100%;
  height: 100%;
  display: flex;
`;
const FiltroContainer = styled.div`
  /* ... */
  width: 22.5%;
  height: 100%;
  padding-left: 2.5%;
`;
const SideBarFiltro = styled.div`
  /* ... */
  width: 100%;
  height: 100%;
  border: 0.75px solid var(--color-text);
`;
const ContainerItemFiltro = styled.div`
  /* ... */
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
  align-items: start;
`;

const Flex = styled.div`
  /* ... */
  width: 100%;
  padding: 2.5% 0;
  display: flex;
  align-items: center;
`;
const FlexColumn = styled.div`
  /* ... */

  display: flex;
  flex-direction: column;

  align-items: center;
`;

const ContainerProdutosInfos = styled.div`
  /* ... */
`;
const ContainerBreadCrumbs = styled.div`
  /* ... */
`;

const Input = styledMui(MuiInput)`
border-radius: 15px;
color:var(--color-text);

border: 1px solid var(--color-text-soft);
padding: 4px ;
display:flex;
align-items:center;
justify-content:center;
text-align:center;
font-family: 'Exo 2';
`;

const ContainerCorFiltro = styled.div`
  /* ... */
  min-width: 43px;
  min-height: 43px;
  max-width: 43px;
  max-height: 43px;
  padding: 2px;
  border: ${(props) => (props.cor === "Branco" ? "0.1px solid black" : "")};
  /* ... */
  flex: 1;

  cursor: pointer;
  border-radius: 17px;
  background: ${(props) =>
    props.cor === "Roxo"
      ? "purple"
      : props.cor === "Preto"
      ? "black"
      : props.cor === "Vermelho"
      ? "red"
      : props.cor === "Laranja"
      ? "orange"
      : props.cor === "Azul"
      ? "blue"
      : props.cor === "Branco"
      ? "white"
      : props.cor === "Marrom"
      ? "brown"
      : props.cor === "Verde"
      ? "lightgreen"
      : props.cor === "Amarelo"
      ? "yellow"
      : props.cor === "Cinza"
      ? "gray"
      : props.cor === "Rosa"
      ? "pink"
      : props.cor === "Azul Claro"
      ? "lightblue"
      : ""};
`;

const ContainerTamanhoFiltro = styled.div`
  /* ... */
  padding: 5px 10px;
  cursor: pointer;
  min-width: 50px;
  border-radius: 5px;
  border: 2px solid var(--color-text-soft);
  text-align: center;
`;

const ContainerCoresFiltro = styled.div`
  /* ... */
  max-width: 100%;
  display: flex;
  gap: 20px 45px;
  justify-content: space-between;
  padding-top: 5%;
  padding-bottom: 5%;
  flex-wrap: wrap;
`;

const LegendaCor = styled.span`
  /* ... */
  font-weight: 300;
  font-size: var(--size-medium);
  color: var(--color-text-soft);
`;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                            Preço slider section                            */
  /* -------------------------------------------------------------------------- */

  const [value, setValue] = useState([30, 300]);

  const handleSliderChange = (event, newValue) => {
    console.log(
      "🚀 ~ file: ProductList.jsx:124 ~ handleSliderChange ~ newValue:",
      newValue
    );
    setValue(newValue);
  };

  const handleInputChange = (index) => (event) => {
    console.log(
      "🚀 ~ file: ProductList.jsx:132 ~ handleInputChange ~ event:",
      event
    );
    const updatedValues = [...value];
    console.log(
      "🚀 ~ file: ProductList.jsx:133 ~ handleInputChange ~ value:",
      value
    );
    updatedValues[index] = Number(event.target.value);
    console.log(
      "🚀 ~ file: ProductList.jsx:138 ~ handleInputChange ~ updatedValues:",
      updatedValues
    );
    setValue(updatedValues);

    console.log(
      "🚀 ~ file: ProductList.jsx:135 ~ handleInputChange ~ updatedValues:",
      updatedValues
    );
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                Cores Section                               */
  /* -------------------------------------------------------------------------- */
  const [corFiltro, setCorFiltro] = useState("");
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                Tamanhos Section                               */
  /* -------------------------------------------------------------------------- */
  const [tamanhoFiltro, setTamanhoFiltro] = useState("");
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                 Accordions                                 */
  /* -------------------------------------------------------------------------- */
  /* const [expanded, setExpanded] = useState("panel1");

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  }; */
  /* -------------------------------------------------------------------------- */
  /*                                     fim                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <Container>
      <Navbar />

      {/*   <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer> */}
      <ContainerProdutosFiltros>
        <FiltroContainer>
          <SideBarFiltro>
            <ContainerItemFiltro>
              <Flex>
                Filtrar
                <svg
                  fill="currentColor"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  id="filter-alt"
                  class="icon glyph"
                >
                  <path d="M12,9a3.66,3.66,0,0,0,1-.13V21a1,1,0,0,1-2,0V8.87A3.66,3.66,0,0,0,12,9Z"></path>
                  <path d="M19,16a3.66,3.66,0,0,0,1-.13V21a1,1,0,0,1-2,0V15.87A3.66,3.66,0,0,0,19,16Z"></path>
                  <path d="M20,3V8.13a3.91,3.91,0,0,0-2,0V3a1,1,0,0,1,2,0Z"></path>
                  <path d="M6,3V15.13A3.66,3.66,0,0,0,5,15a3.66,3.66,0,0,0-1,.13V3A1,1,0,0,1,6,3Z"></path>
                  <path d="M8,19a3,3,0,1,1-4-2.82,2.87,2.87,0,0,1,2,0A3,3,0,0,1,8,19Z"></path>
                  <path d="M15,5a3,3,0,0,1-2,2.82,2.87,2.87,0,0,1-2,0A3,3,0,1,1,15,5Z"></path>
                  <path d="M22,12a3,3,0,0,1-2,2.82,2.87,2.87,0,0,1-2,0,3,3,0,0,1,0-5.64,2.87,2.87,0,0,1,2,0A3,3,0,0,1,22,12Z"></path>
                </svg>
              </Flex>
            </ContainerItemFiltro>
            <ContainerItemFiltro>
              Filtrar
              {categoriasAirsfot.map((item) => {
                return (
                  <Flex>
                    {item.categoria}
                    <ChevronRight style={{ marginLeft: "auto" }} />
                  </Flex>
                );
              })}
            </ContainerItemFiltro>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                Preço
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  value={value}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  step={10}
                  min={10}
                  max={5000}
                />
                <Flex>
                  {" "}
                  <Input
                    value={value[0]}
                    size="small"
                    onChange={handleInputChange(0)}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 5000,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                  <Input
                    value={value[1]}
                    size="small"
                    onChange={handleInputChange(1)}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 5000,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Flex>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                Cores
              </AccordionSummary>
              <AccordionDetails>
                <ContainerCoresFiltro>
                  {dummyCores.map((cor) => {
                    return (
                      <FlexColumn onClick={() => setCorFiltro(cor)}>
                        <ContainerCorFiltro
                          style={{
                            content: corFiltro === cor ? "\\2713" : "",
                            border:
                              corFiltro === cor
                                ? "2px solid var(--color-text)"
                                : "",
                            backgroundClip:
                              corFiltro === cor ? "content-box" : "",
                            padding: corFiltro === cor ? "2px" : "",
                          }}
                          cor={cor}
                        ></ContainerCorFiltro>
                        <LegendaCor>{cor}</LegendaCor>
                      </FlexColumn>
                    );
                  })}
                </ContainerCoresFiltro>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                Tamanhos
              </AccordionSummary>
              <AccordionDetails>
                <ContainerCoresFiltro>
                  {dummyTamanhos.map((tamanho) => {
                    return (
                      <ContainerTamanhoFiltro
                        onClick={() => setTamanhoFiltro(tamanho)}
                        style={{
                          background:
                            tamanhoFiltro === tamanho
                              ? "var(--color-text)"
                              : "var(--color-background)",
                          color:
                            tamanhoFiltro === tamanho
                              ? "var(--color-background)"
                              : "var(--color-text)",
                        }}
                      >
                        {tamanho}
                      </ContainerTamanhoFiltro>
                    );
                  })}
                </ContainerCoresFiltro>
              </AccordionDetails>
            </Accordion>

            <Accordion disabled>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                Disabled Accordion
              </AccordionSummary>
            </Accordion>
          </SideBarFiltro>
        </FiltroContainer>
        <ContainerProdutosInfos>
          <ContainerBreadCrumbs></ContainerBreadCrumbs>
          <Title>{cat}</Title>
          <Products cat={cat} filters={filters} sort={sort} />
        </ContainerProdutosInfos>
      </ContainerProdutosFiltros>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
