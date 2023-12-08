import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  getFormmatedDate,
  getFormmatedMoney,
  isEmpty,
} from "../../../stringHelper";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  filterFinanceBudgetListRequest,
  getFinanceBudgetListRequest,
  getTotalToReceiveRequest,
} from "../../../services/financeService";
import "../finance.css";

function BudgetContent() {
  const [financeBudgetList, setFinanceBudgetList] = useState([]);
  const [search, setSearch] = useState("");
  const [totalToReceive, setTotalToReceive] = useState(0);
  const [isInDebtChecked, setIsInDebtChecked] = useState(false);
  const [isPaidChecked, setIsPaidChecked] = useState(false);

  useEffect(() => {
    getFinanceBudgetList();
    getTotalToReceiveRequest().then((response) =>
      setTotalToReceive(response.data)
    );
  }, []);

  function getFinanceBudgetList() {
    getFinanceBudgetListRequest().then((response) => {
      setFinanceBudgetList(response.data);
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (
      isPaidChecked === false &&
      isInDebtChecked === false &&
      isEmpty(event.target.value)
    ) {
      getFinanceBudgetList();
    } else {
      filterFinanceBudgetListRequest(
        event.target.value,
        isInDebtChecked,
        isPaidChecked
      ).then((response) => {
        setFinanceBudgetList(response.data);
      });
    }
  }

  function handleIsInDebtCheckedChange() {
    if (!isInDebtChecked === false && isEmpty(search)) {
      getFinanceBudgetList();
    } else {
      filterFinanceBudgetListRequest(search, !isInDebtChecked, false).then(
        (response) => {
          setFinanceBudgetList(response.data);
        }
      );
    }
    setIsInDebtChecked(!isInDebtChecked);
    setIsPaidChecked(false);
  }

  function handleIsPaidCheckedChange() {
    if (!isPaidChecked === false && isEmpty(search)) {
      getFinanceBudgetList();
    } else {
      filterFinanceBudgetListRequest(search, false, !isPaidChecked).then(
        (response) => {
          setFinanceBudgetList(response.data);
        }
      );
    }
    setIsPaidChecked(!isPaidChecked);
    setIsInDebtChecked(false);
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
        <div className="filter-status mt-3">
          <div>
            <input
              className="me-1"
              type="checkbox"
              checked={isInDebtChecked}
              onChange={handleIsInDebtCheckedChange}
            />
            <span>Em débito</span>
          </div>
          <div>
            <input
              className="me-1"
              type="checkbox"
              checked={isPaidChecked}
              onChange={handleIsPaidCheckedChange}
            />
            <span>Pago</span>
          </div>
        </div>
        <span className="total-to-receive">
          Total a Receber: R$ {getFormmatedMoney(totalToReceive)}
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
            {financeBudgetList.map(
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
                  <td>R$ {getFormmatedMoney(totalValue)}</td>
                  <td>R$ {getFormmatedMoney(toBePaid)}</td>
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
export default BudgetContent;
