import { Link } from "react-router-dom";
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

function StockPage() {
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
        <p className="page-title">Estoque de Peças</p>
        <span className="font-size-18">Pesquisar: </span>
        <input
          maxLength="100"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="align-center">
        <Table className="table-preferences">
          <thead>
            <tr>
              <th>Peça</th>
              <th>Qtd Estoque</th>
              <th>Lista de Motos</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, stockQuantity }) => {
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{stockQuantity} peças</td>
                  <td>
                    <VisibilityIcon
                      className="default-view-icon"
                      onClick={() => openBikeListModal(id)}
                    />
                  </td>
                  <td>
                    <Link to={`/stock/edit/${id}`}>
                      <EditIcon className="edit-icon" />
                    </Link>
                  </td>
                </tr>
              );
            })}
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
export default StockPage;
