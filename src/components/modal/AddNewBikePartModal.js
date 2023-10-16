import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { isEmpty } from "../../stringHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBikeModal from "./AddBikeModal";
import DeleteModal from "./DeleteModal";
import { addBikePartRequest } from "../../services/bikePartService";
import DeleteIcon from "@mui/icons-material/Delete";

function AddNewBikePartModal(props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bikeList, setBikeList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeBike, setRemoveBike] = useState("");
  const [addBikeModal, setAddBikeModal] = useState(false);

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
      !isEmpty(stockQuantity) &&
      bikeList.length !== 0
    );
  }

  function createBikePart() {
    if (isValidEntrances()) {
      addBikePartRequest(name, value, profitPercentage, stockQuantity, bikeList)
        .then((_) => {
          toast.success("Peça criada com sucesso!", {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          setName("");
          setValue("");
          setProfitPercentage("");
          setFinalValue("");
          setStockQuantity("");
          props.close();
        })
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function calculateProfit() {
    let finalValue =
      parseFloat(value) +
      (parseFloat(value) * parseFloat(profitPercentage)) / 100;
    setFinalValue(finalValue);
  }

  function openDeleteModal(index) {
    setRemoveBike(index);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
  }

  function deleteBike() {
    const reducedArray = [...bikeList];
    reducedArray.splice(removeBike, 1);
    setBikeList(reducedArray);
    closeDeleteModal();
  }

  function openModalAddBike() {
    setAddBikeModal(true);
  }

  function closeModalAddBike() {
    setAddBikeModal(false);
  }

  function addBike(bike) {
    setBikeList((oldList) => [...oldList, bike]);
    closeModalAddBike();
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
              <p className="mb-0 mt-3 font-size-20">Nome*:</p>
              <input
                maxLength="100"
                type="text"
                required
                value={name}
                onChange={handleNameChange}
              />
              <p className="mb-0 mt-3 font-size-20">Valor*:</p>
              <input
                type="number"
                required
                maxLength="14"
                value={value}
                onChange={handleValueChange}
              />
              <p className="mb-0 mt-3 font-size-20">Margem de lucro*:</p>
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
              <p className="mb-0 mt-3 font-size-20">Quantidade em estoque*:</p>
              <input
                type="number"
                maxLength="10"
                value={stockQuantity}
                onChange={handleStockQuantityChange}
              />
              <div>
                {bikeList.map(
                  ({ name, bikeBrand, engineCapacity, year }, index) => {
                    return (
                      <div key={index} className="align-center mt-3">
                        <div className="bike-container">
                          <DeleteIcon
                            className="remove-icon"
                            onClick={() => openDeleteModal(index)}
                          />
                          <p className="mt-3">
                            {name} {engineCapacity}
                          </p>
                          <p className="mt-3">
                            {bikeBrand.name}, {year}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
                <button
                  className="btn btn-info mt-3"
                  onClick={openModalAddBike}
                >
                  Adicionar Moto
                </button>
                <p className="text-danger font-size-18">{errorMessage}</p>
              </div>
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
      <AddBikeModal
        show={addBikeModal}
        close={closeModalAddBike}
        addBike={addBike}
      />
      <DeleteModal
        show={deleteModal}
        close={closeDeleteModal}
        title={"Excluir a moto?"}
        remove={deleteBike}
      />
      <ToastContainer />
    </div>
  );
}
export default AddNewBikePartModal;
