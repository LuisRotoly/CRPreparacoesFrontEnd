import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import {
  addBikeBrandRequest,
  getBikeBrandListRequest,
} from "../../services/bikeBrandService";
import CreateNewBikeBrandModal from "./CreateNewBikeBrandModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProperties } from "../../constants";
import { addBikeRequest } from "../../services/bikeService";
import { isEmpty } from "../../stringHelper";

function AddNewBikeModal(props) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [modalNewBrand, setModalNewBrand] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getBikeBrandList();
  }, []);

  function getBikeBrandList() {
    getBikeBrandListRequest().then((response) => {
      setBrandList(response.data);
    });
  }

  function handleBrandChange(event) {
    brandList.forEach((element) => {
      if (event.target.value === element.name) {
        setBrand(element);
      }
    });
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(name) && !isEmpty(brand);
  }

  function createBike() {
    if (isValidEntrances()) {
      addBikeRequest(name, brand.id)
        .then((_) => props.close())
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function showNewBikeBrandModal() {
    setModalNewBrand(true);
  }

  function closeModal() {
    setModalNewBrand(false);
  }

  function createNewBikeBrand(name) {
    addBikeBrandRequest(name)
      .then((_) => {
        getBikeBrandList();
        toast.success("Marca criada com sucesso!", toastProperties);
      })
      .catch((e) => setErrorMessage(e.response.data.message));
    closeModal();
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar uma nova moto</Modal.Title>
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
              <p className="mb-0 mt-3 font-size-20">Marca:*</p>
              <select
                defaultValue=""
                className="select-width"
                onChange={handleBrandChange}
              >
                <option key="blankChoice" hidden value="">
                  Selecione...
                </option>
                {brandList.map(({ id, name }) => {
                  return (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
              <br />
              <button
                className="btn btn-primary ml-3"
                onClick={showNewBikeBrandModal}
              >
                Criar Nova Marca
              </button>
              <p className="text-danger font-size-18">{errorMessage}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={createBike}>
              Criar
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <CreateNewBikeBrandModal
        show={modalNewBrand}
        close={closeModal}
        addNewBikeBrand={createNewBikeBrand}
      />
      <ToastContainer />
    </div>
  );
}
export default AddNewBikeModal;
