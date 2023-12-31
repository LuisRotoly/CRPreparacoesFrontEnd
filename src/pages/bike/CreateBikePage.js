import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBikeRequest } from "../../services/bikeService";
import { isEmpty } from "../../stringHelper";
import {
  addBikeBrandRequest,
  getBikeBrandListRequest,
} from "../../services/bikeBrandService";
import CreateNewBikeBrandModal from "../../components/modal/CreateNewBikeBrandModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProperties } from "../../constants";

function CreateBikePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [modalNewBrand, setModalNewBrand] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getBikeBrandList();
  }, []);

  function getBikeBrandList() {
    getBikeBrandListRequest().then((response) => {
      setBrandList(response.data);
    });
  }

  function handleBrandChange(event) {
    brandList.forEach((element) => {
      if (event.target.value === element.name) {
        setBrand(element);
      }
    });
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(name) && !isEmpty(brand);
  }

  function createBike() {
    if (isValidEntrances()) {
      addBikeRequest(name, brand.id)
        .then((_) => setSuccessMessage("Moto criada com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/bike");
  }

  function showNewBikeBrandModal() {
    setModalNewBrand(true);
  }

  function closeModal() {
    setModalNewBrand(false);
  }

  function createNewBikeBrand(name) {
    addBikeBrandRequest(name)
      .then((_) => {
        getBikeBrandList();
        toast.success("Marca criada com sucesso!", toastProperties);
      })
      .catch((e) => setErrorMessage(e.response.data.message));
    closeModal();
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
          <p className="mb-0 mt-3 font-size-20">Marca:*</p>
          <select
            defaultValue=""
            className="select-width"
            onChange={handleBrandChange}
          >
            <option key="blankChoice" hidden value="">
              Selecione...
            </option>
            {brandList.map(({ id, name }) => {
              return (
                <option key={id} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          <br />
          <button
            className="btn btn-primary ml-3"
            onClick={showNewBikeBrandModal}
          >
            Criar Nova Marca
          </button>
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={createBike}>
              Criar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
      <CreateNewBikeBrandModal
        show={modalNewBrand}
        close={closeModal}
        addNewBikeBrand={createNewBikeBrand}
      />
      <ToastContainer />
    </div>
  );
}
export default CreateBikePage;
