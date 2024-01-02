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
  filterSingleSaleFinanceListRequest,
  getSingleSaleFinanceListRequest,
  getSingleSaleTotalToReceiveRequest,
} from "../../../services/financeService";
import "../finance.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SingleSaleContent() {
  const [singleSaleFinanceList, setSingleSaleFinanceList] = useState([]);
  const [search, setSearch] = useState("");
  const [totalToReceive, setTotalToReceive] = useState(0);
  const [isInDebtChecked, setIsInDebtChecked] = useState(false);
  const [isPaidChecked, setIsPaidChecked] = useState(false);

  useEffect(() => {
    getSingleSaleFinanceList();
    getSingleSaleTotalToReceiveRequest().then((response) =>
      setTotalToReceive(response.data)
    );
  }, []);

  function getSingleSaleFinanceList() {
    getSingleSaleFinanceListRequest().then((response) => {
      setSingleSaleFinanceList(response.data);
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (
      isPaidChecked === false &&
      isInDebtChecked === false &&
      isEmpty(event.target.value)
    ) {
      getSingleSaleFinanceList();
    } else {
      filterSingleSaleFinanceListRequest(
        event.target.value,
        isInDebtChecked,
        isPaidChecked
      ).then((response) => {
        setSingleSaleFinanceList(response.data);
      });
    }
  }

  function handleIsInDebtCheckedChange() {
    if (!isInDebtChecked === false && isEmpty(search)) {
      getSingleSaleFinanceList();
    } else {
      filterSingleSaleFinanceListRequest(search, !isInDebtChecked, false).then(
        (response) => {
          setSingleSaleFinanceList(response.data);
        }
      );
    }
    setIsInDebtChecked(!isInDebtChecked);
    setIsPaidChecked(false);
  }

  function handleIsPaidCheckedChange() {
    if (!isPaidChecked === false && isEmpty(search)) {
      getSingleSaleFinanceList();
    } else {
      filterSingleSaleFinanceListRequest(search, false, !isPaidChecked).then(
        (response) => {
          setSingleSaleFinanceList(response.data);
        }
      );
    }
    setIsPaidChecked(!isPaidChecked);
    setIsInDebtChecked(false);
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
          <thead className="scroll-thead">
            <tr>
              <th>Data de Finalização</th>
              <th>Cliente</th>
              <th>Valor Total</th>
              <th>Resta à Pagar</th>
              <th>Pagar</th>
              <th>Visualizar</th>
            </tr>
          </thead>
          <tbody className="scroll-tbody">
            {singleSaleFinanceList.map(
              ({
                singleSaleId,
                clientName,
                finalizedAt,
                toBePaid,
                totalValue,
              }) => (
                <tr key={singleSaleId} className="scroll-trow">
                  <td>{getFormmatedDate(finalizedAt)}</td>
                  <td>{clientName}</td>
                  <td>R$ {getFormmatedMoney(totalValue)}</td>
                  <td>R$ {getFormmatedMoney(toBePaid)}</td>
                  <td>
                    <Link to={`/finance/singleSalePay/${singleSaleId}`}>
                      <AttachMoneyIcon className="money-icon" />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/singleSale/view/${singleSaleId}`}>
                      <VisibilityIcon />
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
