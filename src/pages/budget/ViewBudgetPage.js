import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editBudgetNotesRequest,
  getBudgetByIdRequest,
} from "../../services/budgetService";
import Table from "react-bootstrap/Table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClientDataModal from "../../components/budgetModal/ClientDataModal";
import { getFormmatedDate, isEmpty } from "../../stringHelper";
import PrintIcon from "@mui/icons-material/Print";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BudgetPdf from "../../components/pdf/BudgetPdf";
import { getCepRequest } from "../../services/cepService";
import CostModal from "../../components/budgetModal/CostModal";
import { getLaborOrBikePartByName } from "../../services/budgetService";

function ViewBudgetPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [plate, setPlate] = useState("");
  const [bike, setBike] = useState("");
  const [client, setClient] = useState("");
  const [laborOrBikePartBudgetList, setLaborOrBikePartBudgetList] = useState(
    []
  );
  const [status, setStatus] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [kilometersDriven, setKilometersDriven] = useState("");
  const [paymentFormat, setPaymentFormat] = useState("");
  const [notes, setNotes] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [clientDataModal, setClientDataModal] = useState(false);
  const [pdfClientData, setPdfClientData] = useState([]);
  const [pdfBikeData, setPdfBikeData] = useState([]);
  const [address, setAddress] = useState("");
  const [totalValueBikeService, setTotalValueBikeService] = useState(0);
  const [totalValueBikePart, setTotalValueBikePart] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
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
  }, [pathname.id]);

  function gotoBackPage() {
    navigate("/budget");
  }

  function openClientDataModal() {
    setClientDataModal(true);
  }

  function closeClientDataModal() {
    setClientDataModal(false);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function editBudget() {
    editBudgetNotesRequest(pathname.id, notes).then((_) => gotoBackPage());
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
        <input type="text" defaultValue={plate} disabled className="me-3" />
        <p className="mb-0 mt-3 font-size-20">Moto:</p>
        <input type="text" defaultValue={bike} disabled />
        <p className="mb-0 mt-3 font-size-20">Quilometragem:</p>
        <input type="number" defaultValue={kilometersDriven} disabled />
        <p className="mb-0 mt-3 font-size-20">Problemas Relatados:</p>
        <textarea
          type="text"
          className="text-area-size"
          defaultValue={problems}
          disabled
        />
        <p className="mb-0 mt-3 font-size-20">Forma de Pagamento:</p>
        <input
          type="text"
          className=" mb-3"
          defaultValue={paymentFormat.type}
          disabled
        />
        <div className="align-center">
          <Table className="table-preferences">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>ValorTotal</th>
              </tr>
            </thead>
            <tbody>
              {laborOrBikePartBudgetList.map(
                ({ name, quantity, value }, index) => (
                  <tr key={index}>
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td onClick={() => showCostValue(name)}>
                      R$ {value.toFixed(2)}
                    </td>
                    <td>R$ {(quantity * value).toFixed(2)}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
        <p className="mb-0 mt-3 font-size-20">Desconto:</p>
        <input type="number" defaultValue={discountPercentage} disabled />
        <span>%</span>
        <p className="mb-0 mt-5 font-size-20 fw-bold">
          Valor Total: {totalValue} Reais
        </p>
        <p className="mb-0 mt-3 font-size-20">Status:</p>
        <input type="text" defaultValue={status.description} disabled />
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
            Atualizar
          </button>
        </div>
      </div>
      <ClientDataModal
        show={clientDataModal}
        close={closeClientDataModal}
        budgetId={pathname.id}
      />
      <CostModal show={costModal} close={closeCostModal} cost={cost} />
    </div>
  );
}
export default ViewBudgetPage;
