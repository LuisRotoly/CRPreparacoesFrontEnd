import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function gotoSingleSale() {
    navigate("/singleSale");
  }

  return (
    <div className="text-center div-title">
      <button className="btn btn-outline-primary" onClick={gotoSingleSale}>
        Venda Avulsa
      </button>
    </div>
  );
}
export default HomePage;
