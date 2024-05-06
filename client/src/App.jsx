import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
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
      <AuthProvider>
        <BrowserRouter>
          <header>
            <Navbar />
          </header>
          <Routes>
            {isUserLoggedIn && (
              <Route
                path="/profile"
                element={<Profile setIsUserLoggedIn={setIsUserLoggedIn} />}
              />
            )}
            <Route
              path="/profile"
              element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            <Route
              path="/signup"
              element={<SignUp setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            <Route path="/inventory" element={<Inventory />} />
            <Route
              path="/inventory/upload"
              element={<UploadPage setIsAdminLoggedIn={setIsAdminLoggedIn} />}
            />
            <Route
              path="/inventory/delete/:inventoryId"
              element={
                <DeleteInventory setIsAdminLoggedIn={setIsAdminLoggedIn} />
              }
            />
            <Route
              path="/inventory/:inventoryId"
              element={<ItemDetailPage setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            <Route
              path="/inventory/reserve/:inventoryId"
              element={
                <ReservationPage setIsUserLoggedIn={setIsUserLoggedIn} />
              }
            />
            <Route
                path="/"
                element={<Home />}
              />
          </Routes>
          <footer>
            <Footer />
          </footer>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
