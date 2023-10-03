import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function BikeDataModal(props) {
  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Dados da Moto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0 mt-3 font-size-20">
              {props.bike.bikeBrandName} {props.bike.bikeName},{" "}
              {props.bike.engineCapacity}cv - {props.bike.year}
            </p>
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
export default BikeDataModal;
