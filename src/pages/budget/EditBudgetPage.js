import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormmatedDate, isEmpty } from "../../stringHelper";
import {
  editBudgetRequest,
  getBudgetByIdRequest,
} from "../../services/budgetService";
import { getStatusListRequest } from "../../services/statusService";
import { getBikePartListRequest } from "../../services/bikePartService";
import AddBikePartModal from "../../components/budgetModal/AddBikePartModal";
import AddBikeServiceModal from "../../components/budgetModal/AddBikeServiceModal";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClientDataModal from "../../components/budgetModal/ClientDataModal";
import { getPaymentFormatListRequest } from "../../services/paymentFormatService";
import PrintIcon from "@mui/icons-material/Print";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BudgetPdf from "../../components/pdf/BudgetPdf";
import { getCepRequest } from "../../services/cepService";
import { getBikeServiceListRequest } from "../../services/bikeServiceService";
import CostModal from "../../components/budgetModal/CostModal";
import { getLaborOrBikePartByName } from "../../services/budgetService";

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
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bikePartModal, setBikePartModal] = useState(false);
  const [bikeServiceModal, setBikeServiceModal] = useState(false);
  const [kilometersDriven, setKilometersDriven] = useState("");
  const [paymentFormat, setPaymentFormat] = useState("");
  const [notes, setNotes] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [clientDataModal, setClientDataModal] = useState(false);
  const [paymentFormatList, setPaymentFormatList] = useState([]);
  const [pdfClientData, setPdfClientData] = useState([]);
  const [pdfBikeData, setPdfBikeData] = useState([]);
  const [address, setAddress] = useState("");
  const [totalValueBikeService, setTotalValueBikeService] = useState(0);
  const [totalValueBikePart, setTotalValueBikePart] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [bikeServiceList, setBikeServiceList] = useState([]);
  const [cost, setCost] = useState("");
  const [costModal, setCostModal] = useState(false);
  const [problems, setProblems] = useState("");

  useEffect(() => {
    getBudgetByIdRequest(pathname.id).then((response) => {
      setClient(response.data.client.name);
      setBike(
        response.data.bikeName +
          " " +
          response.data.bikeBrand +
          ", " +
          response.data.year
      );
      setPlate(response.data.plate);
      setLaborOrBikePartBudgetList(response.data.laborOrBikePartBudgetList);
      setDiscountPercentage(response.data.discountPercentage);
      setStatus(response.data.status);
      setPaymentFormat(response.data.paymentFormat);
      setKilometersDriven(response.data.kilometersDriven);
      setNotes(response.data.notes);
      setProblems(response.data.problems);
      setCreatedDate(response.data.createdAt);
      getAddress(response.data.client.cep);
      setPdfClientData([
        response.data.client.name,
        response.data.client.addressNumber,
        response.data.client.cpfcnpj,
        response.data.client.phone,
        response.data.client.birthDate,
      ]);
      setPdfBikeData([
        response.data.plate,
        response.data.bikeName,
        response.data.year,
        response.data.kilometersDriven,
        response.data.bikeBrand,
      ]);
      setTotalValue(response.data.totalValue);
      setTotalValueBikePart(response.data.totalValueBikePart);
      setTotalValueBikeService(response.data.totalValueBikeService);
    });
    getStatusListRequest().then((response) => setStatusList(response.data));
    getPaymentFormatListRequest().then((response) =>
      setPaymentFormatList(response.data)
    );
    getBikePartList();
    getBikeServiceListRequest().then((response) =>
      setBikeServiceList(response.data)
    );
  }, [pathname.id]);

  function handleStatusChange(event) {
    setStatus(statusList[event.target.selectedIndex]);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handleProblemsChange(event) {
    setProblems(event.target.value);
  }

  function handlePaymentFormatChange(event) {
    setPaymentFormat(paymentFormatList[event.target.selectedIndex]);
  }

  function handleDiscountPercentageChange(event) {
    setDiscountPercentage(event.target.value);
    getTotalValue(event.target.value);
  }

  function getTotalValue(discount) {
    let totalValue = 0;
    laborOrBikePartBudgetList.forEach((element) => {
      totalValue = totalValue + element.quantity * element.value;
    });
    if (isEmpty(discount)) {
      setTotalValue(totalValue);
    } else {
      setTotalValue(totalValue - (totalValue * discount) / 100);
    }
  }

  function isValidEntrances() {
    return !isEmpty(status) && !isEmpty(paymentFormat);
  }

  function editBudget() {
    if (isValidEntrances()) {
      editBudgetRequest(
        pathname.id,
        paymentFormat,
        laborOrBikePartBudgetList,
        discountPercentage,
        status,
        notes,
        problems
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
    closeBikeServiceModal();
    getNewTotalValues([
      ...laborOrBikePartBudgetList,
      { name, quantity, value },
    ]);
  }

  function addBikePartToBudget(name, quantity, value) {
    setLaborOrBikePartBudgetList((oldList) => [
      ...oldList,
      { name, quantity, value },
    ]);
    closeBikePartModal();
    getNewTotalValues([
      ...laborOrBikePartBudgetList,
      { name, quantity, value },
    ]);
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
    getNewTotalValues(reducedArray);
  }

  function openClientDataModal() {
    setClientDataModal(true);
  }

  function closeClientDataModal() {
    setClientDataModal(false);
  }

  function getNewTotalValues(laborOrBikePartBudgetList) {
    let totalValue = 0;
    let totalValueBikePart = 0;
    let totalValueBikeService = 0;
    laborOrBikePartBudgetList.forEach((element) => {
      let match = false;
      bikeServiceList.forEach((bikeService) => {
        if (element.name === bikeService.name) {
          totalValueBikeService =
            totalValueBikeService + element.quantity * element.value;
          match = true;
        }
      });
      if (!match) {
        totalValueBikePart =
          totalValueBikePart + element.quantity * element.value;
      }
      totalValue = totalValue + element.quantity * element.value;
    });
    setTotalValueBikePart(totalValueBikePart);
    setTotalValueBikeService(totalValueBikeService);
    if (isEmpty(discountPercentage)) {
      setTotalValue(totalValue);
    } else {
      setTotalValue(totalValue - (totalValue * discountPercentage) / 100);
    }
  }

  function getAddress(cep) {
    if (!isEmpty(cep) && cep.length === 9) {
      getCepRequest(cep).then((response) => {
        if (response.data.erro) {
          setAddress("");
        } else {
          setAddress(response.data.logradouro);
        }
      });
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
            <div className="me-3">Data: {getFormmatedDate(createdDate)}</div>
            <PDFDownloadLink
              document={
                <BudgetPdf
                  client={pdfClientData}
                  bike={pdfBikeData}
                  address={address}
                  laborOrBikePartBudgetList={laborOrBikePartBudgetList}
                  discountPercentage={discountPercentage}
                  totalValueBikePart={totalValueBikePart}
                  totalValueBikeService={totalValueBikeService}
                  totalValue={totalValue}
                  createdDate={createdDate}
                  problems={problems}
                />
              }
              fileName={client + "-orcamento.pdf"}
            >
              <PrintIcon />
            </PDFDownloadLink>
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
          <input type="text" defaultValue={bike} disabled />
          <p className="mb-0 mt-3 font-size-20">Quilometragem:</p>
          <input type="number" defaultValue={kilometersDriven} disabled />
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
            className="btn btn-primary me-3 mt-5  mb-3"
            onClick={openBikePartModal}
          >
            Adicionar Peça
          </button>
          <button
            className="btn btn-primary me-3 mt-5  mb-3"
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
          <p className="mb-0 mt-3 font-size-20">Desconto:</p>
          <input
            type="number"
            defaultValue={discountPercentage}
            onChange={handleDiscountPercentageChange}
          />
          <span>%</span>
          <p className="mb-0 mt-5 font-size-20 fw-bold">
            Valor Total: {totalValue.toFixed(2)} Reais
          </p>
          <p className="mb-0 mt-3 font-size-20">Status:*</p>
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
        getBikePartList={getBikePartList}
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
      <CostModal show={costModal} close={closeCostModal} cost={cost} />
    </div>
  );
}
export default EditBudgetPage;
