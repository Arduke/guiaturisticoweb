import React, { createContext, useEffect, useState } from "react";

import api from "../services/api";
import { IPoiContextData } from "../interface/context/IPoiContextData";
import { IPoi } from "../interface/poi/IPoi";
import { IAgency } from "../interface/agency/IAgency";
import { IComment } from "../interface/comment/IComment";

const PoiContext = createContext<IPoiContextData>({} as IPoiContextData);

export const PoiProvider: React.FC = ({ children }) => {
  const [poisCarousel, setPoisCarousel] = useState<Array<IPoi> | []>([]);
  const [searchPois, setSearchPois] = useState<Array<IPoi> | []>([]);
  const [pois, setPois] = useState<Array<IPoi> | []>([]);
  const [poi, setPoi] = useState<IPoi | null>(null);
  const [agency, setAgency] = useState<IAgency | null>(null);
  const [comments, setComments] = useState<IComment[] | []>([]);
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

  const searchPoi = async (search: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/poi/search?name=${search}`);

      if (response.status === 200) {
        setSearchPois(response.data);
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

  const fetchPoiById = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/poi/findOne/${id}`);

      if (response.status === 200) {
        setPoi(response.data);

        const responseAgencyName = await api.get(
          `/agencies/${response.data.agencyId}`
        );

        setAgency(responseAgencyName.data);

        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setAlert(error.response.data.message);
      }
    }
  };

  const fetchAllCommentWithTrueStatus = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/comment/findAllWithTrueStatusBypoiId/${id}`
      );

      if (response.status === 200) {
        setComments(response.data);

        setLoading(false);
      }
    } catch (error) {
      if (!error.response.ok) {
        setLoading(false);
        setAlert(error.response.data.message);
      }
    }
  };

  const createComment = async (id: string, comment: string) => {
    setLoading(true);
    try {
      const response = await api.post(`/comment/${id}`, {
        comment: comment,
      });

      if (response.status === 201) {
        setLoading(false);
        setAlert(response.data.message);
      }
    } catch (error) {
      if (!error.response.ok) {
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
        poi,
        searchPois,
        comments,
        agency,
        loading,
        alert,
        searchPoi,
        fetchAllPoiCarousel,
        fetchAllPoi,
        fetchPoiById,
        fetchAllCommentWithTrueStatus,
        createComment,
        page,
        setPage,
      }}
    >
      {children}
    </PoiContext.Provider>
  );
};

export default PoiContext;
