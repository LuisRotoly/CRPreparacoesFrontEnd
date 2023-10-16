import "./topBar.css";
import TopBarItem from "./TopBarItem";

function TopBar() {
  return (
    <div className="container-topbar">
      <div className="button-block">
        <TopBarItem url="/" title="Home" />
        <TopBarItem url="/budget" title="Orçamentos" />
        <TopBarItem url="/client" title="Clientes" />
        <TopBarItem url="/bike" title="Motos" />
        <TopBarItem url="/part" title="Peças" />
        <TopBarItem url="/services" title="Serviços" />
        <TopBarItem url="/supplier" title="Fornecedores" />
      </div>
    </div>
  );
}
export default TopBar;
