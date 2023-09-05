import "./topBar.css";
import TopBarItem from "./TopBarItem";

function TopBar() {
  return (
    <div className="container-topbar">
      <div>
        <span className="title">CR Preparações</span>
        <TopBarItem url="/" title="Home" />
        <TopBarItem url="/client" title="Clientes" />
        <TopBarItem url="/bike" title="Motos" />
        <TopBarItem url="/part" title="Peças" />
      </div>
    </div>
  );
}
export default TopBar;
