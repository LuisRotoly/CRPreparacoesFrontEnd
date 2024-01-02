import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getFormmatedDate, getFormmatedMoney } from "../../stringHelper";
import PrintIcon from "@mui/icons-material/Print";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { getSingleSaleByIdRequest } from "../../services/singleSaleService";
import SingleSalePdf from "../../components/pdf/SingleSalePdf";

function ViewSingleSalePage() {
  const pathname = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState("");
  const [singleSaleRelBikePartList, setSingleSaleRelBikePartList] = useState(
    []
  );
  const [totalValue, setTotalValue] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    getSingleSaleByIdRequest(pathname.id).then((response) => {
      setClient(response.data.clientName);
      setTotalValue(response.data.totalValue);
      setSingleSaleRelBikePartList(response.data.singleSaleRelBikePartList);
      setCreatedDate(response.data.createdAt);
    });
  }, [pathname.id]);

  function gotoBackPage() {
    navigate("/finance");
  }

  return (
    <div className="text-center mt-5">
      <div>
        <div className="data">
          <div className="me-3">Data: {getFormmatedDate(createdDate)}</div>
          <PDFDownloadLink
            document={
              <SingleSalePdf
                client={client}
                bike={[]}
                address={""}
                singleSaleRelBikePartList={singleSaleRelBikePartList}
                totalValue={totalValue}
                createdDate={createdDate}
              />
            }
            fileName={client + "-orcamentoAvulso.pdf"}
          >
            <PrintIcon />
          </PDFDownloadLink>
        </div>
        <p className="mb-0 mt-3 font-size-20">Cliente:</p>
        <input type="text" defaultValue={client} disabled className="me-3" />
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
              {singleSaleRelBikePartList.map(
                ({ bikePart, quantity, value }) => (
                  <tr key={bikePart.id}>
                    <td>{bikePart.name}</td>
                    <td>{quantity}</td>
                    <td>R$ {getFormmatedMoney(value)}</td>
                    <td>R$ {getFormmatedMoney(quantity * value)}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
        <p className="mb-0 mt-5 font-size-20 fw-bold">
          Valor Total: {getFormmatedMoney(totalValue)} Reais
        </p>
        <div className="text-center mt-4">
          <button className="btn btn-primary me-3" onClick={gotoBackPage}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
export default ViewSingleSalePage;
