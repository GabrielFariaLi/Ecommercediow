import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCalls";

export default function OrderList() {
  const dispatch = useDispatch();
  const pedidos = useSelector((state) => state.order.orders);
  console.log(pedidos);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const gerirDelete = (id) => {
    const resultado = window.confirm(
      "Tem certeza que deseja remover este utilizador?"
    );
    if (resultado == true) {
      deleteOrder(id, dispatch);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 230 },

    { field: "createdAt", headerName: "Dia do pedido", width: 200 },
    {
      field: "products",
      headerName: "Qnt Produtos",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div style={{ textAlign: "center" }}>
              {params.row.products.length}
            </div>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },
    {
      field: "amount",
      headerName: "Valor",
      width: 270,
    },
    {
      field: "acao",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/orders/" + params.row._id}>
              <button className="userListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => gerirDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Link className="float" to="/adminNovoUser">
        <button className="addProdutoButton">Criar</button>
      </Link>
      <DataGrid
        rows={pedidos}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
