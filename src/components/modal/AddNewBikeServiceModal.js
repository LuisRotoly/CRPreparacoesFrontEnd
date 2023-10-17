import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { isEmpty } from "../../stringHelper";
import { addBikeServiceRequest } from "../../services/bikeServiceService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProperties } from "../../constants";

function AddNewBikeServiceModal(props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(name) && !isEmpty(value);
  }

  function createBikeService() {
    if (isValidEntrances()) {
      addBikeServiceRequest(name, value)
        .then((_) => {
          toast.success("Serviço criado com sucesso!", toastProperties);
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
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Criar um novo serviço</Modal.Title>
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
            <Button variant="primary" onClick={createBikeService}>
              Criar
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <ToastContainer />
    </div>
  );
}
export default AddNewBikeServiceModal;
