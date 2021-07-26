import React, { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";

interface Poi {
  address: string;
  agencyId: string;
  categories: any[];
  createdAt: string;
  updatedAt: string;
  description: string;
  id: string;
  name: string;
  picture: string;
}

interface PoiContextData {
  poisCarousel: Array<Poi> | [{}];
  pois: Array<Poi> | [{}];
  loading: Boolean;
  alert: string;
  fetchAllPoi(): Promise<void>;
  fetchAllPoiCarousel(): Promise<void>;
  page: number;
  setPage(number: number): void;
}

const PoiContext = createContext<PoiContextData>({} as PoiContextData);

export const PoiProvider: React.FC = ({ children }) => {
  const [poisCarousel, setPoisCarousel] = useState<Array<Poi> | []>([]);
  const [pois, setPois] = useState<Array<Poi> | []>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<Boolean>(false);
  const [alert, setAlert] = useState<string>("");

  useEffect(() => {
    fetchAllPoi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const storagedToken = localStorage.getItem("@GuiaTuristico::token");

    if (storagedToken) {
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  const fetchAllPoiCarousel = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/poi?page=${1}`);

      if (response.status === 200) {
        setPoisCarousel(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setAlert(error.response.data.message);
      }
    }
  };

  const fetchAllPoi = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/poi?page=${page}`);

      if (response.status === 200) {
        setPois(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setAlert(error.response.data.message);
      }
    }
  };

  return (
    <PoiContext.Provider
      value={{
        poisCarousel,
        pois,
        loading,
        alert,
        fetchAllPoiCarousel,
        fetchAllPoi,
        page,
        setPage,
      }}
    >
      {children}
    </PoiContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(PoiContext);

  return context;
}

export default PoiContext;
