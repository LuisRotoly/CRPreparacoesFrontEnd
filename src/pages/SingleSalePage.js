import { useNavigate } from "react-router-dom";
import { getBikePartListRequest } from "../services/bikePartService";
import { useState, useEffect } from "react";
import { getFormmatedDate, isEmpty } from "../stringHelper";
import AddBikePartModal from "../components/budgetModal/AddBikePartModal";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import { addSingleSaleRequest } from "../services/singleSaleService";

function SingleSalePage() {
  const navigate = useNavigate();
  const [client, setClient] = useState("");
  const [laborOrBikePartList, setLaborOrBikePartList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bikePartModal, setBikePartModal] = useState(false);
  const [bikePartList, setBikePartList] = useState([]);

  useEffect(() => {
    getBikePartList();
  }, []);

  function getBikePartList() {
    getBikePartListRequest().then((response) => setBikePartList(response.data));
  }

  function handleClientChange(event) {
    setClient(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(client); //verify labororbikepartList
  }

  function createBudgetSketch() {
    if (isValidEntrances()) {
      addSingleSaleRequest(client, laborOrBikePartList)
        .then((_) => setSuccessMessage("Venda criada com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/");
  }

  function addBikePart(name, quantity, value) {
    setLaborOrBikePartList((oldList) => [
      ...oldList,
      { name, quantity, value },
    ]);
    closeBikePartModal();
  }

  function openBikePartModal() {
    setBikePartModal(true);
  }

  function closeBikePartModal() {
    setBikePartModal(false);
  }

  function deleteLaborOrBikePartLine(index) {
    const reducedArray = [...laborOrBikePartList];
    reducedArray.splice(index, 1);
    setLaborOrBikePartList(reducedArray);
  }

  function getTotalValue() {
    let totalValue = 0;
    laborOrBikePartList.forEach((element) => {
      totalValue = totalValue + element.quantity * element.value;
    });
    return totalValue.toFixed(2);
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
          <p className="data">Data: {getFormmatedDate(new Date())}</p>
          <p className="mb-0 mt-3 font-size-20">Cliente:*</p>
          <input
            maxLength="100"
            type="text"
            required
            value={client}
            onChange={handleClientChange}
          />
          <br />
          <button
            className="btn btn-primary mt-5 mb-3"
            onClick={openBikePartModal}
          >
            Adicionar Peça
          </button>
          <div className="align-center">
            <Table className="table-preferences">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                  <th>ValorTotal</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {laborOrBikePartList.map(({ name, quantity, value }, index) => (
                  <tr key={index}>
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td>R$ {parseFloat(value).toFixed(2)}</td>
                    <td>R$ {parseFloat(quantity * value).toFixed(2)}</td>
                    <td>
                      <DeleteIcon
                        className="default-remove-icon"
                        onClick={() => deleteLaborOrBikePartLine(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <p className="mb-0 mt-3 font-size-20 fw-bold">
            Valor Total: {getTotalValue()} Reais
          </p>
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={createBudgetSketch}>
              Criar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
      <AddBikePartModal
        show={bikePartModal}
        close={closeBikePartModal}
        bikePartList={bikePartList}
        getBikePartList={getBikePartList}
        addBikePartToBudget={addBikePart}
      />
    </div>
  );
}
export default SingleSalePage;
