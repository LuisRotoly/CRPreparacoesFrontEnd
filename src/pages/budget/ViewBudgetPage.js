import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBudgetByIdRequest } from "../../services/budgetService";
import Table from "react-bootstrap/Table";

function ViewBudgetPage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [plate, setPlate] = useState("");
  const [bike, setBike] = useState("");
  const [client, setClient] = useState("");
  const [laborOrBikePartBudgetList, setLaborOrBikePartBudgetList] = useState(
    []
  );
  const [status, setStatus] = useState("");
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    getBudgetByIdRequest(pathname.id).then((response) => {
      setClient(response.data.client.name);
      setBike(response.data.bikeName + " " + response.data.bikeBrand);
      setPlate(response.data.plate);
      setTotalValue(response.data.totalValue);
      setLaborOrBikePartBudgetList(response.data.laborOrBikePartBudgetList);
      setStatus(response.data.status);
    });
  }, [pathname.id]);

  function gotoBackPage() {
    navigate("/budget");
  }

  return (
    <div className="text-center mt-5">
      <div>
        <p className="mb-0 mt-3 font-size-20">Cliente:</p>
        <input type="text" defaultValue={client} disabled />
        <p className="mb-0 mt-3 font-size-20">Placa:</p>
        <input type="text" defaultValue={plate} disabled />
        <p className="mb-0 mt-3 font-size-20">Moto:</p>
        <input type="text" defaultValue={bike} disabled />
        <br />
        <div className="align-center">
          <Table className="table-preferences">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>ValorTotal</th>
              </tr>
            </thead>
            <tbody>
              {laborOrBikePartBudgetList.map(
                ({ name, quantity, value }, index) => (
                  <tr key={index}>
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td>{value}</td>
                    <td>{quantity * value}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
        <p className="mb-0 mt-5 font-size-20 fw-bold">
          Valor Total: {totalValue} Reais
        </p>
        <p className="mb-0 mt-3 font-size-20">Status:</p>
        <input type="text" defaultValue={status} disabled />
        <div className="text-center mt-4">
          <button className="btn btn-primary me-3" onClick={gotoBackPage}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
export default ViewBudgetPage;
