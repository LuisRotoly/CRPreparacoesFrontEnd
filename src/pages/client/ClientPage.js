import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  getClientsListRequest,
  filterClientsListRequest,
} from "../../services/clientService";
import EditIcon from "@mui/icons-material/Edit";
import { isEmpty } from "../../stringHelper";

function ClientPage() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getClientsListRequest().then((response) => {
      setData(response.data);
      setOriginalData(response.data);
    });
  }, []);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    if (!isEmpty(event.target.value)) {
      filterClientsListRequest(event.target.value).then((response) => {
        setData(response.data);
      });
    } else {
      setData(originalData);
    }
  }

  function gotoCreatePage() {
    navigate("/client/create");
  }

  return (
    <div>
      <div className="text-center div-title">
        <p className="page-title">Lista de Clientes</p>
        <span className="font-size-18">Pesquisar: </span>
        <input
          maxLength="100"
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="me-5"
        />
        <button className="btn btn-outline-primary" onClick={gotoCreatePage}>
          Criar Novo Cliente
        </button>
      </div>
      <div className="align-center">
        <Table className="table-preferences">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Telefone</th>
              <th>Apelido</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, cpfcnpj, phone, nickname }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{cpfcnpj}</td>
                <td>{phone}</td>
                <td>{nickname}</td>
                <td>
                  <Link to={`/client/edit/${id}`}>
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
export default ClientPage;
