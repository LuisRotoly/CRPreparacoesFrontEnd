import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getFormmatedDate, isEmpty } from "../../stringHelper";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  filterFinanceBudgetListRequest,
  getFinanceBudgetListRequest,
} from "../../services/financeService";

function FinancePage() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getFinanceBudgetList();
  }, []);

  function getFinanceBudgetList() {
    getFinanceBudgetListRequest().then((response) => {
      setData(response.data);
      setOriginalData(response.data);
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (!isEmpty(event.target.value)) {
      filterFinanceBudgetListRequest(event.target.value).then((response) => {
        setData(response.data);
      });
    } else {
      setData(originalData);
    }
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
                  <td>R$ {totalValue}</td>
                  <td>R$ {toBePaid}</td>
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
