import Modal from "react-bootstrap/Modal";

function CostModal(props) {
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Body className="text-center">
        <span>R$ {props.cost}</span>
      </Modal.Body>
    </Modal>
  );
}
export default CostModal;
