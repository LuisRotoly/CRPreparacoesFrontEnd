import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  editSupplierRequest,
  getSupplierByIdRequest,
} from "../../services/supplierService";
import { isEmpty } from "../../stringHelper";

function EditSupplierPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getSupplierByIdRequest(pathname.id).then((response) => {
      setName(response.data.name);
      setPhone(response.data.phone);
      setNotes(response.data.notes);
    });
  }, [pathname.id]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(name) && !isEmpty(phone);
  }

  function editSupplier() {
    if (isValidEntrances()) {
      editSupplierRequest(pathname.id, name, phone, notes)
        .then((_) => setSuccessMessage("Fornecedor editado com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/supplier");
  }

  return (
    <div className="text-center mt-5">
      {successMessage !== "" ? (
        <div>
          <p className="text-success font-size-18">{successMessage}</p>
          <div className="text-center">
            <button className="btn btn-primary" onClick={gotoBackPage}>
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-0 mt-3 font-size-20">Nome*:</p>
          <input
            maxLength="100"
            type="text"
            required
            value={name}
            onChange={handleNameChange}
          />
          <p className="mb-0 mt-3 font-size-20">Telefone*:</p>
          <input
            required
            maxLength="14"
            type="text"
            value={phone}
            onChange={handlePhoneChange}
          />
          <p className="mb-0 mt-3 font-size-20">Observações:</p>
          <textarea
            className="text-area-size"
            type="text"
            maxLength="255"
            value={notes}
            onChange={handleNotesChange}
          />
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={editSupplier}>
              Editar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
export default EditSupplierPage;