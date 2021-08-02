import React, { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";
import { IAuthContextData } from "../interface/context/IAuthContextData";
import { IUserDto } from "../interface/user/IUser";
import { IPoi } from "../interface/poi/IPoi";

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [alert, setAlert] = useState<string>("");
  const [favorites, setFavorites] = useState<IPoi[] | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@GuiaTuristico::user");
    const storagedToken = localStorage.getItem("@GuiaTuristico::token");

    if (storagedToken && storagedUser) {
      setUser(storagedUser);
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  const Login = async (email: string, password: string, callback: Function) => {
    setLoading(true);
    try {
      const response = await api.post("/users/login", {
        email: email,
        password: password,
      });

      if (response.status === 201) {
        localStorage.setItem("@GuiaTuristico::user", response.data.email);
        localStorage.setItem(
          "@GuiaTuristico::token",
          response.data.access_token
        );
        localStorage.setItem("@GuiaTuristico::userid", response.data.id);
        setUser(response.data.email);
        api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
        setLoading(false);
        callback();
      }
    } catch (error) {
      if (error.response) {
        Logout();
        setLoading(false);
        setAlert(error.response.data.message);
      }
    }
  };

  const Logout = async () => {
    setUser(null);
    localStorage.removeItem("@GuiaTuristico::token");
    localStorage.removeItem("@GuiaTuristico::user");
    localStorage.removeItem("@GuiaTuristico::userid");
  };

  const Register = async (user: IUserDto, callback: Function) => {
    setLoading(true);
    try {
      const response = await api.post("/users/", {
        email: user.email,
        password: user.password,
        username: user.username,
      });

      if (response.status === 201) {
        setLoading(false);
        setAlert(response.data.message);
        callback();
      }
    } catch (error) {
      if (!error.response.ok) {
        Logout();
        setLoading(false);
        setAlert(error.response.data.message);
      }
    }
  };

  const getFavorites = async (userId: string) => {
    try {
      const response = await api.get(`/users/favorites/${userId}`);
      if (response.status === 200) {
        setFavorites(response.data);
      }
    } catch (error) {
      //faz nada
    }
  };

  const addFavorite = async (userId: string, poiId: string) => {
    try {
      setLoading(true);
      const response = await api.post(`/users/favorites/${userId}`, poiId);
      if (response.status === 201) {
        setLoading(false);
        setFavorites(response.data);
      }
    } catch (error) {
      setLoading(false);
      setAlert(error.response.data.message);
    }
  };

  const removeFavorite = async (userId: string, poiId: string) => {
    try {
      setLoading(true);
      const response = await api.delete(`/users/favorites/${userId}`, {
        data: { poiId },
      });
      if (response.status === 200) {
        setLoading(false);
        setFavorites(response.data);
      }
    } catch (error) {
      setLoading(false);
      setAlert(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        loading,
        alert,
        favorites,
        setAlert,
        Login,
        Logout,
        Register,
        getFavorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
