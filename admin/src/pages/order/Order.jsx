import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./order.css";
import { useState, useEffect } from "react";
import { updateOrder, getOrders } from "../../redux/apiCalls";

export default function Order() {
  const location = useLocation();
  const pedidoID = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const pedidos = useSelector((state) => state.order.orders);

  const [pedidoAtual, setPedidoAtual] = useState({});
  console.log(pedidos);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  useEffect(() => {
    let pedidoAtual_f = pedidos.find((pedido) => pedido._id === pedidoID);
    setPedidoAtual(pedidoAtual_f);
  }, [pedidos]);

  useEffect(() => {
    console.log(pedidoAtual);
  }, [pedidoAtual]);
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Editar Pedido</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label style={{ fontSize: "20px", fontWeight: "500" }}>
                  Endereço
                </label>
                <input
                  type="text"
                  placeholder="endereço"
                  className="userUpdateInput"
                />
                <input
                  type="text"
                  placeholder="complemento"
                  className="userUpdateInput"
                />
                <input
                  type="text"
                  placeholder="numero"
                  className="userUpdateInput"
                />
                <input
                  type="text"
                  placeholder="bairro"
                  className="userUpdateInput"
                />
                <input
                  type="text"
                  placeholder="referencia"
                  className="userUpdateInput"
                />
                <input
                  type="text"
                  placeholder="cidade"
                  className="userUpdateInput"
                />
                <input
                  type="text"
                  placeholder="uf"
                  className="userUpdateInput"
                />
                <input
                  type="text"
                  placeholder="cep"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateItem">
                <label>Status</label>
                <input
                  type="text"
                  placeholder="Status"
                  className="userUpdateInput"
                />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
