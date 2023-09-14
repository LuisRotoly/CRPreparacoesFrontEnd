import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  editClientRequest,
  getClientByIdRequest,
} from "../../services/clientService";
import { isEmpty } from "../../stringHelper";

function EditClientPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cpfcnpj, setCpfcnpj] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getClientByIdRequest(pathname.id).then((response) => {
      setName(response.data.name);
      setCpfcnpj(response.data.cpfcnpj);
      setAddress(response.data.address);
      setPhone(response.data.phone);
      setNickname(response.data.nickname);
    });
  }, [pathname.id]);

  function handleAddressChange(event) {
    setAddress(event.target.value);
  }

  function handleCpfcnpjChange(event) {
    setCpfcnpj(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleNicknameChange(event) {
    setNickname(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(name) && !isEmpty(phone) && !isEmpty(cpfcnpj);
  }

  function editClient() {
    if (isValidEntrances()) {
      editClientRequest(pathname.id, name, cpfcnpj, address, phone, nickname)
        .then((_) => setSuccessMessage("Cliente editado com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/client");
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
          <p className="mb-0 mt-3 font-size-20">Nome:</p>
          <input
            maxLength="100"
            type="text"
            required
            value={name}
            onChange={handleNameChange}
          />
          <p className="mb-0 mt-3 font-size-20">CPF/CNPJ:</p>
          <input
            type="text"
            required
            maxLength="18"
            value={cpfcnpj}
            onChange={handleCpfcnpjChange}
          />
          <p className="mb-0 mt-3 font-size-20">Endereço:</p>
          <input
            type="text"
            maxLength="150"
            value={address}
            onChange={handleAddressChange}
          />
          <p className="mb-0 mt-3 font-size-20">Telefone:</p>
          <input
            required
            maxLength="14"
            type="text"
            value={phone}
            onChange={handlePhoneChange}
          />
          <p className="mb-0 mt-3 font-size-20">Apelido:</p>
          <input
            type="text"
            maxLength="100"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={editClient}>
              Editar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
export default EditClientPage;
