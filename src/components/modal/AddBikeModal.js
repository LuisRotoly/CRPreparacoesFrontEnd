import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { getBikeListRequest } from "../../services/bikeService";

function AddBikeModal(props) {
  const { addBike } = props;
  const [bike, setBike] = useState("");
  const [bikeList, setBikeList] = useState([]);

  useEffect(() => {
    getBikeListRequest().then((response) => {
      setBikeList(response.data);
    });
  }, []);

  function addNewBike() {
    addBike(bike);
    resetFields();
  }

  function resetFields() {
    setBike("");
  }

  function handleBikeChange(event) {
    setBike(bikeList[event.target.selectedIndex - 1]);
  }

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar uma nova moto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            <Button variant="primary" onClick={addNewBike}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}
export default AddBikeModal;
