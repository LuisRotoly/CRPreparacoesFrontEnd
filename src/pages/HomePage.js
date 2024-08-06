import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../components/modal/DeleteModal";
import {
  getCashHandlingListByDate,
  removeDebitPaymentByIdRequest,
} from "../services/debitPaymentService";
import { getFormmatedDate, getFormmatedDateDB } from "../stringHelper";
import AddNewDebitPaymentModal from "../components/modal/AddNewDebitPaymentModal";

function HomePage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [cashHandlingList, setCashHandlingList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addNewDebitPaymentModal, setAddNewDebitPaymentModal] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    getCashHandlingListByDate(getFormmatedDateDB(new Date())).then(
      (response) => {
        setCashHandlingList(response.data);
      }
    );
  }, []);

  function getCashHandlingList() {
    getCashHandlingListByDate(getFormmatedDateDB(date)).then((response) => {
      setCashHandlingList(response.data);
    });
  }

  function gotoSingleSale() {
    navigate("/singleSale");
  }

  function openDeleteModal(id) {
    setPaymentId(id);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
    setPaymentId("");
  }

  function openDebitPaymentModal() {
    setAddNewDebitPaymentModal(true);
  }

  function closeDebitPaymentModal() {
    setAddNewDebitPaymentModal(false);
    getCashHandlingList();
  }

  function deletePayment() {
    removeDebitPaymentByIdRequest(paymentId).then(() => {
      getCashHandlingList();
    });
    closeDeleteModal();
  }

  function gotoOneDayBack() {
    setDate(new Date(date.setDate(date.getDate() - 1)));
    getCashHandlingList();
  }

  function gotoOneDayFoward() {
    setDate(new Date(date.setDate(date.getDate() + 1)));
    getCashHandlingList();
  }

  function getTotalDayCashHandling() {
    let totalValue = 0;
    cashHandlingList.forEach((element) => {
      totalValue = totalValue + element.value;
    });
    return totalValue;
  }

  function gotoHandlinCashList() {
    navigate("/handlingCashList");
  }

  return (
    <div className="text-center div-title">
      <div className="data">
        <button
          className="btn btn-outline-primary me-3"
          onClick={() => gotoHandlinCashList()}
        >
          Listar por mês/ano
        </button>
        <button
          className="btn btn-outline-primary me-3"
          onClick={() => openDebitPaymentModal()}
        >
          Criar Novo Débito
        </button>
        <button className="btn btn-outline-primary" onClick={gotoSingleSale}>
          Venda Avulsa
        </button>
      </div>
      <div className="mb-3">
        <p className="page-title">Movimento do Caixa</p>
        <ArrowBackIcon
          fontSize="large"
          role="button"
          onClick={() => gotoOneDayBack()}
        />
        <span className="me-3 ms-3 font-size-22">{getFormmatedDate(date)}</span>
        <ArrowForwardIcon
          fontSize="large"
          role="button"
          onClick={() => gotoOneDayFoward()}
        />
      </div>
      <div className="align-center">
        <Table className="table-preferences">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Observação</th>
              <th>Forma de Pagamento</th>
              <th>Valor Crédito</th>
              <th>Valor Débito</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {cashHandlingList.map(
              (
                { id, description, notes, paymentFormat, value, freeInput },
                index
              ) => (
                <tr key={index}>
                  <td>{description}</td>
                  <td>{notes}</td>
                  <td>{paymentFormat.type}</td>
                  {value >= 0 ? (
                    <td className="text-primary">R$ {value} </td>
                  ) : (
                    <td></td>
                  )}
                  {value < 0 ? (
                    <td className="text-danger">R$ {value} </td>
                  ) : (
                    <td></td>
                  )}
                  <td>
                    {freeInput ? (
                      <DeleteIcon
                        className="default-remove-icon"
                        onClick={() => openDeleteModal(id)}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
      <div>
        <p className="font-size-20">
          Valor final do dia:{" "}
          <span className="font-size-22">RS{getTotalDayCashHandling()}</span>
        </p>
      </div>
      <AddNewDebitPaymentModal
        show={addNewDebitPaymentModal}
        close={closeDebitPaymentModal}
      />
      <DeleteModal
        show={deleteModal}
        close={closeDeleteModal}
        title={"Excluir o pagamento?"}
        remove={deletePayment}
      />
    </div>
  );
}
export default HomePage;
