import { useState } from "react";
import { useNavigate } from "react-router";
import { Route, Routes } from "react-router-dom";
import { getUser } from "./lib/auth";
import NavBar from "./components/NavBar";
import StorePage from "./pages/StorePage";
import CreateProductPage from "./pages/CreateProductPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import CustomerList from "./pages/CustomerList";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser);

  const handleLogin = (user) => {
    setUser(user);
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <main className="section">
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/stores/:storeId" element={<StorePage />} />
          <Route path="/products/new" element={<CreateProductPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
