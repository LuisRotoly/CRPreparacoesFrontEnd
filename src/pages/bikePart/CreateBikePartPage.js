import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBikePartRequest } from "../../services/bikePartService";
import { isEmpty } from "../../stringHelper";

function CreateBikePartPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleProfitPercentageChange(event) {
    setProfitPercentage(event.target.value);
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
      !isEmpty(stockQuantity)
    );
  }

  function createBikePart() {
    if (isValidEntrances()) {
      addBikePartRequest(name, value, profitPercentage, stockQuantity)
        .then((_) => setSuccessMessage("Peça criada com sucesso!"))
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
          <p className="mb-0 mt-3 font-size-20">Nome:*</p>
          <input
            maxLength="100"
            type="text"
            required
            value={name}
            onChange={handleNameChange}
          />
          <p className="mb-0 mt-3 font-size-20">Valor:*</p>
          <input
            type="number"
            required
            maxLength="14"
            value={value}
            onChange={handleValueChange}
          />
          <p className="mb-0 mt-3 font-size-20">Margem de lucro:*</p>
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
          {finalValue === "" ? null : (
            <div>
              <p className="mb-0 mt-3 font-size-20">Valor final:</p>
              <input type="number" disabled value={finalValue} />
            </div>
          )}
          <p className="mb-0 mt-3 font-size-20">Quantidade em estoque:*</p>
          <input
            type="number"
            maxLength="10"
            value={stockQuantity}
            onChange={handleStockQuantityChange}
          />
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
