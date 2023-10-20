import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { getClientByBudgetIdRequest } from "../../services/budgetService";
import { getCepRequest } from "../../services/cepService";

function ClientDataModal(props) {
  const [client, setClient] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    getClientByBudgetIdRequest(props.budgetId).then((response) => {
      setClient(response.data);
      getCepRequest(response.data.cep).then((cepResponse) =>
        setCep(cepResponse.data)
      );
    });
  }, [props.budgetId]);

  return (
    <div>
      {
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Dados do Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0 mt-3 font-size-20">
              {client.name}, {client.cpfcnpj}, {client.nickname}
            </p>
            <p className="mb-0 mt-3 font-size-20">{client.birthDate}</p>
            <p className="mb-0 mt-3 font-size-20">
              {client.phone}, {client.optionalPhone}
            </p>
            <p className="mb-0 mt-3 font-size-20">
              {cep.logradouro} {client.addressNumber}, {cep.bairro},{" "}
              {cep.localidade}-{cep.uf}
            </p>
            <p className="mb-0 mt-3 font-size-20">
              Observações: {client.notes}
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
export default ClientDataModal;
