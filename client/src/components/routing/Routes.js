import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ConnectWallet from "../../pages/ConnectWallet";
import Dashboard from "../../pages/Dashboard";
import NotFoundPage from "../../pages/NotFoundPage";
import Play from "../../pages/Play";

const AppRoutes = () => {
  useEffect(() => {}, []);

  return (
    <Routes>
      <Route path="/" element={<ConnectWallet />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/play" element={<Play />} />
      <Route element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
