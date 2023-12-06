import Modal from "react-bootstrap/Modal";
import { getFormmatedMoney } from "../../stringHelper";

function CostModal(props) {
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Body className="text-center">
        <span>R$ {getFormmatedMoney(props.cost)}</span>
      </Modal.Body>
    </Modal>
  );
}
export default CostModal;
