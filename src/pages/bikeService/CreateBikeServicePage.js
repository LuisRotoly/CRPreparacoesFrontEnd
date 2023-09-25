import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../stringHelper";
import { addBikeServiceRequest } from "../../services/bikeServiceService";
import "react-toastify/dist/ReactToastify.css";

function CreateBikeServicePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(name) && !isEmpty(value);
  }

  function createBikeService() {
    if (isValidEntrances()) {
      addBikeServiceRequest(name, value)
        .then((_) => setSuccessMessage("Serviço criado com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/services");
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
          <p className="mb-0 mt-3 font-size-20">Valor*:</p>
          <input
            type="number"
            required
            value={value}
            onChange={handleValueChange}
          />
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={createBikeService}>
              Criar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
export default CreateBikeServicePage;
