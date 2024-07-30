import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { getGrossIncomeDataRequest } from "../../services/reportService";
import Spinner from "react-bootstrap/Spinner";

function GrossIncome() {
  const [year, setYear] = useState(
    parseInt(new Date().getFullYear().toString().substr(-4))
  );
  const [grossIncomeData, setGrossIncomeData] = useState([]);
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
  const [loader, setLoader] = useState(true);

  function formmatValueArray() {
    const valueArray = [year.toString()];
    for (let k = 0; k < grossIncomeData.length; k++) {
      valueArray.push(grossIncomeData[k]);
    }
    while (valueArray.length !== 13) {
      valueArray.push(0);
    }
    return valueArray;
  }

  function changeYear(year) {
    setLoader(true);
    setYear(year);
    getGrossIncomeDataRequest(year).then((response) => {
      setGrossIncomeData(response.data);
    });
    formmatValueArray();
    setLoader(false);
  }

  const options = {
    title: "Receita Bruta",
    hAxis: {
      title: "Ano",
    },
    vAxis: {
      title: "Valores em Reais",
    },
    backgroundColor: "transparent",
  };

  useEffect(() => {
    getGrossIncomeDataRequest(year).then((response) => {
      setGrossIncomeData(response.data);
      setLoader(false);
    });
  }, [year]);

  return (
    <div>
      <div className="text-center">
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
        {!loader ? (
          <Chart
            chartType="ColumnChart"
            width="80%"
            height="500px"
            data={data}
            options={options}
          />
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
    </div>
  );
}
export default GrossIncome;
