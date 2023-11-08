import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getFormmatedDate, isEmpty } from "../../../stringHelper";
import EditIcon from "@mui/icons-material/Edit";
import {
  getBudgetListRequest,
  filterBudgetListRequest,
  removeBudgetByIdRequest,
} from "../../../services/budgetService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteModal from "../../../components/modal/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function BudgetFullContent() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeBudget, setRemoveBudget] = useState("");

  useEffect(() => {
    getBudgetList();
  }, []);

  function getBudgetList() {
    getBudgetListRequest().then((response) => {
      setData(response.data);
      setOriginalData(response.data);
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (!isEmpty(event.target.value)) {
      filterBudgetListRequest(event.target.value).then((response) => {
        setData(response.data);
      });
    } else {
      setData(originalData);
    }
  }

  function gotoCreatePage() {
    navigate("/budget/create");
  }

  function openDeleteModal(id) {
    setRemoveBudget(id);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
  }

  function deleteBudget() {
    removeBudgetByIdRequest(removeBudget).then(() => getBudgetList());
    setRemoveBudget("");
    closeDeleteModal();
  }

  return (
    <div>
      <div className="text-center div-title">
        <p className="page-title">Lista de Orçamentos</p>
        <span className="font-size-18">Pesquisar: </span>
        <input
          maxLength="100"
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="me-5"
        />
        <button className="btn btn-outline-primary" onClick={gotoCreatePage}>
          Criar Novo Orçamento
        </button>
      </div>
      <div className="align-center">
        <Table className="table-preferences">
          <thead>
            <tr>
              <th>Data</th>
              <th>Cliente</th>
              <th>Placa</th>
              <th>Moto</th>
              <th>Status</th>
              <th>Valor Total</th>
              <th>Editar</th>
              <th>Visualizar</th>
              <th>Pagar</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                id,
                client,
                plate,
                bikeBrand,
                bikeName,
                status,
                totalValue,
                createdAt,
              }) => (
                <tr key={id}>
                  <td>{getFormmatedDate(createdAt)}</td>
                  <td>{client.name}</td>
                  <td>{plate}</td>
                  <td>
                    {bikeName} {bikeBrand}
                  </td>
                  <td>{status.description}</td>
                  <td>R$ {totalValue.toFixed(2)}</td>
                  <td>
                    {status.description === "Cancelado" ||
                    status.description === "Finalizado" ? null : (
                      <Link to={`/budget/edit/${id}`}>
                        <EditIcon className="edit-icon" />
                      </Link>
                    )}
                  </td>
                  <td>
                    <Link to={`/budget/view/${id}`}>
                      <VisibilityIcon />
                    </Link>
                  </td>
                  <td>
                    {status.description === "Finalizado" ? (
                      <Link to={`/finance/pay/${id}`}>
                        <AttachMoneyIcon className="money-icon" />
                      </Link>
                    ) : null}
                  </td>
                  <td>
                    <DeleteIcon
                      className="default-remove-icon"
                      onClick={() => openDeleteModal(id)}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
      <DeleteModal
        show={deleteModal}
        close={closeDeleteModal}
        title={"Excluir o orçamento?"}
        remove={deleteBudget}
      />
    </div>
  );
}
export default BudgetFullContent;
