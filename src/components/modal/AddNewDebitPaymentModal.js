import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { isEmpty } from "../../stringHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProperties } from "../../constants";
import { getPaymentFormatListRequest } from "../../services/paymentFormatService";
import { addDebitPaymentRequest } from "../../services/debitPaymentService";

function AddNewDebitPaymentModal(props) {
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentFormat, setPaymentFormat] = useState("");
  const [paymentFormatList, setPaymentFormatList] = useState([]);
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getPaymentFormatListRequest().then((response) => {
      setPaymentFormatList(response.data);
    });
  }, []);

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handlePaymentFormatChange(event) {
    setPaymentFormat(paymentFormatList[event.target.selectedIndex - 1]);
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(description) && !isEmpty(value) && !isEmpty(paymentFormat);
  }

  function addNewDebitPaymentService() {
    if (isValidEntrances()) {
      addDebitPaymentRequest(description, notes, value, paymentFormat)
        .then((_) => {
          toast.success("Valor adicionado com sucesso!", toastProperties);
          resetFields();
          props.close();
        })
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function resetFields() {
    setDescription("");
    setNotes("");
    setPaymentFormat("");
    setValue("");
    setErrorMessage("");
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar um novo crédito/débito</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p className="mb-0 mt-3 font-size-20">Descrição:*</p>
              <input
                maxLength="50"
                type="text"
                required
                value={description}
                onChange={handleDescriptionChange}
              />
              <p className="mb-0 mt-3 font-size-20">Observação:</p>
              <input
                maxLength="100"
                type="text"
                value={notes}
                onChange={handleNotesChange}
              />
              <p className="mb-0 mt-3 font-size-20">Forma de Pagamento:*</p>
              <select
                defaultValue=""
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
              <br />
              <p className="mb-0 mt-3 font-size-20">Valor:*</p>
              <input
                type="number"
                required
                value={value}
                onChange={handleValueChange}
              />
              <p className="text-danger font-size-18">{errorMessage}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Voltar
            </Button>
            <Button variant="primary" onClick={addNewDebitPaymentService}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <ToastContainer />
    </div>
  );
}
export default AddNewDebitPaymentModal;
