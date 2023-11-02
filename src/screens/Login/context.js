import { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../constant/toast";
import useAuthen from "../../hooks/useAuthen";
import { login, signup } from "../../services/authService";

//context
export const LoginContext = createContext({});

//hook
export const useLoginContext = () => useContext(LoginContext);

//provider
export const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "currentuser",
    "userid",
    "role",
  ]);
  const { isAuthenticated, setIsAuthenticated } = useAuthen();
  const handleSignup = async (username, name, password, phone, email, role) => {
    let tmp = `{ "username": "${username}","name": "${name}", "password": "${password}", "phone": "${phone}", "email": "${email}", "role": "${role}"}`;
    let params = JSON.parse(tmp);
    if (username && password && phone && email && role) {
      const response = await signup(params);
      console.log({ response });
      if (response?.token) {
        toastSuccess("Success Notification !");
        await setCookie("currentuser", response?.token);
        await setCookie("userid", response?.user._id);
        await setCookie("role", response.user.role);

        navigate("/home");
        window.location.reload();
      } else {
        toast.error("Can not sign up!");
      }
    } else {
      toast.error("Can not sign up!");
    }
  };

  const handleLogin = async (username, password) => {
    let tmp = `{ "username": "${username}", "password": "${password}" }`;
    let params = JSON.parse(tmp);
    if (username && password) {
      const response = await login(params);
      console.log({ response });
      if (response?.token) {
        toastSuccess("Success Notification !");
        await setCookie("currentuser", response?.token);
        await setCookie("userid", response?.user._id);
        await setCookie("role", response.user.role);
        setIsAuthenticated(true);

        navigate("/home");
        window.location.reload();
      } else toastError(response?.error);
    } else {
      toastError("Error");
    }
  };

  const value = useMemo(
    () => ({
      handleSignup,
      handleLogin,
    }),
    []
  );
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
