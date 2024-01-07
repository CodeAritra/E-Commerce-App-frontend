import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const authContext = createContext();

const Authprovider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedata = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedata.user,
        token: parsedata.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <authContext.Provider value={[auth, setAuth]}>
      {children}
    </authContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(authContext);

export { useAuth, Authprovider };
