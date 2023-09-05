import "./topBar.css";
import MenuButton from "../button/MenuButton";
import { Link, useLocation } from "react-router-dom";

function TopBarItem(props) {
  const location = useLocation();

  function getButtonClassname(pageUrl, url) {
    if (pageUrl === url && url === "/") {
      return "menu-button-enable";
    } else {
      return pageUrl.includes(url) && url !== "/"
        ? "menu-button-enable"
        : "menu-button";
    }
  }

  return (
    <Link to={props.url}>
      <MenuButton
        title={props.title}
        buttonCss={getButtonClassname(location.pathname, props.url)}
      ></MenuButton>
    </Link>
  );
}
export default TopBarItem;
