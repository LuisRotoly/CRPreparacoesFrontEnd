import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editBudgetNotesRequest,
  getBudgetByIdRequest,
} from "../../services/budgetService";
import { getBikeByPlateRequest } from "../../services/clientBikeService";
import Table from "react-bootstrap/Table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClientDataModal from "../../components/budgetModal/ClientDataModal";
import BikeDataModal from "../../components/budgetModal/BikeDataModal";
import { isEmpty } from "../../stringHelper";

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
  const [bikeDataModal, setBikeDataModal] = useState(false);
  const [bikeData, setBikeData] = useState("");

  useEffect(() => {
    getBudgetByIdRequest(pathname.id).then((response) => {
      setClient(response.data.client.name);
      setBike(response.data.bikeName + " " + response.data.bikeBrand);
      setPlate(response.data.plate);
      setLaborOrBikePartBudgetList(response.data.laborOrBikePartBudgetList);
      setDiscountPercentage(response.data.discountPercentage);
      setStatus(response.data.status);
      setPaymentFormat(response.data.paymentFormat);
      setKilometersDriven(response.data.kilometersDriven);
      setNotes(response.data.notes);
      setCreatedDate(response.data.createdAt);
    });
  }, [pathname.id]);

  function gotoBackPage() {
    navigate("/budget");
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

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function editBudget() {
    editBudgetNotesRequest(pathname.id, notes).then((_) => gotoBackPage());
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

  return (
    <div className="text-center mt-5">
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
        <input type="text" defaultValue={plate} disabled className="me-3" />
        <button className="btn btn-outline-primary" onClick={openBikeDataModal}>
          <VisibilityIcon />
        </button>
        <p className="mb-0 mt-3 font-size-20">Moto:</p>
        <input type="text" defaultValue={bike} disabled />
        <p className="mb-0 mt-3 font-size-20">Quilometragem:</p>
        <input type="number" defaultValue={kilometersDriven} disabled />
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
                    <td>R$ {value}</td>
                    <td>R$ {quantity * value}</td>
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
          Valor Total: {getTotalValue()} Reais
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
      <BikeDataModal
        show={bikeDataModal}
        close={closeBikeDataModal}
        bike={bikeData}
      />
    </div>
  );
}
export default ViewBudgetPage;
