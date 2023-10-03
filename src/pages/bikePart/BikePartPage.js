import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  getBikePartListRequest,
  filterBikePartListRequest,
} from "../../services/bikePartService";
import EditIcon from "@mui/icons-material/Edit";
import { isEmpty } from "../../stringHelper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BikeListModal from "../../components/modal/BikeListModal";

function BikePartPage() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [bikeListModal, setBikeListModal] = useState(false);
  const [bikePartId, setBikePartId] = useState("");

  useEffect(() => {
    getBikePartListRequest().then((response) => {
      setData(response.data);
      setOriginalData(response.data);
    });
  }, []);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (!isEmpty(event.target.value)) {
      filterBikePartListRequest(event.target.value).then((response) => {
        setData(response.data);
      });
    } else {
      setData(originalData);
    }
  }

  function gotoCreatePage() {
    navigate("/part/create");
  }

  function openBikeListModal(bikePartId) {
    setBikePartId(bikePartId);
    setBikeListModal(true);
  }

  function closeBikeListModal() {
    setBikeListModal(false);
  }

  return (
    <div>
      <div className="text-center div-title">
        <p className="page-title">Lista de Peças</p>
        <span className="font-size-18">Pesquisar: </span>
        <input
          maxLength="100"
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="me-5"
        />
        <button className="btn btn-outline-primary" onClick={gotoCreatePage}>
          Criar Nova Peça
        </button>
      </div>
      <div className="align-center">
        <Table className="table-preferences">
          <thead>
            <tr>
              <th>Peça</th>
              <th>Valor</th>
              <th>Qtd Estoque</th>
              <th>Lista de Motos</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ id, name, value, profitPercentage, stockQuantity }) => {
                let finalValue =
                  parseFloat(value) +
                  (parseFloat(value) * parseFloat(profitPercentage)) / 100;
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>R$ {finalValue}</td>
                    <td>{stockQuantity} peças</td>
                    <td>
                      <VisibilityIcon
                        className="default-view-icon"
                        onClick={() => openBikeListModal(id)}
                      />
                    </td>
                    <td>
                      <Link to={`/part/edit/${id}`}>
                        <EditIcon className="edit-icon" />
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </div>
      <BikeListModal
        show={bikeListModal}
        close={closeBikeListModal}
        bikePartId={bikePartId}
      />
    </div>
  );
}
export default BikePartPage;
