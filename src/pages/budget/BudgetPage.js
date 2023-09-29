import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { isEmpty } from "../../stringHelper";
import EditIcon from "@mui/icons-material/Edit";
import {
  getBudgetListRequest,
  filterBudgetListRequest,
} from "../../services/budgetService";
import VisibilityIcon from "@mui/icons-material/Visibility";

function BudgetPage() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

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
              <th>Editar</th>
              <th>Visualizar</th>
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
                createdAt,
              }) => (
                <tr key={id}>
                  <td>{new Date(createdAt).toLocaleDateString()}</td>
                  <td>{client.name}</td>
                  <td>{plate}</td>
                  <td>
                    {bikeName} {bikeBrand}
                  </td>
                  <td>{status.description}</td>
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
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default BudgetPage;
