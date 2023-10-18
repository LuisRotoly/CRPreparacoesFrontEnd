import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { getBikeServiceListRequest } from "../../services/bikeServiceService";
import { isEmpty } from "../../stringHelper";
import AddNewBikeServiceModal from "../modal/AddNewBikeServiceModal";

function AddBikeServiceModal(props) {
  const { addBikeServiceToBudget } = props;
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("");
  const [bikeServiceList, setBikeServiceList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [addNewBikeServiceModal, setAddNewBikeServiceModal] = useState(false);

  useEffect(() => {
    getBikeServiceList();
  }, []);

  function getBikeServiceList() {
    getBikeServiceListRequest().then((response) =>
      setBikeServiceList(response.data)
    );
  }

  function handleNameChange(event) {
    setName(event.target.value);
    setValue(bikeServiceList[event.target.selectedIndex - 1].value);
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

  function addBikeService() {
    if (isValidEntrances()) {
      addBikeServiceToBudget(name, quantity, value);
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

  function openAddNewBikeServiceModal() {
    setAddNewBikeServiceModal(true);
  }

  function closeAddNewBikeServiceModal() {
    getBikeServiceList();
    setAddNewBikeServiceModal(false);
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar um serviço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0 mt-3 font-size-20">Nome:*</p>
            <select
              defaultValue=""
              className="select-width"
              onChange={handleNameChange}
            >
              <option key="blankChoice" hidden value="">
                Selecione...
              </option>
              {bikeServiceList.map(({ id, name }) => {
                return (
                  <option key={id} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
            <p className="mb-0 mt-3 font-size-20">Quantidade:*</p>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <p className="mb-0 mt-3 font-size-20">Valor de cada serviço:*</p>
            <input type="number" value={value} onChange={handleValueChange} />
            <br />
            <p className="text-danger font-size-18">{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={openAddNewBikeServiceModal}>
              Criar novo serviço
            </Button>
            <Button variant="secondary" onClick={props.close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={addBikeService}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <AddNewBikeServiceModal
        show={addNewBikeServiceModal}
        close={closeAddNewBikeServiceModal}
      />
    </div>
  );
}
export default AddBikeServiceModal;
