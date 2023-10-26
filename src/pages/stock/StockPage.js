import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  getBikePartListRequest,
  filterBikePartListRequest,
} from "../../services/bikePartService";
import EditIcon from "@mui/icons-material/Edit";
import { isEmpty } from "../../stringHelper";

function StockPage() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

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

  function getColor(stockQuantity) {
    if (stockQuantity <= 0) {
      return "text-danger";
    }
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
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, stockQuantity }) => {
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td className={getColor(stockQuantity)}>
                    {stockQuantity} peças
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
    </div>
  );
}
export default StockPage;
