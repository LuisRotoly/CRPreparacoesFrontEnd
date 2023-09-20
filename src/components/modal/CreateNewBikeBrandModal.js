import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function CreateNewBikeBrandModal(props) {
  const { addNewBikeBrand } = props;
  const [brand, setBrand] = useState("");

  function handleBikeBrandNameChange(event) {
    setBrand(event.target.value);
  }

  function addBikeBrand() {
    addNewBikeBrand(brand);
    resetFields();
  }

  function resetFields() {
    setBrand("");
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar uma marca de moto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0 mt-3 font-size-20">Escreva a marca:</p>
            <input
              type="text"
              maxLength="100"
              value={brand}
              onChange={handleBikeBrandNameChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={addBikeBrand}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}
export default CreateNewBikeBrandModal;
