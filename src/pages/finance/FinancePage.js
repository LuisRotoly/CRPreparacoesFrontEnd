import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getFormmatedDate, isEmpty } from "../../stringHelper";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  filterFinanceBudgetListRequest,
  getFinanceBudgetListRequest,
  getTotalToReceiveRequest,
} from "../../services/financeService";
import "./finance.css";

function FinancePage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [totalToReceive, setTotalToReceive] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getFinanceBudgetList();
    getTotalToReceiveRequest().then((response) =>
      setTotalToReceive(response.data)
    );
  }, []);

  function getFinanceBudgetList() {
    getFinanceBudgetListRequest().then((response) => {
      setData(response.data);
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (isChecked === false && isEmpty(event.target.value)) {
      getFinanceBudgetList();
    } else {
      filterFinanceBudgetListRequest(event.target.value, isChecked).then(
        (response) => {
          setData(response.data);
        }
      );
    }
  }

  function handleIsCheckedChange() {
    if (!isChecked === true) {
      filterFinanceBudgetListRequest(search, !isChecked).then((response) => {
        setData(response.data);
      });
    } else if (!isChecked === false && isEmpty(search)) {
      getFinanceBudgetList();
    } else {
      filterFinanceBudgetListRequest(search, !isChecked).then((response) => {
        setData(response.data);
      });
    }
    setIsChecked(!isChecked);
  }

  return (
    <div>
      <div className="text-center div-title">
        <p className="page-title">Lista de Serviços Realizados</p>
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
              <th>Placa</th>
              <th>Moto</th>
              <th>Valor Total</th>
              <th>Resta à Pagar</th>
              <th>Pagar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                budgetId,
                clientName,
                plate,
                bikeNameAndBrand,
                finalizedAt,
                toBePaid,
                totalValue,
              }) => (
                <tr key={budgetId}>
                  <td>{getFormmatedDate(finalizedAt)}</td>
                  <td>{clientName}</td>
                  <td>{plate}</td>
                  <td>{bikeNameAndBrand}</td>
                  <td>R$ {totalValue.toFixed(2)}</td>
                  <td>R$ {toBePaid.toFixed(2)}</td>
                  <td>
                    <Link to={`/finance/pay/${budgetId}`}>
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
export default FinancePage;
