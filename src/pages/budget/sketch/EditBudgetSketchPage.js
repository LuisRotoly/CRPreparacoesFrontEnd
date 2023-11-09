import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormmatedDate, isEmpty } from "../../../stringHelper";
import AddBikePartModal from "../../../components/budgetModal/AddBikePartModal";
import AddBikeServiceModal from "../../../components/budgetModal/AddBikeServiceModal";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  editBudgetSketchRequest,
  getBudgetSketchByIdRequest,
} from "../../../services/budgetSketchService";
import { getBikePartListRequest } from "../../../services/bikePartService";
import InputMask from "react-input-mask";
import PrintIcon from "@mui/icons-material/Print";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BudgetPdf from "../../../components/pdf/BudgetPdf";
import { getBikeServiceListRequest } from "../../../services/bikeServiceService";
import { getLaborOrBikePartByName } from "../../../services/budgetService";
import CostModal from "../../../components/budgetModal/CostModal";

function EditBudgetSketchPage() {
  const pathname = useParams();
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
  const [createdDate, setCreatedDate] = useState("");
  const [pdfClientData, setPdfClientData] = useState([]);
  const [pdfBikeData, setPdfBikeData] = useState([]);
  const [totalValueBikeService, setTotalValueBikeService] = useState(0);
  const [totalValueBikePart, setTotalValueBikePart] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [bikeServiceList, setBikeServiceList] = useState([]);
  const [cost, setCost] = useState("");
  const [costModal, setCostModal] = useState(false);

  useEffect(() => {
    getBudgetSketchByIdRequest(pathname.id).then((response) => {
      setClient(response.data.client);
      setBike(response.data.bike);
      setPlate(response.data.plate);
      setPhone(response.data.phone);
      setLaborOrBikePartBudgetSketchList(
        response.data.laborOrBikePartBudgetSketchList
      );
      setNotes(response.data.notes);
      setCreatedDate(response.data.createdAt);
      setPdfClientData([response.data.client, "", "", response.data.phone, ""]);
      setPdfBikeData([response.data.plate, response.data.bike, "", "", ""]);
      setTotalValue(response.data.totalValue);
      setTotalValueBikePart(response.data.totalValueBikePart);
      setTotalValueBikeService(response.data.totalValueBikeService);
    });
    getBikePartList();
    getBikeServiceListRequest().then((response) =>
      setBikeServiceList(response.data)
    );
  }, [pathname.id]);

  function getBikePartList() {
    getBikePartListRequest().then((response) => setBikePartList(response.data));
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

  function editBudgetSketch() {
    if (isValidEntrances()) {
      editBudgetSketchRequest(
        pathname.id,
        client,
        plate,
        bike,
        phone,
        laborOrBikePartBudgetSketchList,
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
    setLaborOrBikePartBudgetSketchList((oldList) => [
      ...oldList,
      { name, quantity, value },
    ]);
    closeBikeServiceModal();
    getNewTotalValues([
      ...laborOrBikePartBudgetSketchList,
      { name, quantity, value },
    ]);
  }

  function addBikePartToBudget(name, quantity, value) {
    setLaborOrBikePartBudgetSketchList((oldList) => [
      ...oldList,
      { name, quantity, value },
    ]);
    closeBikePartModal();
    getNewTotalValues([
      ...laborOrBikePartBudgetSketchList,
      { name, quantity, value },
    ]);
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
    getNewTotalValues(reducedArray);
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
    setTotalValue(totalValue);
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
                  address={""}
                  laborOrBikePartBudgetList={laborOrBikePartBudgetSketchList}
                  discountPercentage={""}
                  totalValueBikePart={totalValueBikePart}
                  totalValueBikeService={totalValueBikeService}
                  totalValue={totalValue}
                  createdDate={createdDate}
                />
              }
              fileName={client + "-orcamento.pdf"}
            >
              <PrintIcon />
            </PDFDownloadLink>
          </div>
          <p className="mb-0 mt-3 font-size-20">Cliente:</p>
          <input type="text" defaultValue={client} disabled />
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
            Valor Total: {totalValue} Reais
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
            <button className="btn btn-success" onClick={editBudgetSketch}>
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
      <CostModal show={costModal} close={closeCostModal} cost={cost} />
    </div>
  );
}
export default EditBudgetSketchPage;
