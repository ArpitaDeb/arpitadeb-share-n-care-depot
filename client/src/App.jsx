import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
// import { WarehousePage } from './pages/Warehouse/WarehousePage';
import { AddWarehouse } from "./components/WarehouseComponent/addWarehouse";
import EditWarehouse from "./components/WarehouseComponent/editWarehouse";
import { ItemDetailPage } from "./pages/ItemDetailsPage/ItemDetailpage";
import { DeleteWarehouse } from "./components/ModalWindows/deleteWarehouse";
import { DeleteInventory } from "./components/ModalWindows/deleteInventory";
import UploadPage from "./pages/UploadPage/UploadPage";

import "./styles/partials/_global.scss";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        {isUserLoggedIn ? (
          <Routes>
            <Route
              path="/"
              element={<Profile setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            <Route path="/signup" element={<SignUp setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path="/inventory" element={<Inventory />} />
            
            <Route
              path="/inventory/:inventoryId"
              element={<ItemDetailPage />}
            />
            <Route
            path="/inventory/delete-item/:inventoryId"
            element={<DeleteInventory />}
          />
           {/* <Route path="/inventory/add-item" element={<AddInventory />} />
          <Route path="/inventory/edit-item/:inventoryId" element={<EditInventory />} /> */}
            {/* Other routes for non-logged-in users */}
          </Routes>
        )}
        <Routes>
        </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
