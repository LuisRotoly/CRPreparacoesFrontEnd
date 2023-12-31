import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { getBikeListRequest } from "../../services/bikeService";
import InputMask from "react-input-mask";
import Select from "react-select";
import AddNewBikeModal from "./AddNewBikeModal";

function CreateNewBikeClientModal(props) {
  const { addClientBike } = props;
  const [plate, setPlate] = useState("");
  const [bike, setBike] = useState("");
  const [year, setYear] = useState("");
  const [bikeList, setBikeList] = useState([]);
  const [addNewBikeModal, setAddNewBikeModal] = useState(false);

  useEffect(() => {
    getBikeList();
  }, []);

  function getBikeList() {
    getBikeListRequest().then((response) => {
      setBikeList(response.data);
    });
  }

  function handlePlateChange(event) {
    setPlate(event.target.value);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function addNewPlate() {
    addClientBike(plate, bike, year);
    resetFields();
  }

  function resetFields() {
    setPlate("");
    setBike("");
  }

  function handleBikeChange(event) {
    setBike(event);
  }

  function openAddNewBikeModal() {
    setAddNewBikeModal(true);
  }

  function closeAddNewBikeModal() {
    getBikeList();
    setAddNewBikeModal(false);
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar uma nova moto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0 mt-3 font-size-20">Escreva a placa:*</p>
            <InputMask
              type="text"
              required
              mask={"***-****"}
              maskChar=""
              value={plate}
              onChange={handlePlateChange}
            />
            <p className="mb-0 mt-3 font-size-20">Escolha a moto:*</p>
            <Select
              defaultValue=""
              getOptionLabel={(option) =>
                option.name + ", " + option.bikeBrand.name
              }
              onChange={handleBikeChange}
              options={bikeList}
              getOptionValue={(option) => option.name}
              placeholder={"Selecione..."}
            />
            <p className="mb-0 mt-3 font-size-20">Ano:</p>
            <InputMask
              mask="9999"
              maskChar=""
              type="text"
              value={year}
              onChange={handleYearChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={openAddNewBikeModal}>
              Criar nova moto
            </Button>
            <Button variant="secondary" onClick={props.close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={addNewPlate}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <AddNewBikeModal show={addNewBikeModal} close={closeAddNewBikeModal} />
    </div>
  );
}
export default CreateNewBikeClientModal;
