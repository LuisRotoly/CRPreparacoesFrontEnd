import { Outlet } from "react-router-dom";
import Topbar from "../components/bar/TopBar";

function DefaultLayout() {
  return (
    <div>
      <Topbar />
      <div className="image-logo">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
