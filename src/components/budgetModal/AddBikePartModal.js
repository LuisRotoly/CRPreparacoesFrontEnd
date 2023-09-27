import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { isEmpty } from "../../stringHelper";

function AddBikePartModal(props) {
  const { addBikePartToBudget } = props;
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleNameChange(event) {
    setValue(props.bikePartList[event.target.selectedIndex - 1].value);
    setName(event.target.value);
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(name) && !isEmpty(value) && !isEmpty(quantity);
  }

  function addBikePart() {
    if (isValidEntrances()) {
      addBikePartToBudget(name, quantity, value);
      resetFields();
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function resetFields() {
    setName("");
    setValue("");
    setQuantity(1);
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar uma peça</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0 mt-3 font-size-20">Nome*:</p>
            <select
              defaultValue=""
              className="select-width"
              onChange={handleNameChange}
            >
              <option key="blankChoice" hidden value="">
                Selecione...
              </option>
              {props.bikePartList.map(({ id, name }) => {
                return (
                  <option key={id} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
            <p className="mb-0 mt-3 font-size-20">Quantidade*:</p>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <p className="mb-0 mt-3 font-size-20">Valor de cada peça*:</p>
            <input type="number" value={value} onChange={handleValueChange} />
            <br />
            <p className="text-danger font-size-18">{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={addBikePart}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}
export default AddBikePartModal;
