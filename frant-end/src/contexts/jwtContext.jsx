import { createContext, useEffect, useReducer, useCallback } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { LoadingProgress } from "@/components/loader";

const AUTH_URLS = import.meta.env.VITE_AUTH_URL;

const API_URL = import.meta.env.VITE_LV_URL;

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};



const setSession = (accessToken) => {
  if (accessToken) {
    Cookies.set("accessToken", accessToken, { expires: 1 });
    axios.defaults.headers.common.Authorization = `Jwt ${accessToken}`;
  } else {
    Cookies.remove("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isInitialized: true,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        
      };

    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback(async (email, password) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    try
    {
      console.log(AUTH_URLS)
      const { data } = await axios.post(`${AUTH_URLS}/login`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }

    );
      setSession(data.token);
      const userResponse = await axios.get(`${AUTH_URLS}/me`);
      dispatch({
        type: "LOGIN",
        payload: {
          user: userResponse.data,
        },
      });
    } catch (error) {
    }
  }, []);

  const logout = () => {
    Cookies.remove("accessToken");
    dispatch({ type: "LOGOUT" });
  };

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const initialize = async () => {
      try {
        if (accessToken) {
          setSession(accessToken);
          const userResponse = await axios.get(`${AUTH_URLS}/me`);
          dispatch({
            type: "INIT",
            payload: {
              user: userResponse.data,
              isAuthenticated: true,
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              user: null,
              isAuthenticated: false,
              fpta: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INIT",
          payload: {
            user: null,
            isAuthenticated: false,
            fpta: null,
          },
        });
        console.error("Initialization failed:", err.message);
      }
    };

    initialize();
  }, [accessToken]);

  if (!state.isInitialized) return <LoadingProgress />;

  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
