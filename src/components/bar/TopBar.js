import "./topBar.css";
import TopBarItem from "./TopBarItem";
import logo from "../../images/ChicoRacingLogo.png";

function TopBar() {
  return (
    <div className="container-topbar">
      <div className="image-block">
        <img
          width="100%"
          height="100%"
          src={logo}
          alt="Logo Chico Racing Oficina"
          className="container-topbar"
        />
      </div>
      <div className="button-block">
        <TopBarItem url="/" title="Home" />
        <TopBarItem url="/budget" title="Orçamentos" />
        <TopBarItem url="/client" title="Clientes" />
        <TopBarItem url="/bike" title="Motos" />
        <TopBarItem url="/part" title="Peças" />
        <TopBarItem url="/stock" title="Estoque" />
        <TopBarItem url="/services" title="Serviços" />
        <TopBarItem url="/supplier" title="Fornecedores" />
      </div>
    </div>
  );
}
export default TopBar;
