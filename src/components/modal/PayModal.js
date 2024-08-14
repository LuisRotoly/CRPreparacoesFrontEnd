import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function PayModal(props) {
  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Marcar/Desmarcar Pagamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja continuar com essa ação?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Não
            </Button>
            <Button variant="danger" onClick={props.pay}>
              Sim
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}
export default PayModal;
