import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getFormmatedDate } from "../../../stringHelper";
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
import "./budget.css";
import { getStatusListRequest } from "../../../services/statusService";

function BudgetFullContent() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeBudget, setRemoveBudget] = useState("");
  const [statusId, setStatusId] = useState(-1);
  const [statusList, setStatusList] = useState([]);
  const [isChecked, setIsChecked] = useState(
    Array(statusList.length).fill(false)
  );

  useEffect(() => {
    getBudgetList();
    getStatusListRequest().then((response) => {
      setStatusList(response.data);
    });
  }, []);

  function getBudgetList() {
    getBudgetListRequest().then((response) => {
      setData(response.data);
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    filterBudgetListRequest(event.target.value, statusId).then((response) => {
      setData(response.data);
    });
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

  function handleIsCheckedChange(index, id) {
    if (isChecked[index] === true) {
      setIsChecked(Array(statusList.length).fill(false));
      setStatusId(-1);
      filterBudgetListRequest(search, -1).then((response) => {
        setData(response.data);
      });
    } else {
      let newList = [Array(statusList.length).fill(false)];
      newList[index] = true;
      setIsChecked(newList);
      setStatusId(id);
      filterBudgetListRequest(search, id).then((response) => {
        setData(response.data);
      });
    }
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
      <div className="status mb-3">
        {statusList.map(({ id, description }, index) => (
          <div key={id}>
            <input
              className="me-1"
              type="checkbox"
              defaultChecked={isChecked[index]}
              onChange={() => handleIsCheckedChange(index, id)}
            />{" "}
            <span>{description}</span>
          </div>
        ))}
      </div>
      <div className="align-center">
        <Table className="table-preferences">
          <thead className="scroll-thead">
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
          <tbody className="scroll-tbody">
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
                <tr key={id} className="scroll-trow">
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
