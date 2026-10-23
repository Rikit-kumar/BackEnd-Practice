import { createRoot } from "react-dom/client";
import "./index.css";
import AuthRoutes from "./routes/AuthRoutes.jsx";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <AuthRoutes />
    <ToastContainer autoClose={1000} />
  </AuthContextProvider>,
);
