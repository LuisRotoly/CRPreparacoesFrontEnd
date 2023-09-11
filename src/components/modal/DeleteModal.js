import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModal(props) {
  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Excluir o carro?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja excluir?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={props.remove}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}
export default DeleteModal;
