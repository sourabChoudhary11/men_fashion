import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../index.jsx";

const ProtectedRoute = ({ children }) => {
  const { authentication } = useContext(UserContext);

  if (!authentication) {
    return <Navigate to={"/account"} />
  }

  return children;
};

export default ProtectedRoute;
