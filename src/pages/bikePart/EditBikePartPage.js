import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editBikePartRequest,
  getBikePartByIdRequest,
} from "../../services/bikePartService";
import { isEmpty } from "../../stringHelper";
import { getBikeListRequest } from "../../services/bikeService";

function EditBikePartPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [bike, setBike] = useState([]);
  const [bikeList, setBikeList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getBikePartByIdRequest(pathname.id).then((response) => {
      setName(response.data.name);
      setValue(response.data.value);
      setProfitPercentage(response.data.profitPercentage);
      setFinalValue(response.data.finalValue);
      setStockQuantity(response.data.stockQuantity);
      setBike(response.data.bike);
    });
    getBikeListRequest().then((response) => {
      setBikeList(response.data);
    });
  }, [pathname.id]);

  function handleProfitPercentageChange(event) {
    setProfitPercentage(event.target.value);
  }

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
      !isEmpty(profitPercentage) &&
      !isEmpty(stockQuantity) &&
      bike.length !== 0
    );
  }

  function editBikePart() {
    if (isValidEntrances()) {
      editBikePartRequest(pathname.id, name, value, stockQuantity, bike.id)
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
          <p className="mb-0 mt-3 font-size-20">Quantidade em estoque*:</p>
          <input
            type="number"
            maxLength="10"
            value={stockQuantity}
            onChange={handleStockQuantityChange}
          />
          <p className="mb-0 mt-3 font-size-20">Moto*:</p>
          <select
            value={bike.id}
            className="select-width"
            onChange={handleBikeChange}
          >
            <option key={bike.id} hidden value={bike.name}>
              {bike.name}, {bike.engineCapacity}, {bike.year}
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
            <button className="btn btn-success" onClick={editBikePart}>
              Editar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
export default EditBikePartPage;
