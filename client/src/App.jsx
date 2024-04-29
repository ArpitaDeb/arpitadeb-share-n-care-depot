import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Inventory from './pages/Inventory/Inventory';
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
// import { WarehousePage } from './pages/Warehouse/WarehousePage';
import { AddWarehouse } from './components/WarehouseComponent/addWarehouse';
import EditWarehouse from './components/WarehouseComponent/editWarehouse';
import { ItemDetailPage } from './pages/ItemDetailsPage/ItemDetailpage';
import { DeleteWarehouse } from './components/ModalWindows/deleteWarehouse';
import { DeleteInventory } from './components/ModalWindows/deleteInventory';

import './styles/partials/_global.scss';

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
        <Profile setIsUserLoggedIn={setIsUserLoggedIn} />
      ) : (
        <Login setIsUserLoggedIn={setIsUserLoggedIn} />
      )}
        <Routes>
          <Route path="/" element={<Home />} />

          {/* inventory */}
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:inventoryId" element={<ItemDetailPage />} />
          {/* <Route path="/inventory/add-item" element={<AddInventory />} />
          <Route path="/inventory/edit-item/:inventoryId" element={<EditInventory />} /> */}
          <Route path="/inventory/delete-item/:inventoryId" element={<DeleteInventory />} />

          {/* warehouses */}
          {/* <Route path="/warehouse-details" element={<WarehousePage />} />
          <Route path="/warehouses/:warehouseId" element={<WarehousePage />} />
          <Route path="/warehouse/add" element={<AddWarehouse />} />
          <Route path="/warehouse/:warehouse_id/edit" element={<EditWarehouse />} />
          <Route path="/warehouses/delete-warehouse/:warehouseId" element={<DeleteWarehouse />} /> */}
        </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
