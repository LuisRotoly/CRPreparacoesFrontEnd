import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  getBikeListRequest,
  filterBikeListRequest,
} from "../../services/bikeService";
import EditIcon from "@mui/icons-material/Edit";
import { isEmpty } from "../../stringHelper";

function BikePage() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBikeListRequest().then((response) => {
      setData(response.data);
      setOriginalData(response.data);
    });
  }, []);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (!isEmpty(event.target.value)) {
      filterBikeListRequest(event.target.value).then((response) => {
        setData(response.data);
      });
    } else {
      setData(originalData);
    }
  }

  function gotoCreatePage() {
    navigate("/bike/create");
  }

  return (
    <div>
      <div className="text-center div-title">
        <p className="page-title">Lista de Motos</p>
        <span className="font-size-18">Pesquisar: </span>
        <input
          maxLength="100"
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="me-5"
        />
        <button className="btn btn-outline-primary" onClick={gotoCreatePage}>
          Criar Nova Moto
        </button>
      </div>
      <div className="align-center">
        <Table className="table-preferences">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Marca</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, bikeBrand }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{bikeBrand.name}</td>
                <td>
                  <Link to={`/bike/edit/${id}`}>
                    <EditIcon className="edit-icon" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default BikePage;
