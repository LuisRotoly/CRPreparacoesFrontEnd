import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editBikePartRequest,
  getBikePartByIdRequest,
} from "../../services/bikePartService";
import { isEmpty } from "../../stringHelper";
import "./bikePart.css";
import DeleteModal from "../../components/modal/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBikeModal from "../../components/modal/AddBikeModal";

function EditBikePartPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bikeList, setBikeList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeBike, setRemoveBike] = useState("");
  const [addBikeModal, setAddBikeModal] = useState(false);

  useEffect(() => {
    getBikePartByIdRequest(pathname.id).then((response) => {
      setName(response.data.name);
      setValue(response.data.value);
      setProfitPercentage(response.data.profitPercentage);
      setFinalValue(response.data.finalValue);
      setBikeList(response.data.bikeList);
    });
  }, [pathname.id]);

  function handleProfitPercentageChange(event) {
    setProfitPercentage(event.target.value);
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function isValidEntrances() {
    return (
      !isEmpty(name) &&
      !isEmpty(value) &&
      !isEmpty(profitPercentage) &&
      bikeList.length !== 0
    );
  }

  function editBikePart() {
    if (isValidEntrances()) {
      editBikePartRequest(pathname.id, name, value, profitPercentage, bikeList)
        .then((_) => setSuccessMessage("Peça editada com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/part");
  }

  function calculateProfit() {
    let finalValue =
      parseFloat(value) +
      (parseFloat(value) * parseFloat(profitPercentage)) / 100;
    setFinalValue(finalValue);
  }

  function openDeleteModal(index) {
    setRemoveBike(index);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
  }

  function deleteBike() {
    const reducedArray = [...bikeList];
    reducedArray.splice(removeBike, 1);
    setBikeList(reducedArray);
    closeDeleteModal();
  }

  function openModalAddBike() {
    setAddBikeModal(true);
  }

  function closeModalAddBike() {
    setAddBikeModal(false);
  }

  function addBike(bike) {
    setBikeList((oldList) => [...oldList, bike]);
    closeModalAddBike();
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
            maxLength="14"
            value={value}
            onChange={handleValueChange}
          />
          <p className="mb-0 mt-3 font-size-20">Margem de lucro*:</p>
          <input
            type="number"
            required
            maxLength="14"
            value={profitPercentage}
            onChange={handleProfitPercentageChange}
          />
          <br />
          <button className="btn btn-primary mt-2" onClick={calculateProfit}>
            Calcular Porcentagem
          </button>
          <p className="mb-0 mt-3 font-size-20">Valor final:</p>
          <input type="number" disabled value={finalValue} />
          <div>
            {bikeList.map(
              ({ name, bikeBrand, engineCapacity, year }, index) => {
                return (
                  <div key={index} className="align-center mt-3">
                    <div className="bike-container">
                      <DeleteIcon
                        className="remove-icon"
                        onClick={() => openDeleteModal(index)}
                      />
                      <p className="mt-3">
                        {name} {engineCapacity}
                      </p>
                      <p className="mt-3">
                        {bikeBrand.name}, {year}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
            <button className="btn btn-info mt-3" onClick={openModalAddBike}>
              Adicionar Moto
            </button>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={editBikePart}>
              Editar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
      <AddBikeModal
        show={addBikeModal}
        close={closeModalAddBike}
        addBike={addBike}
      />
      <DeleteModal
        show={deleteModal}
        close={closeDeleteModal}
        title={"Excluir a moto?"}
        remove={deleteBike}
      />
    </div>
  );
}
export default EditBikePartPage;
