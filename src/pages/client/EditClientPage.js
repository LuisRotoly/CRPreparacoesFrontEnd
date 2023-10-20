import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  editClientRequest,
  getClientByIdRequest,
} from "../../services/clientService";
import { getCepRequest } from "../../services/cepService";
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
  const [cep, setCep] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [optionalPhone, setOptionalPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [clientBikeList, setClientBikeList] = useState([]);
  const [plateModal, setPlateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeClientBike, setRemoveClientBike] = useState("");
  const [addressList, setAddressList] = useState("");
  const [cepError, setCepError] = useState("");

  useEffect(() => {
    getClientByIdRequest(pathname.id).then((response) => {
      setName(response.data.name);
      setCpfcnpj(response.data.cpfcnpj);
      setCep(response.data.cep);
      setAddressNumber(response.data.addressNumber);
      setBirthDate(response.data.birthDate);
      setPhone(response.data.phone);
      setOptionalPhone(response.data.optionalPhone);
      setNotes(response.data.notes);
      setNickname(response.data.nickname);
      getCep(response.data.cep);
    });
    listClientBikeById(pathname.id).then((response) =>
      setClientBikeList(response.data)
    );
  }, [pathname.id]);

  function handleOptionalPhoneChange(event) {
    setOptionalPhone(event.target.value);
  }

  function handleBirthDateChange(event) {
    setBirthDate(event.target.value);
  }

  function handleAddressNumberChange(event) {
    setAddressNumber(event.target.value);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handleCepChange(event) {
    if (isEmpty(event.target.value)) {
      setAddressList("");
      setAddressNumber("");
    }
    setCep(event.target.value);
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
        cep,
        addressNumber,
        birthDate,
        phone,
        optionalPhone,
        notes,
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

  function addClientBike(plate, bike, year) {
    const newClientBike = { plate, bike, year };
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

  function getCep(cep) {
    if (!isEmpty(cep) && cep.length === 9) {
      getCepRequest(cep).then((response) => {
        if (response.data.erro) {
          setCepError("CEP não encontrado!");
          setAddressList("");
          setAddressNumber("");
        } else {
          setAddressList(response.data);
          setCepError("");
        }
      });
    }
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
          <p className="mb-0 mt-3 font-size-20">Nome:*</p>
          <input
            maxLength="100"
            type="text"
            required
            value={name}
            onChange={handleNameChange}
          />
          <p className="mb-0 mt-3 font-size-20">CPF/CNPJ:*</p>
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
          <p className="mb-0 mt-3 font-size-20">CEP:</p>
          <InputMask
            mask={"99999-999"}
            maskChar=""
            type="text"
            value={cep}
            onChange={handleCepChange}
          />
          <br />
          <button className="btn btn-primary mt-2" onClick={() => getCep(cep)}>
            Pesquisar CEP
          </button>
          <p className="text-danger font-size-18">{cepError}</p>
          {!isEmpty(addressList) ? (
            <div>
              <p className="mb-0 mt-3 font-size-20">Rua:</p>
              <input type="text" value={addressList.logradouro} disabled />
              <p className="mb-0 mt-3 font-size-20">Número:</p>
              <input
                type="text"
                maxLength="6"
                defaultValue={addressNumber}
                onChange={handleAddressNumberChange}
              />
              <p className="mb-0 mt-3 font-size-20">Bairro:</p>
              <input type="text" value={addressList.bairro} disabled />
              <p className="mb-0 mt-3 font-size-20">Cidade:</p>
              <input type="text" value={addressList.localidade} disabled />
              <p className="mb-0 mt-3 font-size-20">Estado:</p>
              <input type="text" value={addressList.uf} disabled />
            </div>
          ) : null}
          <p className="mb-0 mt-3 font-size-20">Data de nascimento:</p>
          <InputMask
            mask={"99/99/99"}
            maskChar=""
            type="text"
            value={birthDate}
            onChange={handleBirthDateChange}
          />
          <p className="mb-0 mt-3 font-size-20">Telefone:*</p>
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
          <p className="mb-0 mt-3 font-size-20">Telefone opcional:</p>
          <InputMask
            mask={
              !isEmpty(optionalPhone) &&
              optionalPhone.length >= 5 &&
              optionalPhone[4] === "9"
                ? "(99)99999-9999"
                : "(99)9999-9999"
            }
            maskChar=""
            type="text"
            value={optionalPhone}
            onChange={handleOptionalPhoneChange}
          />
          <p className="mb-0 mt-3 font-size-20">Apelido:</p>
          <input
            type="text"
            maxLength="100"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <p className="mb-0 mt-3 font-size-20">Observações:</p>
          <textarea
            className="text-area-size"
            type="text"
            maxLength="255"
            defaultValue={notes}
            onChange={handleNotesChange}
          />
          <div>
            {clientBikeList.map(({ plate, bike, year }, index) => {
              return (
                <div key={index} className="align-center mt-3">
                  <div className="bike-client-container">
                    <DeleteIcon
                      className="remove-icon"
                      onClick={() => openDeleteModal(index)}
                    />
                    <p className="mt-3">{plate}</p>
                    <p className="mt-3">
                      {bike.bikeBrand.name}, {bike.name}, {year}
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
