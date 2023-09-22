import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  editClientRequest,
  getClientByIdRequest,
} from "../../services/clientService";
import { isEmpty } from "../../stringHelper";
import { listClientBikeById } from "../../services/clientBikeService";
import CreateNewBikeClientModal from "../../components/modal/CreateNewBikeClientModal";
import "./client.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../components/modal/DeleteModal";
import InputMask from "react-input-mask";

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
  const [clientBikeList, setClientBikeList] = useState([]);
  const [plateModal, setPlateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeClientBike, setRemoveClientBike] = useState("");

  useEffect(() => {
    getClientByIdRequest(pathname.id).then((response) => {
      setName(response.data.name);
      setCpfcnpj(response.data.cpfcnpj);
      setAddress(response.data.address);
      setPhone(response.data.phone);
      setNickname(response.data.nickname);
    });
    listClientBikeById(pathname.id).then((response) =>
      setClientBikeList(response.data)
    );
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
      editClientRequest(
        pathname.id,
        name,
        cpfcnpj,
        address,
        phone,
        nickname,
        clientBikeList
      )
        .then((_) => setSuccessMessage("Cliente editado com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/client");
  }

  function openModalBikePlate() {
    setPlateModal(true);
  }

  function closeModalBikePlate() {
    setPlateModal(false);
  }

  function addClientBike(plate, bike) {
    const newClientBike = { plate, bike };
    setClientBikeList((oldList) => [...oldList, newClientBike]);
    closeModalBikePlate();
  }

  function openDeleteModal(index) {
    setRemoveClientBike(index);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
  }

  function deleteClientBike() {
    const reducedArray = [...clientBikeList];
    reducedArray.splice(removeClientBike, 1);
    setClientBikeList(reducedArray);
    closeDeleteModal();
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
          <p className="mb-0 mt-3 font-size-20">CPF/CNPJ*:</p>
          <InputMask
            type="text"
            required
            mask={
              cpfcnpj.length < 15 ? "999.999.999-999" : "99.999.999/9999-99"
            }
            maskChar=""
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
          <p className="mb-0 mt-3 font-size-20">Telefone*:</p>
          <InputMask
            required
            mask={
              phone.length >= 5 && phone[4] === "9"
                ? "(99)99999-9999"
                : "(99)9999-9999"
            }
            maskChar=""
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
          <div>
            {clientBikeList.map(({ plate, bike }, index) => {
              return (
                <div key={index} className="align-center mt-3">
                  <div className="bike-client-container">
                    <DeleteIcon
                      className="remove-icon"
                      onClick={() => openDeleteModal(index)}
                    />
                    <p className="mt-3">{plate}</p>
                    <p className="mt-3">
                      {bike.bikeBrand.name}, {bike.name}, {bike.engineCapacity}
                    </p>
                  </div>
                </div>
              );
            })}
            <button className="btn btn-info mt-3" onClick={openModalBikePlate}>
              Adicionar Moto
            </button>
          </div>
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
      <CreateNewBikeClientModal
        show={plateModal}
        close={closeModalBikePlate}
        addClientBike={addClientBike}
      />
      <DeleteModal
        show={deleteModal}
        close={closeDeleteModal}
        title={"Excluir a moto?"}
        remove={deleteClientBike}
      />
    </div>
  );
}
export default EditClientPage;
