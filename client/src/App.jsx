import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
// import { Page } from './pages//Page';
import { ItemDetailPage } from "./pages/ItemDetailsPage/ItemDetailpage";
import ReservationPage from "./pages/Reservation/ReservationPage";
import { DeleteInventory } from "./components/ModalWindows/deleteInventory";
import UploadPage from "./pages/UploadPage/UploadPage";

import "./styles/partials/_global.scss";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
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
            <Route path="/inventory/upload" element={<UploadPage />} />
            <Route
              path="/inventory/delete/:inventoryId"
              element={<DeleteInventory />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            <Route
              path="/signup"
              element={<SignUp setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            <Route
              path="/inventory/:inventoryId"
              element={<ItemDetailPage />}
            />
            <Route path="/inventory/reserve/:inventoryId" element={<ReservationPage />} />
            {/* <Route path="/inventory/add-item" element={<AddInventory />} />
          <Route path="/inventory/edit-item/:inventoryId" element={<EditInventory />} /> */}
            {/* Other routes for non-logged-in users */}
          </Routes>
        )}
        <Routes>
          <Route path="/inventory" setIsAdminLoggedIn={setIsAdminLoggedIn} element={<Inventory />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
