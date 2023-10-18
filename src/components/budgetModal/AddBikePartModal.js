import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { isEmpty } from "../../stringHelper";
import AddNewBikePartModal from "../modal/AddNewBikePartModal";
import Select from "react-select";

function AddBikePartModal(props) {
  const { addBikePartToBudget } = props;
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addNewBikePartModal, setAddNewBikePartModal] = useState(false);

  function handleNameChange(event) {
    let finalValue =
      parseFloat(event.value) +
      (parseFloat(event.value) * parseFloat(event.profitPercentage)) / 100;
    setValue(finalValue);
    setName(event.name);
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

  function openAddNewBikePartModal() {
    setAddNewBikePartModal(true);
  }

  function closeAddNewBikePartModal() {
    props.getBikePartList();
    setAddNewBikePartModal(false);
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar uma peça</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0 mt-3 font-size-20">Nome:*</p>
            <Select
              defaultValue=""
              getOptionLabel={(option) => option.name}
              onChange={handleNameChange}
              options={props.bikePartList}
              getOptionValue={(option) => option.name}
              placeholder={"Selecione..."}
            />
            <p className="mb-0 mt-3 font-size-20">Quantidade:*</p>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <p className="mb-0 mt-3 font-size-20">Valor de cada peça:*</p>
            <input type="number" value={value} onChange={handleValueChange} />
            <br />
            <p className="text-danger font-size-18">{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={openAddNewBikePartModal}>
              Criar nova peça
            </Button>
            <Button variant="secondary" onClick={props.close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={addBikePart}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <AddNewBikePartModal
        show={addNewBikePartModal}
        close={closeAddNewBikePartModal}
      />
    </div>
  );
}
export default AddBikePartModal;
