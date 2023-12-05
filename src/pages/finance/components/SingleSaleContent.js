import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getFormmatedDate, isEmpty } from "../../../stringHelper";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  filterSingleSaleFinanceListRequest,
  getSingleSaleFinanceListRequest,
  getSingleSaleTotalToReceiveRequest,
} from "../../../services/financeService";
import "../finance.css";

function SingleSaleContent() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [totalToReceive, setTotalToReceive] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getFinanceBudgetList();
    getSingleSaleTotalToReceiveRequest().then((response) =>
      setTotalToReceive(response.data)
    );
  }, []);

  function getFinanceBudgetList() {
    getSingleSaleFinanceListRequest().then((response) => {
      setData(response.data);
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (isChecked === false && isEmpty(event.target.value)) {
      getFinanceBudgetList();
    } else {
      filterSingleSaleFinanceListRequest(event.target.value, isChecked).then(
        (response) => {
          setData(response.data);
        }
      );
    }
  }

  function handleIsCheckedChange() {
    if (!isChecked === true) {
      filterSingleSaleFinanceListRequest(search, !isChecked).then(
        (response) => {
          setData(response.data);
        }
      );
    } else if (!isChecked === false && isEmpty(search)) {
      getFinanceBudgetList();
    } else {
      filterSingleSaleFinanceListRequest(search, !isChecked).then(
        (response) => {
          setData(response.data);
        }
      );
    }
    setIsChecked(!isChecked);
  }

  return (
    <div>
      <div className="text-center div-title">
        <p className="page-title">Lista de Vendas Avulsas</p>
        <span className="font-size-18">Pesquisar: </span>
        <input
          maxLength="100"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
        <div className="mt-3">
          <input
            className="me-1"
            type="checkbox"
            defaultChecked={isChecked}
            onChange={handleIsCheckedChange}
          />
          <span>Em débito</span>
        </div>
        <span className="total-to-receive">
          Total a Receber: R$ {totalToReceive.toFixed(2)}
        </span>
      </div>
      <div className="align-center">
        <Table className="table-preferences">
          <thead>
            <tr>
              <th>Data de Finalização</th>
              <th>Cliente</th>
              <th>Valor Total</th>
              <th>Resta à Pagar</th>
              <th>Pagar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                singleSaleId,
                clientName,
                finalizedAt,
                toBePaid,
                totalValue,
              }) => (
                <tr key={singleSaleId}>
                  <td>{getFormmatedDate(finalizedAt)}</td>
                  <td>{clientName}</td>
                  <td>R$ {totalValue.toFixed(2)}</td>
                  <td>R$ {toBePaid.toFixed(2)}</td>
                  <td>
                    <Link to={`/finance/singleSalePay/${singleSaleId}`}>
                      <AttachMoneyIcon className="money-icon" />
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default SingleSaleContent;
