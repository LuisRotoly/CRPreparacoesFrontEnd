import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getFormmatedDate,
  getFormmatedMoney,
  isEmpty,
} from "../../../stringHelper";
import { addBudgetRequest } from "../../../services/budgetService";
import { getClientsListRequest } from "../../../services/clientService";
import { listClientBikeById } from "../../../services/clientBikeService";
import { getStatusListRequest } from "../../../services/statusService";
import { getBikePartListRequest } from "../../../services/bikePartService";
import AddBikePartModal from "../../../components/budgetModal/AddBikePartModal";
import AddBikeServiceModal from "../../../components/budgetModal/AddBikeServiceModal";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPaymentFormatListRequest } from "../../../services/paymentFormatService";
import Select from "react-select";
import CostModal from "../../../components/budgetModal/CostModal";
import { getLaborOrBikePartByName } from "../../../services/budgetService";
import { removeBudgetSketchByIdRequest } from "../../../services/budgetSketchService";

function TransformBudgetPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [plate, setPlate] = useState("");
  const [bike, setBike] = useState("");
  const [year, setYear] = useState("");
  const [clientBikeList, setClientBikeList] = useState([]);
  const [client, setClient] = useState("");
  const [clientList, setClientList] = useState([]);
  const [bikePartList, setBikePartList] = useState([]);
  const [laborOrBikePartBudgetList, setLaborOrBikePartBudgetList] = useState(
    []
  );
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [status, setStatus] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bikePartModal, setBikePartModal] = useState(false);
  const [bikeServiceModal, setBikeServiceModal] = useState(false);
  const [kilometersDriven, setKilometersDriven] = useState("");
  const [paymentFormat, setPaymentFormat] = useState("");
  const [paymentFormatList, setPaymentFormatList] = useState([]);
  const [notes, setNotes] = useState("");
  const [cost, setCost] = useState("");
  const [costModal, setCostModal] = useState(false);
  const [problems, setProblems] = useState("");

  useEffect(() => {
    getClientsListRequest().then((response) => setClientList(response.data));
    getStatusListRequest().then((response) => setStatusList(response.data));
    getPaymentFormatListRequest().then((response) => {
      setPaymentFormatList(response.data);
    });
    getBikePartList();
    setLaborOrBikePartBudgetList(state.laborOrBikePartBudgetSketchList);
    setNotes(state.notes);
  }, [state]);

  function handleClientChange(event) {
    setClient(event.id);
    setClientBikeList([]);
    listClientBikeById(event.id).then((response) =>
      setClientBikeList(response.data)
    );
    resetFields();
  }

  function resetFields() {
    setBike("");
    setPlate("");
    setYear("");
    setErrorMessage("");
    setPaymentFormat("");
    setKilometersDriven("");
    setStatus("");
    setDiscountPercentage("");
  }

  function handleBikeChange(event) {
    let clientBike = clientBikeList[event.target.selectedIndex - 1];
    setBike(clientBike.bike);
    setPlate(clientBike.plate);
    setYear(clientBike.year);
    setErrorMessage("");
  }

  function handleStatusChange(event) {
    setStatus(statusList[event.target.selectedIndex - 1]);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handleProblemsChange(event) {
    setProblems(event.target.value);
  }

  function handleKilometersDrivenChange(event) {
    setKilometersDriven(event.target.value);
  }

  function handlePaymentFormatChange(event) {
    setPaymentFormat(paymentFormatList[event.target.selectedIndex - 1]);
  }

  function handleDiscountPercentageChange(event) {
    setDiscountPercentage(event.target.value);
  }

  function isValidEntrances() {
    return (
      !isEmpty(bike) &&
      !isEmpty(client) &&
      !isEmpty(status) &&
      !isEmpty(kilometersDriven) &&
      !isEmpty(paymentFormat)
    );
  }

  function createBudget() {
    if (isValidEntrances()) {
      addBudgetRequest(
        client,
        plate,
        bike.name,
        bike.bikeBrand.name,
        year,
        paymentFormat,
        kilometersDriven,
        laborOrBikePartBudgetList,
        discountPercentage,
        status,
        notes,
        problems
      )
        .then((_) => {
          setSuccessMessage("Orçamento criado com sucesso!");
          removeBudgetSketchByIdRequest(state.budgetSketchId);
        })
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate(`/budget/sketch/edit/${state.budgetSketchId}`);
  }

  function gotoBudgetBackPage() {
    navigate("/budget");
  }

  function addBikeServiceToBudget(name, quantity, value) {
    setLaborOrBikePartBudgetList((oldList) => [
      ...oldList,
      { name, quantity, value },
    ]);
    closeBikeServiceModal();
  }

  function addBikePartToBudget(name, quantity, value) {
    setLaborOrBikePartBudgetList((oldList) => [
      ...oldList,
      { name, quantity, value },
    ]);
    closeBikePartModal();
  }

  function openBikePartModal() {
    setBikePartModal(true);
  }

  function getBikePartList() {
    getBikePartListRequest().then((response) => setBikePartList(response.data));
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
    const reducedArray = [...laborOrBikePartBudgetList];
    reducedArray.splice(index, 1);
    setLaborOrBikePartBudgetList(reducedArray);
  }

  function getTotalValue() {
    let totalValue = 0;
    laborOrBikePartBudgetList.forEach((element) => {
      totalValue = totalValue + element.quantity * element.value;
    });
    if (isEmpty(discountPercentage)) {
      return totalValue;
    } else {
      return totalValue - (totalValue * discountPercentage) / 100;
    }
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

  function getOptionLabel(option) {
    return option.name + ", " + option.cpfcnpj + ", " + option.nickname;
  }

  return (
    <div className="text-center mt-5">
      {successMessage !== "" ? (
        <div>
          <p className="text-success font-size-18">{successMessage}</p>
          <div className="text-center">
            <button className="btn btn-primary" onClick={gotoBudgetBackPage}>
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="data">Data: {getFormmatedDate(new Date())}</p>
          <p className="mb-0 mt-3 font-size-20">Cliente:*</p>
          <div className="d-flex justify-content-center">
            <Select
              defaultValue=""
              getOptionLabel={(option) => getOptionLabel(option)}
              onChange={handleClientChange}
              options={clientList}
              getOptionValue={(option) => option.name}
              placeholder={"Selecione..."}
              className="select-dropdown mb-3"
            />
          </div>
          {isEmpty(client) ? null : (
            <div>
              <p className="mb-0 mt-3 font-size-20">Moto:*</p>
              <select
                defaultValue=""
                className="select-width"
                onChange={handleBikeChange}
              >
                <option key="blankChoice" hidden value="">
                  Selecione...
                </option>
                {clientBikeList.map(({ plate, bike, year }) => {
                  return (
                    <option key={plate} value={plate}>
                      {plate}, {bike.name}, {bike.bikeBrand.name}, {year}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {isEmpty(plate) ? null : (
            <div>
              <p className="mb-0 mt-3 font-size-20">Quilometragem:*</p>
              <input
                type="number"
                required
                value={kilometersDriven}
                onChange={handleKilometersDrivenChange}
              />
              <p className="mb-0 mt-3 font-size-20">Problemas Relatados:</p>
              <textarea
                className="text-area-size"
                type="text"
                maxLength="255"
                value={problems}
                onChange={handleProblemsChange}
              />
              <p className="mb-0 mt-3 font-size-20">Forma de Pagamento:*</p>
              <select
                defaultValue=""
                className="select-width"
                onChange={handlePaymentFormatChange}
              >
                <option key="blankChoice" hidden value="">
                  Selecione...
                </option>
                {paymentFormatList.map(({ id, type }) => {
                  return (
                    <option key={id} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
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
                    {laborOrBikePartBudgetList.map(
                      ({ name, quantity, value }, index) => (
                        <tr key={index}>
                          <td>{name}</td>
                          <td>{quantity}</td>
                          <td onClick={() => showCostValue(name)}>
                            R$ {getFormmatedMoney(value)}
                          </td>
                          <td>R$ {getFormmatedMoney(quantity * value)}</td>
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
              <p className="mb-0 mt-3 font-size-20">Desconto:</p>
              <input
                type="number"
                maxLength={2}
                value={discountPercentage}
                onChange={handleDiscountPercentageChange}
              />
              <span>%</span>
              <p className="mb-0 mt-5 font-size-20 fw-bold">
                Valor Total: {getTotalValue()} Reais
              </p>
              <p className="mb-0 mt-3 font-size-20">Status:*</p>
              <select
                defaultValue={status}
                className="select-width"
                onChange={handleStatusChange}
              >
                <option key="blankChoice" hidden value="">
                  Selecione...
                </option>
                {statusList.map(({ id, description }) => {
                  return (
                    <option key={id} value={description}>
                      {description}
                    </option>
                  );
                })}
              </select>
              <p className="mb-0 mt-3 font-size-20">Observações:</p>
              <textarea
                className="text-area-size"
                type="text"
                maxLength="255"
                value={notes}
                onChange={handleNotesChange}
              />
            </div>
          )}
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={createBudget}>
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
export default TransformBudgetPage;
