import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { isEmpty } from "../../../stringHelper";
import EditIcon from "@mui/icons-material/Edit";
import {
  getBudgetSketchListRequest,
  filterBudgetSketchListRequest,
  removeBudgetSketchByIdRequest,
} from "../../../services/budgetSketchService";
import DeleteModal from "../../../components/modal/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";

function BudgetSketch() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeBudgetSketch, setRemoveBudgetSketch] = useState("");

  useEffect(() => {
    getBudgetSketchList();
  }, []);

  function getBudgetSketchList() {
    getBudgetSketchListRequest().then((response) => {
      setData(response.data);
      setOriginalData(response.data);
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (!isEmpty(event.target.value)) {
      filterBudgetSketchListRequest(event.target.value).then((response) => {
        setData(response.data);
      });
    } else {
      setData(originalData);
    }
  }

  function gotoCreatePage() {
    navigate("/budget/sketch/create");
  }

  function openDeleteModal(id) {
    setRemoveBudgetSketch(id);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
  }

  function deleteBudgetSketch() {
    removeBudgetSketchByIdRequest(removeBudgetSketch).then(() =>
      getBudgetSketchList()
    );
    setRemoveBudgetSketch("");
    closeDeleteModal();
  }

  return (
    <div>
      <div className="text-center div-title">
        <p className="page-title">Avulso</p>
        <span className="font-size-18">Pesquisar: </span>
        <input
          maxLength="100"
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="me-5"
        />
        <button className="btn btn-outline-primary" onClick={gotoCreatePage}>
          Criar Novo Avulso
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
              <th>Editar</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, client, plate, bike, createdAt }) => (
              <tr key={id}>
                <td>{new Date(createdAt).toLocaleDateString()}</td>
                <td>{client}</td>
                <td>{plate}</td>
                <td>{bike}</td>
                <td>
                  <Link to={`/budget/sketch/edit/${id}`}>
                    <EditIcon className="edit-icon" />
                  </Link>
                </td>
                <td>
                  <DeleteIcon
                    className="default-remove-icon"
                    onClick={() => openDeleteModal(id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <DeleteModal
        show={deleteModal}
        close={closeDeleteModal}
        title={"Excluir o orçamento?"}
        remove={deleteBudgetSketch}
      />
    </div>
  );
}
export default BudgetSketch;
