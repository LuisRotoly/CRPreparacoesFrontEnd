import { useEffect, useState } from "react";
import {
  getCashHandlingExistentYear,
  getCashHandlingListByYearAndMonth,
} from "../services/debitPaymentService";
import Spinner from "react-bootstrap/Spinner";
import { Table } from "react-bootstrap";
import { getFormmatedDate, getFormmatedMoney } from "../stringHelper";

function HandlingCashList() {
  const [yearList, setYearList] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const monthList = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const [selectedMonth, setSelectedMonth] = useState("");
  const [cashHandlingList, setCashHandlingList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  useEffect(() => {
    getCashHandlingExistentYear().then((response) => {
      setYearList(response.data);
    });
  }, []);

  function handleYearChange(event) {
    setSelectedYear(yearList[event.target.selectedIndex - 1]);
  }

  function handleMonthChange(event) {
    setSelectedMonth(event.target.selectedIndex);
  }

  function getHandlingCashList() {
    setLoader(true);
    getCashHandlingListByYearAndMonth(selectedYear, selectedMonth).then(
      (response) => {
        setCashHandlingList(response.data);
        setLoader(false);
        setTotalValues(response.data);
      }
    );
  }

  function setTotalValues(cashList) {
    let debitValue = 0;
    let creditValue = 0;
    cashList.forEach((element) => {
      if (element.value >= 0) {
        creditValue = creditValue + element.value;
      } else {
        debitValue = debitValue + element.value;
      }
    });
    setTotalCredit(creditValue);
    setTotalDebit(debitValue);
  }

  return (
    <div className="text-center div-title">
      <span className="me-3 font-size-20">Ano</span>
      <select
        defaultValue=""
        className="select-width"
        onChange={handleYearChange}
      >
        <option key="blankChoice" hidden value="">
          Selecione...
        </option>
        {yearList.map((year) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>

      {selectedYear !== "" ? (
        <div className="mt-2">
          <span className="me-3 font-size-20">Mês</span>
          <select
            defaultValue=""
            className="select-width"
            onChange={handleMonthChange}
          >
            <option key="blankChoice" hidden value="">
              Selecione...
            </option>
            {monthList.map((month) => {
              return (
                <option key={month} value={month}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}

      {selectedMonth !== "" ? (
        <div>
          <button
            className="mt-3 btn btn-outline-primary"
            onClick={() => getHandlingCashList()}
          >
            Buscar Lista
          </button>
        </div>
      ) : null}

      {loader ? (
        <Spinner className="mt-3" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : null}

      {cashHandlingList.length !== 0 ? (
        <div className="mt-3 align-center">
          <Table className="table-preferences">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Observação</th>
                <th>Forma de Pagamento</th>
                <th>Valor Crédito</th>
                <th>Valor Débito</th>
              </tr>
            </thead>
            <tbody>
              {cashHandlingList.map(
                (
                  { description, notes, paymentFormat, value, paidAt },
                  index
                ) => (
                  <tr key={index}>
                    <td>{getFormmatedDate(paidAt)}</td>
                    <td>{description}</td>
                    <td>{notes}</td>
                    <td>{paymentFormat.type}</td>
                    {value >= 0 ? (
                      <td className="text-primary">
                        R$ {getFormmatedMoney(value)}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {value < 0 ? (
                      <td className="text-danger">
                        R$ {getFormmatedMoney(value)}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                )
              )}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <th className="font-size-18">Valor Total</th>
                <td className="font-size-20 text-primary">
                  R$ {getFormmatedMoney(totalCredit)}
                </td>
                <td className="font-size-20 text-danger">
                  R$ {getFormmatedMoney(totalDebit)}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}

export default HandlingCashList;
