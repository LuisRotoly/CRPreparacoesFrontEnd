import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { getReportDataRequest } from "../../services/reportService";

function ReportPage() {
  const [year, setYear] = useState(
    new Date().getFullYear().toString().substr(-4)
  );
  const [reportData, setReportData] = useState([]);
  const meses = [
    "Ano",
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const data = [meses, formmatValueArray()];

  function formmatValueArray() {
    const valueArray = [year.toString()];
    for (let k = 0; k < reportData.length; k++) {
      valueArray.push(reportData[k]);
    }
    return valueArray;
  }

  function changeYear(year) {
    setYear(year);
    getReportDataRequest(year).then((response) => {
      setReportData(response.data);
    });
    formmatValueArray();
  }

  const options = {
    title: "Receita Total Oficina",
    hAxis: {
      title: "Ano",
    },
    vAxis: {
      title: "Valores em Reais",
    },
    backgroundColor: "transparent",
  };

  useEffect(() => {
    getReportDataRequest(year).then((response) => {
      setReportData(response.data);
    });
  }, [year]);

  return (
    <div>
      <div className="text-center div-title">
        <p className="font-size-22">Selecione o Ano:</p>
        <button
          className="btn btn-primary me-3"
          onClick={(e) => changeYear(year - 1)}
        >
          Anterior
        </button>

        <span className="me-3 font-size-18">{year}</span>
        <button
          className="btn btn-primary"
          onClick={(e) => changeYear(year + 1)}
        >
          Próximo
        </button>
      </div>
      <div align="center">
        <Chart
          chartType="ColumnChart"
          width="80%"
          height="500px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}
export default ReportPage;
