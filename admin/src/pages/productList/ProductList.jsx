import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

const AddProductBtn = styled.div`
  /* ... *
/* CSS HSL */
  /* --night: hsla(152, 100%, 3%, 1);
--pine-green: hsla(172, 71%, 25%, 1);
--ghost-white: hsla(235, 31%, 93%, 1);
--silver: hsla(0, 0%, 81%, 1);
--russian-violet: hsla(260, 32%, 27%, 1); */

  padding: 0.5rem 1rem;
  width: fit-content;
  height: fit-content;
  background: hsla(172, 71%, 25%, 1);
  position: fixed;
  bottom: 4rem;
  color: hsla(235, 31%, 93%, 1);

  right: 2rem;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 7px;

  span {
    margin-right: 10px;
    /* CSS styles for the span element */
    font-size: 28px; /* For example, make the text inside the span red */
    font-weight: bold;
    /* Add any other styles you want */
  }
`;

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      <Link to="/newproduct" className="link">
        <AddProductBtn>
          <span class="material-symbols-outlined">add</span>
          Adicionar Produto 🛹
        </AddProductBtn>
      </Link>
    </div>
  );
}
