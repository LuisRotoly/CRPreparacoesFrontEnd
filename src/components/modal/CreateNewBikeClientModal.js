import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { getBikeListRequest } from "../../services/bikeService";
import InputMask from "react-input-mask";
import Select from "react-select";

function CreateNewBikeClientModal(props) {
  const { addClientBike } = props;
  const [plate, setPlate] = useState("");
  const [bike, setBike] = useState("");
  const [bikeList, setBikeList] = useState([]);

  useEffect(() => {
    getBikeListRequest().then((response) => {
      setBikeList(response.data);
    });
  }, []);

  function handlePlateChange(event) {
    setPlate(event.target.value);
  }

  function addNewPlate() {
    addClientBike(plate, bike);
    resetFields();
  }

  function resetFields() {
    setPlate("");
    setBike("");
  }

  function handleBikeChange(event) {
    setBike(event);
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
                option.name +
                ", " +
                option.bikeBrand.name +
                ", " +
                option.engineCapacity +
                ", " +
                option.year
              }
              onChange={handleBikeChange}
              options={bikeList}
              getOptionValue={(option) => option.name}
              placeholder={"Selecione..."}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={addNewPlate}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}
export default CreateNewBikeClientModal;
