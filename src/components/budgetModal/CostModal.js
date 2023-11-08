import Modal from "react-bootstrap/Modal";

function CostModal(props) {
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Body className="text-center">
        <span>R$ {parseFloat(props.cost).toFixed(2)}</span>
      </Modal.Body>
    </Modal>
  );
}
export default CostModal;
