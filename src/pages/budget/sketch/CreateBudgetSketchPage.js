import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFormmatedDate, isEmpty } from "../../../stringHelper";
import { getBikePartListRequest } from "../../../services/bikePartService";
import AddBikePartModal from "../../../components/budgetModal/AddBikePartModal";
import AddBikeServiceModal from "../../../components/budgetModal/AddBikeServiceModal";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import { addBudgetSketchRequest } from "../../../services/budgetSketchService";
import InputMask from "react-input-mask";
import CostModal from "../../../components/budgetModal/CostModal";
import { getLaborOrBikePartByName } from "../../../services/budgetService";

function CreateBudgetSketchPage() {
  const navigate = useNavigate();
  const [plate, setPlate] = useState("");
  const [bike, setBike] = useState("");
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [laborOrBikePartBudgetSketchList, setLaborOrBikePartBudgetSketchList] =
    useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bikePartModal, setBikePartModal] = useState(false);
  const [bikeServiceModal, setBikeServiceModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [bikePartList, setBikePartList] = useState([]);
  const [cost, setCost] = useState("");
  const [costModal, setCostModal] = useState(false);

  useEffect(() => {
    getBikePartList();
  }, []);

  function getBikePartList() {
    getBikePartListRequest().then((response) => setBikePartList(response.data));
  }

  function handleClientChange(event) {
    setClient(event.target.value);
  }

  function handleBikeChange(event) {
    setBike(event.target.value);
  }

  function handlePlateChange(event) {
    setPlate(event.target.value);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function isValidEntrances() {
    return !isEmpty(bike) && !isEmpty(client) && !isEmpty(plate);
  }

  function createBudgetSketch() {
    if (isValidEntrances()) {
      addBudgetSketchRequest(
        client,
        plate,
        bike,
        phone,
        laborOrBikePartBudgetSketchList,
        notes
      )
        .then((_) => setSuccessMessage("Orçamento criado com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/budget");
  }

  function addBikeServiceToBudget(name, quantity, value) {
    setLaborOrBikePartBudgetSketchList((oldList) => [
      ...oldList,
      { name, quantity, value },
    ]);
    closeBikeServiceModal();
  }

  function addBikePartToBudget(name, quantity, value) {
    setLaborOrBikePartBudgetSketchList((oldList) => [
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

  function openBikeServiceModal() {
    setBikeServiceModal(true);
  }

  function closeBikeServiceModal() {
    setBikeServiceModal(false);
  }

  function deleteLaborOrBikePartLine(index) {
    const reducedArray = [...laborOrBikePartBudgetSketchList];
    reducedArray.splice(index, 1);
    setLaborOrBikePartBudgetSketchList(reducedArray);
  }

  function getTotalValue() {
    let totalValue = 0;
    laborOrBikePartBudgetSketchList.forEach((element) => {
      totalValue = totalValue + element.quantity * element.value;
    });
    return totalValue;
  }

  function showCostValue(laborOrBikePartName) {
    getLaborOrBikePartByName(laborOrBikePartName).then((response) => {
      setCost(response.data);
      setCostModal(true);
    });
  }

  function closeCostModal() {
    setCostModal(false);
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
          <p className="mb-0 mt-3 font-size-20">Placa:*</p>
          <InputMask
            type="text"
            required
            mask={"***-****"}
            maskChar=""
            value={plate}
            onChange={handlePlateChange}
          />
          <p className="mb-0 mt-3 font-size-20">Moto:*</p>
          <input
            maxLength="100"
            type="text"
            required
            value={bike}
            onChange={handleBikeChange}
          />
          <p className="mb-0 mt-3 font-size-20">Telefone:</p>
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
          <br />
          <button
            className="btn btn-primary me-3 mt-5 mb-3"
            onClick={openBikePartModal}
          >
            Adicionar Peça
          </button>
          <button
            className="btn btn-primary me-3 mt-5 mb-3"
            onClick={openBikeServiceModal}
          >
            Adicionar Serviço
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
                {laborOrBikePartBudgetSketchList.map(
                  ({ name, quantity, value }, index) => (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{quantity}</td>
                      <td onClick={() => showCostValue(name)}>
                        R$ {parseFloat(value).toFixed(2)}
                      </td>
                      <td>R$ {parseFloat(quantity * value).toFixed(2)}</td>
                      <td>
                        <DeleteIcon
                          className="default-remove-icon"
                          onClick={() => deleteLaborOrBikePartLine(index)}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
          <p className="mb-0 mt-5 font-size-20 fw-bold">
            Valor Total: {getTotalValue()} Reais
          </p>
          <p className="mb-0 mt-3 font-size-20">Observações:</p>
          <textarea
            className="text-area-size"
            type="text"
            maxLength="255"
            value={notes}
            onChange={handleNotesChange}
          />
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
        addBikePartToBudget={addBikePartToBudget}
      />
      <AddBikeServiceModal
        show={bikeServiceModal}
        close={closeBikeServiceModal}
        addBikeServiceToBudget={addBikeServiceToBudget}
      />
      <CostModal show={costModal} close={closeCostModal} cost={cost} />
    </div>
  );
}
export default CreateBudgetSketchPage;
