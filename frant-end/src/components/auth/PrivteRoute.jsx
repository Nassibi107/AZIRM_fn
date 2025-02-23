import { Navigate } from "react-router-dom"; 
import useAuth from "@/hooks/useAuth";
import useLocation from "@/hooks/useLocation";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  if (user.role == "admin") {
    return <>{children}</>;
  }
  return (
    <Navigate 
      replace 
      to="/denied" 
      state={{ from: pathname }} 
    />
  );
};

export default PrivateRoute;
