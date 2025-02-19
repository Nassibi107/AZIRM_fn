import { Navigate } from "react-router-dom"; 
import useAuth from "@/hooks/useAuth";
import useLocation from "@/hooks/useLocation";

const PrivateRoute = ({ children, per }) => {
  const { pathname } = useLocation();
  const { fpta } = useAuth();
  if (fpta.includes(per)) {
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
