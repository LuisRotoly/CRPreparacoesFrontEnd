import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { isEmpty } from "../../stringHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBikePartRequest } from "../../services/bikePartService";
import { toastProperties } from "../../constants";

function AddNewBikePartModal(props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleProfitPercentageChange(event) {
    setProfitPercentage(event.target.value);
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleStockQuantityChange(event) {
    setStockQuantity(event.target.value);
  }

  function isValidEntrances() {
    return (
      !isEmpty(name) &&
      !isEmpty(value) &&
      !isEmpty(profitPercentage) &&
      !isEmpty(stockQuantity)
    );
  }

  function createBikePart() {
    if (isValidEntrances()) {
      addBikePartRequest(name, value, profitPercentage, stockQuantity)
        .then((_) => {
          toast.success("Peça criada com sucesso!", toastProperties);
          resetFields();
          props.close();
        })
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function resetFields() {
    setName("");
    setValue("");
    setProfitPercentage("");
    setFinalValue("");
    setStockQuantity("");
  }

  function calculateProfit() {
    let finalValue =
      parseFloat(value) +
      (parseFloat(value) * parseFloat(profitPercentage)) / 100;
    setFinalValue(finalValue);
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Criar uma nova peça</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p className="mb-0 mt-3 font-size-20">Nome:*</p>
              <input
                maxLength="100"
                type="text"
                required
                value={name}
                onChange={handleNameChange}
              />
              <p className="mb-0 mt-3 font-size-20">Valor:*</p>
              <input
                type="number"
                required
                maxLength="14"
                value={value}
                onChange={handleValueChange}
              />
              <p className="mb-0 mt-3 font-size-20">Margem de lucro:*</p>
              <input
                type="number"
                required
                maxLength="14"
                value={profitPercentage}
                onChange={handleProfitPercentageChange}
              />
              <br />
              <button
                className="btn btn-primary mt-2"
                onClick={calculateProfit}
              >
                Calcular Porcentagem
              </button>
              {finalValue === "" ? null : (
                <div>
                  <p className="mb-0 mt-3 font-size-20">Valor final:</p>
                  <input type="number" disabled value={finalValue} />
                </div>
              )}
              <p className="mb-0 mt-3 font-size-20">Quantidade em estoque:*</p>
              <input
                type="number"
                maxLength="10"
                value={stockQuantity}
                onChange={handleStockQuantityChange}
              />
              <p className="text-danger font-size-18">{errorMessage}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Voltar
            </Button>
            <Button variant="primary" onClick={createBikePart}>
              Criar
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <ToastContainer />
    </div>
  );
}
export default AddNewBikePartModal;
