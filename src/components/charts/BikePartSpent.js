import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { getBikePartSpentDataRequest } from "../../services/reportService";
import Spinner from "react-bootstrap/Spinner";

function BikePartSpent() {
  const [year, setYear] = useState(
    parseInt(new Date().getFullYear().toString().substr(-4))
  );
  const [bikePartSpent, setBikePartSpent] = useState([]);
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
    for (let k = 0; k < bikePartSpent.length; k++) {
      valueArray.push(bikePartSpent[k]);
    }
    while (valueArray.length !== 13) {
      valueArray.push(0);
    }
    return valueArray;
  }

  function changeYear(year) {
    setLoader(true);
    setYear(year);
    getBikePartSpentDataRequest(year).then((response) => {
      setBikePartSpent(response.data);
    });
    formmatValueArray();
    setLoader(false);
  }

  const options = {
    title: "Gastos com peças",
    hAxis: {
      title: "Ano",
    },
    vAxis: {
      title: "Valores em Reais",
    },
    backgroundColor: "transparent",
  };

  useEffect(() => {
    getBikePartSpentDataRequest(year).then((response) => {
      setBikePartSpent(response.data);
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
export default BikePartSpent;
