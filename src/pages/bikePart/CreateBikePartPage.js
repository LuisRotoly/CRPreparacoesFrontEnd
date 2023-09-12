import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addBikePartRequest } from "../../services/bikePartService";
import { isEmpty } from "../../stringHelper";
import { getBikeListRequest } from "../../services/bikeService";

function CreateBikePartPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [bike, setBike] = useState([]);
  const [bikeList, setBikeList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleBikeChange(event) {
    setBike(bikeList[event.target.selectedIndex - 1]);
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleStockQuantityChange(event) {
    setStockQuantity(event.target.value);
  }

  function isValidEntrances() {
    return (
      !isEmpty(name) &&
      !isEmpty(value) &&
      !isEmpty(stockQuantity) &&
      bike.length !== 0
    );
  }

  function createBikePart() {
    if (isValidEntrances()) {
      addBikePartRequest(name, value, stockQuantity, bike.id)
        .then((_) => setSuccessMessage("Peça criada com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/part");
  }

  useEffect(() => {
    getBikeListRequest()
      .then((response) => {
        setBikeList(response.data);
      })
      .catch((e) => setErrorMessage(e.response.data.message));
  }, []);

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
          <p className="mb-0 mt-3 font-size-20">Quantidade em estoque*:</p>
          <input
            type="number"
            maxLength="10"
            value={stockQuantity}
            onChange={handleStockQuantityChange}
          />
          <p className="mb-0 mt-3 font-size-20">Moto*:</p>
          <select
            defaultValue=""
            className="select-width"
            onChange={handleBikeChange}
          >
            <option key="blankChoice" hidden value="">
              Selecione...
            </option>
            {bikeList.map(({ id, name, engineCapacity, year }) => {
              return (
                <option key={id} value={name}>
                  {name}, {engineCapacity}, {year}
                </option>
              );
            })}
          </select>
          {bike.length === 0 ? null : (
            <div>
              <p className="mb-0 mt-3 font-size-20">Marca:</p>
              <input disabled type="text" value={bike.bikeBrand.name} />
              <p className="mb-0 mt-3 font-size-20">Cilindrada:</p>
              <input disabled type="text" value={bike.engineCapacity} />
              <p className="mb-0 mt-3 font-size-20">Ano:</p>
              <input disabled type="text" value={bike.year} />
            </div>
          )}
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={createBikePart}>
              Criar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
export default CreateBikePartPage;
