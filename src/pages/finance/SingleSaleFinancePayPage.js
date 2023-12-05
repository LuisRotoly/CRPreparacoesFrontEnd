import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
  getSingleSaleFinanceByIdRequest,
  getSingleSalePaymentsListByIdRequest,
  removeSingleSalePaymentByIdRequest,
  addSingleSalePaymentRequest,
  getSingleSaleToBePaidRequest,
} from "../../services/financeService";
import DeleteModal from "../../components/modal/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPaymentFormatListRequest } from "../../services/paymentFormatService";
import { getFormmatedDate, isEmpty } from "../../stringHelper";

function SingleSaleFinancePayPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState("");
  const [singleSaleFinanceList, setSingleSaleFinanceList] = useState([]);
  const [totalValue, setTotalValue] = useState("");
  const [toBePaid, setToBePaid] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [removePayment, setRemovePayment] = useState("");
  const [paymentFormatList, setPaymentFormatList] = useState([]);
  const [paymentFormat, setPaymentFormat] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    getSingleSaleFinanceByIdRequest(pathname.id).then((response) => {
      setClient(response.data.clientName);
      setTotalValue(response.data.totalValue);
      setToBePaid(response.data.toBePaid);
      setSingleSaleFinanceList(response.data.singleSaleFinanceList);
    });
    getPaymentFormatListRequest().then((response) =>
      setPaymentFormatList(response.data)
    );
  }, [pathname.id]);

  function getSingleSaleFinanceList() {
    getSingleSalePaymentsListByIdRequest(pathname.id).then((response) => {
      setSingleSaleFinanceList(response.data);
      console.log(response.data);
    });
  }

  function getToBePaid() {
    getSingleSaleToBePaidRequest(pathname.id).then((response) =>
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
    removeSingleSalePaymentByIdRequest(removePayment)
      .then(() => {
        getSingleSaleFinanceList();
        getToBePaid();
      })
      .catch((e) => setErrorMessage(e.response.data.message));
    setRemovePayment("");
    closeDeleteModal();
  }

  function resetFields() {
    setErrorMessage("");
    setPaymentValue("");
    setNotes("");
  }

  function isValidEntrances() {
    return !isEmpty(paymentValue) && !isEmpty(paymentFormat);
  }

  function addNewPayment() {
    if (isValidEntrances()) {
      addSingleSalePaymentRequest(
        pathname.id,
        paymentValue,
        paymentFormat,
        notes
      )
        .then((_) => {
          getSingleSaleFinanceList();
          resetFields();
          getToBePaid();
        })
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
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
        <p className="font-size-20">
          <span>Valor Total R$ {parseFloat(totalValue).toFixed(2)}</span>
          <span className="magin-left-30">
            Resta à Pagar R${" "}
            <span className="red-color-toBePaid">
              {parseFloat(toBePaid).toFixed(2)}
            </span>
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
          className="select-width"
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
        <p className="mb-0 mt-3 font-size-20">Observações:</p>
        <input
          type="text"
          className="mb-3"
          value={notes}
          onChange={handleNotesChange}
        />
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
              <th>Observações</th>
              <th>Forma</th>
              <th>Valor</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {singleSaleFinanceList.map(
              ({ id, value, notes, paymentFormat, paidAt }) => (
                <tr key={id}>
                  <td>{getFormmatedDate(paidAt)}</td>
                  <td>{notes}</td>
                  <td>{paymentFormat.type}</td>
                  <td>R$ {value.toFixed(2)}</td>
                  <td>
                    <DeleteIcon
                      className="default-remove-icon"
                      onClick={() => openDeleteModal(id)}
                    />
                  </td>
                </tr>
              )
            )}
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
export default SingleSaleFinancePayPage;
