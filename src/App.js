import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import HomePage from "./pages/HomePage";
import ClientPage from "./pages/client/ClientPage";
import BikePage from "./pages/bike/BikePage";
import BikePartPage from "./pages/bikePart/BikePartPage";
import EditClientPage from "./pages/client/EditClientPage";
import CreateClientPage from "./pages/client/CreateClientPage";
import CreateBikePage from "./pages/bike/CreateBikePage";
import EditBikePage from "./pages/bike/EditBikePage";
import CreateBikePartPage from "./pages/bikePart/CreateBikePartPage";
import EditBikePartPage from "./pages/bikePart/EditBikePartPage";
import SupplierPage from "./pages/supplier/SupplierPage";
import CreateSupplierPage from "./pages/supplier/CreateSupplierPage";
import EditSupplierPage from "./pages/supplier/EditSupplierPage";
import BikeServicePage from "./pages/bikeService/BikeServicePage";
import CreateBikeServicePage from "./pages/bikeService/CreateBikeServicePage";
import EditBikeServicePage from "./pages/bikeService/EditBikeServicePage";
import BudgetPage from "./pages/budget/BudgetPage";
import CreateBudgetPage from "./pages/budget/CreateBudgetPage";
import EditBudgetPage from "./pages/budget/EditBudgetPage";
import ViewBudgetPage from "./pages/budget/ViewBudgetPage";
import StockPage from "./pages/stock/StockPage";
import EditStockPage from "./pages/stock/EditStockPage";
import CreateBudgetSketchPage from "./pages/budget/sketch/CreateBudgetSketchPage";
import EditBudgetSketchPage from "./pages/budget/sketch/EditBudgetSketchPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/client/edit/:id" element={<EditClientPage />} />
          <Route path="/client/create" element={<CreateClientPage />} />
          <Route path="/bike" element={<BikePage />} />
          <Route path="/bike/create" element={<CreateBikePage />} />
          <Route path="/bike/edit/:id" element={<EditBikePage />} />
          <Route path="/part" element={<BikePartPage />} />
          <Route path="/part/create" element={<CreateBikePartPage />} />
          <Route path="/part/edit/:id" element={<EditBikePartPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/stock/edit/:id" element={<EditStockPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/supplier/create" element={<CreateSupplierPage />} />
          <Route path="/supplier/edit/:id" element={<EditSupplierPage />} />
          <Route path="/services" element={<BikeServicePage />} />
          <Route path="/services/create" element={<CreateBikeServicePage />} />
          <Route path="/services/edit/:id" element={<EditBikeServicePage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/budget/create" element={<CreateBudgetPage />} />
          <Route path="/budget/edit/:id" element={<EditBudgetPage />} />
          <Route path="/budget/view/:id" element={<ViewBudgetPage />} />
          <Route
            path="/budget/sketch/create"
            element={<CreateBudgetSketchPage />}
          />
          <Route
            path="/budget/sketch/edit/:id"
            element={<EditBudgetSketchPage />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
