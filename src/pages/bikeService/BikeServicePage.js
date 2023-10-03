import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  getBikeServiceListRequest,
  filterBikeServiceListRequest,
  removeBikeService,
} from "../../services/bikeServiceService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { isEmpty } from "../../stringHelper";
import DeleteModal from "../../components/modal/DeleteModal";

function BikeServicePage() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeBikeServiceId, setRemoveBikeServiceId] = useState("");

  useEffect(() => {
    getBikeServiceList();
  }, []);

  function getBikeServiceList() {
    getBikeServiceListRequest().then((response) => {
      setData(response.data);
      setOriginalData(response.data);
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (!isEmpty(event.target.value)) {
      filterBikeServiceListRequest(event.target.value).then((response) => {
        setData(response.data);
      });
    } else {
      setData(originalData);
    }
  }

  function gotoCreatePage() {
    navigate("/services/create");
  }

  function openDeleteModal(id) {
    setRemoveBikeServiceId(id);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
    setRemoveBikeServiceId("");
  }

  function deleteBikeService() {
    removeBikeService(removeBikeServiceId).then(() => {
      getBikeServiceList();
    });
    closeDeleteModal();
  }

  return (
    <div>
      <div className="text-center div-title">
        <p className="page-title">Lista de Serviços</p>
        <span className="font-size-18">Pesquisar: </span>
        <input
          maxLength="100"
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="me-5"
        />
        <button className="btn btn-outline-primary" onClick={gotoCreatePage}>
          Criar Novo Serviço
        </button>
      </div>
      <div className="align-center">
        <Table className="table-preferences">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, value }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{value} R$</td>
                <td>
                  <Link to={`/services/edit/${id}`}>
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
        title={"Excluir o serviço?"}
        remove={deleteBikeService}
      />
    </div>
  );
}
export default BikeServicePage;
