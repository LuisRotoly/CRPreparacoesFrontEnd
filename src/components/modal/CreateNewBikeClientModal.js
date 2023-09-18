import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { getBikeListRequest } from "../../services/bikeService";

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
    bikeList.forEach((element) => {
      if (event.target.value === element.name) {
        setBike(element);
      }
    });
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar uma nova moto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0 mt-3 font-size-20">Escreva a placa*:</p>
            <input
              type="text"
              maxLength="8"
              value={plate}
              onChange={handlePlateChange}
            />
            <p className="mb-0 mt-3 font-size-20">Escolha a moto*:</p>
            <select
              defaultValue=""
              className="select-width"
              onChange={handleBikeChange}
            >
              <option key="blankChoice" hidden value="">
                Selecione...
              </option>
              {bikeList.map(({ id, name, bikeBrand, engineCapacity, year }) => {
                return (
                  <option key={id} value={name}>
                    {name}, {bikeBrand.name}, {engineCapacity}, {year}
                  </option>
                );
              })}
            </select>
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
