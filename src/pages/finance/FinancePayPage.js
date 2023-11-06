import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
  getFinanceBudgetByIdRequest,
  getPaymentsListRequest,
  removePaymentByIdRequest,
  addPaymentRequest,
  getToBePaidRequest,
} from "../../services/financeService";
import DeleteModal from "../../components/modal/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPaymentFormatListRequest } from "../../services/paymentFormatService";
import { getFormmatedDate, isEmpty } from "../../stringHelper";

function FinancePayPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState("");
  const [plate, setPlate] = useState("");
  const [bikeNameAndBrand, setBikeNameAndBrand] = useState("");
  const [financeBudgetList, setFinanceBudgetList] = useState([]);
  const [totalValue, setTotalValue] = useState("");
  const [toBePaid, setToBePaid] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [removePayment, setRemovePayment] = useState("");
  const [paymentFormatList, setPaymentFormatList] = useState([]);
  const [paymentFormat, setPaymentFormat] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getFinanceBudgetByIdRequest(pathname.id).then((response) => {
      setClient(response.data.clientName);
      setPlate(response.data.plate);
      setBikeNameAndBrand(response.data.bikeNameAndBrand);
      setFinanceBudgetList(response.data.financeBudgetList);
      setTotalValue(response.data.totalValue);
      setToBePaid(response.data.toBePaid);
    });
    getPaymentFormatListRequest().then((response) =>
      setPaymentFormatList(response.data)
    );
  }, [pathname.id]);

  function getFinanceBudgetList() {
    getPaymentsListRequest(pathname.id).then((response) =>
      setFinanceBudgetList(response.data)
    );
  }

  function getToBePaid() {
    getToBePaidRequest(pathname.id).then((response) =>
      setToBePaid(response.data)
    );
  }

  function gotoBackPage() {
    navigate("/finance");
  }

  function openDeleteModal(id) {
    setRemovePayment(id);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
  }

  function deletePayment() {
    removePaymentByIdRequest(removePayment)
      .then(() => {
        getFinanceBudgetList();
        getToBePaid();
      })
      .catch((e) => setErrorMessage(e.response.data.message));
    setRemovePayment("");
    closeDeleteModal();
  }

  function resetFields() {
    setErrorMessage("");
    setPaymentValue("");
  }

  function isValidEntrances() {
    return !isEmpty(paymentValue) && !isEmpty(paymentFormat);
  }

  function addNewPayment() {
    if (isValidEntrances()) {
      addPaymentRequest(pathname.id, paymentValue, paymentFormat)
        .then((_) => {
          getFinanceBudgetList();
          resetFields();
          getToBePaid();
        })
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function handlePaymentValueChange(event) {
    setPaymentValue(event.target.value);
  }

  function handlePaymentFormatChange(event) {
    setPaymentFormat(paymentFormatList[event.target.selectedIndex - 1]);
  }

  return (
    <div className="text-center">
      <div className="div-title">
        <p className="page-title">Pagamento do {client}</p>
        <p>
          Moto {bikeNameAndBrand}, Placa {plate}
        </p>
        <p className="font-size-20">
          <span>Valor Total R$ {totalValue}</span>
          <span className="magin-left-30">
            Resta à Pagar R${" "}
            <span className="red-color-toBePaid">{toBePaid}</span>
          </span>
        </p>
      </div>
      <div>
        <p className="mb-0 mt-3 font-size-20">Valor:*</p>
        <input
          type="number"
          required
          value={paymentValue}
          onChange={handlePaymentValueChange}
        />
        <p className="mb-0 mt-3 font-size-20">Forma de Pagamento:*</p>
        <select
          value={paymentFormat.type}
          className="select-width mb-3"
          onChange={handlePaymentFormatChange}
        >
          <option key="blankChoice" hidden value="">
            Selecione...
          </option>
          {paymentFormatList.map(({ id, type }) => {
            return (
              <option key={id} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <br />
        <button
          className="btn btn-outline-primary mb-4"
          onClick={addNewPayment}
        >
          Enviar Pagamento
        </button>
        <p className="text-danger font-size-18">{errorMessage}</p>
      </div>

      <div className="align-center">
        <Table className="table-preferences">
          <thead>
            <tr>
              <th>Data de Pagamento</th>
              <th>Forma</th>
              <th>Valor</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {financeBudgetList.map(({ id, value, paymentFormat, paidAt }) => (
              <tr key={id}>
                <td>{getFormmatedDate(paidAt)}</td>
                <td>{paymentFormat.type}</td>
                <td>R$ {value}</td>
                <td>
                  <DeleteIcon
                    className="default-remove-icon"
                    onClick={() => openDeleteModal(id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <button className="btn btn-primary mt-3" onClick={gotoBackPage}>
        Voltar
      </button>
      <DeleteModal
        show={deleteModal}
        close={closeDeleteModal}
        title={"Excluir o pagamento?"}
        remove={deletePayment}
      />
    </div>
  );
}
export default FinancePayPage;
