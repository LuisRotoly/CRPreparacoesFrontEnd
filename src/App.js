import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import HomePage from "./pages/HomePage";
import ClientPage from "./pages/client/ClientPage";
import BikePage from "./pages/bike/BikePage";
import PartPage from "./pages/part/PartPage";
import EditClientPage from "./pages/client/EditClientPage";
import CreateClientPage from "./pages/client/CreateClientPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/client/edit/:id" element={<EditClientPage />} />
            <Route path="/client/create" element={<CreateClientPage />} />
            <Route path="/bike" element={<BikePage />} />
            <Route path="/part" element={<PartPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
