import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editBikePartStockRequest,
  getBikePartByIdRequest,
} from "../../services/bikePartService";
import { isEmpty } from "../../stringHelper";

function EditStockPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [bikePartName, setBikePartName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bikeList, setBikeList] = useState([]);

  useEffect(() => {
    getBikePartByIdRequest(pathname.id).then((response) => {
      setBikePartName(response.data.name);
      setBikeList(response.data.bikeList);
      setStockQuantity(response.data.stockQuantity);
    });
  }, [pathname.id]);

  function handleStockQuantityChange(event) {
    setStockQuantity(event.target.value);
  }
  function editBikePartStock() {
    if (!isEmpty(stockQuantity)) {
      editBikePartStockRequest(pathname.id, stockQuantity)
        .then((_) => setSuccessMessage("Estoque da peça editado com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/stock");
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
          <p className="mb-0 mt-3 font-size-20">Nome da Peça:</p>
          <input disabled value={bikePartName} />
          <p className="mb-0 mt-3 font-size-20">Quantidade Estoque*:</p>
          <input
            type="number"
            required
            value={stockQuantity}
            onChange={handleStockQuantityChange}
          />
          <div>
            {bikeList.map(
              ({ name, bikeBrand, engineCapacity, year }, index) => {
                return (
                  <div key={index} className="align-center mt-3">
                    <div className="bike-container">
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
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={editBikePartStock}>
              Alterar Estoque
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
export default EditStockPage;
