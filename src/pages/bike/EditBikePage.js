import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editBikeRequest,
  getBikeByIdRequest,
} from "../../services/bikeService";
import { isEmpty } from "../../stringHelper";
import { getBikeBrandListRequest } from "../../services/bikeBrandService";

function EditBikePage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState([]);
  const [engineCapacity, setEngineCapacity] = useState("");
  const [year, setYear] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getBikeByIdRequest(pathname.id).then((response) => {
      setName(response.data.name);
      setBrand(response.data.bikeBrand);
      setEngineCapacity(response.data.engineCapacity);
      setYear(response.data.year);
    });
    getBikeBrandList();
  }, [pathname.id]);

  function getBikeBrandList() {
    getBikeBrandListRequest().then((response) => {
      setBrandList(response.data);
    });
  }

  function handleBrandChange(event) {
    for (let i = 0; i < brandList.length; i++) {
      if (event.target.value === brandList[i].name) {
        setBrand(brandList[i]);
      }
    }
  }

  function handleEngineCapacityChange(event) {
    setEngineCapacity(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(name) && !isEmpty(brand);
  }

  function editBike() {
    if (isValidEntrances()) {
      editBikeRequest(pathname.id, name, brand.id, engineCapacity, year)
        .then((_) => setSuccessMessage("Moto editada com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/bike");
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
          <p className="mb-0 mt-3 font-size-20">Marca*:</p>
          <select
            value={brand.id}
            className="select-width"
            onChange={handleBrandChange}
          >
            <option key={brand.id} hidden value={brand.name}>
              {brand.name}
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
          <p className="mb-0 mt-3 font-size-20">Cilindrada:</p>
          <input
            type="text"
            maxLength="10"
            value={engineCapacity}
            onChange={handleEngineCapacityChange}
          />
          <p className="mb-0 mt-3 font-size-20">Ano:</p>
          <input
            maxLength="9"
            type="text"
            value={year}
            onChange={handleYearChange}
          />
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={editBike}>
              Editar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
export default EditBikePage;
