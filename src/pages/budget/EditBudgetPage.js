import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "../../stringHelper";
import {
  editBudgetRequest,
  getBudgetByIdRequest,
} from "../../services/budgetService";
import { getStatusListRequest } from "../../services/statusService";
import { getBikePartByPlateRequest } from "../../services/bikePartService";
import AddBikePartModal from "../../components/budgetModal/AddBikePartModal";
import AddBikeServiceModal from "../../components/budgetModal/AddBikeServiceModal";
import { getBikeByPlateRequest } from "../../services/clientBikeService";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClientDataModal from "../../components/budgetModal/ClientDataModal";
import BikeDataModal from "../../components/budgetModal/BikeDataModal";
import { getPaymentFormatListRequest } from "../../services/paymentFormatService";

function EditBudgetPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [plate, setPlate] = useState("");
  const [bike, setBike] = useState("");
  const [client, setClient] = useState("");
  const [bikePartList, setBikePartList] = useState([]);
  const [laborOrBikePartBudgetList, setLaborOrBikePartBudgetList] = useState(
    []
  );
  const [status, setStatus] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bikePartModal, setBikePartModal] = useState(false);
  const [bikeServiceModal, setBikeServiceModal] = useState(false);
  const [kilometersDriven, setKilometersDriven] = useState("");
  const [paymentFormat, setPaymentFormat] = useState("");
  const [notes, setNotes] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [clientDataModal, setClientDataModal] = useState(false);
  const [bikeDataModal, setBikeDataModal] = useState(false);
  const [bikeData, setBikeData] = useState("");
  const [paymentFormatList, setPaymentFormatList] = useState([]);

  useEffect(() => {
    getBudgetByIdRequest(pathname.id).then((response) => {
      setClient(response.data.client.name);
      setBike(response.data.bikeName + " " + response.data.bikeBrand);
      setPlate(response.data.plate);
      setTotalValue(response.data.totalValue);
      setLaborOrBikePartBudgetList(response.data.laborOrBikePartBudgetList);
      setStatus(response.data.status);
      setPaymentFormat(response.data.paymentFormat);
      setKilometersDriven(response.data.kilometersDriven);
      setNotes(response.data.notes);
      setCreatedDate(response.data.createdAt);
    });
    getStatusListRequest().then((response) => setStatusList(response.data));
    getPaymentFormatListRequest().then((response) =>
      setPaymentFormatList(response.data)
    );
  }, [pathname.id]);

  function handleStatusChange(event) {
    setStatus(statusList[event.target.selectedIndex]);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handlePaymentFormatChange(event) {
    setPaymentFormat(paymentFormatList[event.target.selectedIndex]);
  }

  function isValidEntrances() {
    return (
      !isEmpty(status) &&
      !isEmpty(paymentFormat) &&
      !isEmpty(laborOrBikePartBudgetList)
    );
  }

  function editBudget() {
    if (isValidEntrances()) {
      editBudgetRequest(
        pathname.id,
        paymentFormat,
        laborOrBikePartBudgetList,
        status,
        notes
      )
        .then((_) => setSuccessMessage("Orçamento editado com sucesso!"))
        .catch((e) => setErrorMessage(e.response.data.message));
    } else {
      setErrorMessage("Preencha todos os campos obrigatórios!");
    }
  }

  function gotoBackPage() {
    navigate("/budget");
  }

  function addBikeServiceToBudget(name, quantity, value) {
    setLaborOrBikePartBudgetList((oldList) => [
      ...oldList,
      { name, quantity, value },
    ]);
    setTotalValue(totalValue + quantity * value);
    closeBikeServiceModal();
  }

  function addBikePartToBudget(name, quantity, value) {
    setLaborOrBikePartBudgetList((oldList) => [
      ...oldList,
      { name, quantity, value },
    ]);
    setTotalValue(totalValue + quantity * value);
    closeBikePartModal();
  }

  function openBikePartModal() {
    getBikePartByPlateRequest(plate).then((response) =>
      setBikePartList(response.data)
    );
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
    const reducedArray = [...laborOrBikePartBudgetList];
    setTotalValue(
      totalValue -
        laborOrBikePartBudgetList[index].quantity *
          laborOrBikePartBudgetList[index].value
    );
    reducedArray.splice(index, 1);
    setLaborOrBikePartBudgetList(reducedArray);
  }

  function openBikeDataModal() {
    getBikeByPlateRequest(plate).then((response) => {
      setBikeData(response.data);
    });
    setBikeDataModal(true);
  }

  function closeBikeDataModal() {
    setBikeDataModal(false);
  }

  function openClientDataModal() {
    setClientDataModal(true);
  }

  function closeClientDataModal() {
    setClientDataModal(false);
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
          <div className="data">
            Data: {new Date(createdDate).toLocaleDateString()}
          </div>
          <p className="mb-0 mt-3 font-size-20">Cliente:</p>
          <input type="text" defaultValue={client} disabled className="me-3" />
          <button
            className="btn btn-outline-primary"
            onClick={openClientDataModal}
          >
            <VisibilityIcon />
          </button>
          <p className="mb-0 mt-3 font-size-20">Placa:</p>
          <input type="text" defaultValue={plate} disabled />
          <p className="mb-0 mt-3 font-size-20">Moto:</p>
          <input type="text" defaultValue={bike} disabled className="me-3" />
          <button
            className="btn btn-outline-primary"
            onClick={openBikeDataModal}
          >
            <VisibilityIcon />
          </button>
          <p className="mb-0 mt-3 font-size-20">Quilometragem:</p>
          <input type="number" defaultValue={kilometersDriven} disabled />
          <p className="mb-0 mt-3 font-size-20">Forma de Pagamento*:</p>
          <select
            value={paymentFormat.type}
            className="select-width"
            onChange={handlePaymentFormatChange}
          >
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
            className="btn btn-primary me-3 mt-5"
            onClick={openBikePartModal}
          >
            Adicionar Peça
          </button>
          <button
            className="btn btn-primary me-3 mt-5"
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
                      <td>R$ {value}</td>
                      <td>R$ {quantity * value}</td>
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
            Valor Total: {totalValue} Reais
          </p>
          <p className="mb-0 mt-3 font-size-20">Status*:</p>
          <select
            value={status.description}
            className="select-width"
            onChange={handleStatusChange}
          >
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
          <div className="text-center mt-4">
            <button className="btn btn-primary me-3" onClick={gotoBackPage}>
              Voltar
            </button>
            <button className="btn btn-success" onClick={editBudget}>
              Editar
            </button>
          </div>
          <p className="text-danger font-size-18">{errorMessage}</p>
        </div>
      )}
      <AddBikePartModal
        show={bikePartModal}
        close={closeBikePartModal}
        bikePartList={bikePartList}
        addBikePartToBudget={addBikePartToBudget}
      />
      <AddBikeServiceModal
        show={bikeServiceModal}
        close={closeBikeServiceModal}
        addBikeServiceToBudget={addBikeServiceToBudget}
      />
      <ClientDataModal
        show={clientDataModal}
        close={closeClientDataModal}
        budgetId={pathname.id}
      />
      <BikeDataModal
        show={bikeDataModal}
        close={closeBikeDataModal}
        bike={bikeData}
      />
    </div>
  );
}
export default EditBudgetPage;
