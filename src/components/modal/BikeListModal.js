import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { getBikesByBikePartIdRequest } from "../../services/bikePartService";

function BikeListModal(props) {
  const [bikeList, setBikeList] = useState([]);

  useEffect(() => {
    getBikesByBikePartIdRequest(props.bikePartId).then((response) => {
      setBikeList(response.data);
    });
  }, [props.bikePartId]);

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Lista de motos compatíveis</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {bikeList.map(({ id, name, bikeBrand, engineCapacity, year }) => {
              return (
                <p key={id} className="mb-0 mt-3 font-size-20">
                  {bikeBrand.name}, {name}, {engineCapacity}, {year}
                </p>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={props.close}>
              Voltar
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}
export default BikeListModal;
