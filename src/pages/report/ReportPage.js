import { useState } from "react";
import GrossIncome from "../../components/charts/GrossIncome";
import NetRevenue from "../../components/charts/NetRevenue";
import BikePartSpent from "../../components/charts/BikePartSpent";

function ReportPage() {
  const [buttonSelection, setButtonSelection] = useState("");

  function changeChart(chartName) {
    setButtonSelection(chartName);
  }

  function isButtonActive(chartName) {
    if (buttonSelection === chartName) {
      return "btn btn-primary me-3";
    } else {
      return "btn btn-outline-primary me-3";
    }
  }

  return (
    <div>
      <div className="text-center div-title">
        <p className="font-size-22">Selecione o gráfico:</p>
        <button
          className={isButtonActive("grossIncome")}
          onClick={(e) => changeChart("grossIncome")}
        >
          Receita Bruta
        </button>
        <button
          className={isButtonActive("netRevenue")}
          onClick={(e) => changeChart("netRevenue")}
        >
          Receita Líquida
        </button>
        <button
          className={isButtonActive("bikePartSpent")}
          onClick={(e) => changeChart("bikePartSpent")}
        >
          Gastos com peças
        </button>
      </div>
      <div className="mt-5">
        {buttonSelection === "grossIncome" ? <GrossIncome /> : null}
        {buttonSelection === "netRevenue" ? <NetRevenue /> : null}
        {buttonSelection === "bikePartSpent" ? <BikePartSpent /> : null}
      </div>
    </div>
  );
}
export default ReportPage;
