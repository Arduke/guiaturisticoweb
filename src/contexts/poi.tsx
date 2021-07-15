import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api'


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

interface Agency {
    id: string;
    name: string;
    cnpj: string;
    email: string;
    password: string;
    updatedAt: string;
    createdAt: string;
}

interface PoiContextData {
    poisCarousel: Array<Poi> | [{}];
    pois: Array<Poi> | [{}];
    poi: Poi | null;
    agencyName: Agency | null
    loading: Boolean;
    alert: String;
    fetchAllPoi(): Promise<void>;
    fetchPoiById(id: string): Promise<void>;
    fetchAllPoiCarousel(): Promise<void>;
    page: number;
    setPage(number: number): void;
}


const PoiContext = createContext<PoiContextData>({} as PoiContextData);


export const PoiProvider: React.FC = ({ children }) => {
    const [poisCarousel, setPoisCarousel] = useState<Array<Poi> | []>([])
    const [pois, setPois] = useState<Array<Poi> | []>([])
    const [poi, setPoi] = useState<Poi | null>(null) 
    const [agencyName, setAgencyName] = useState<Agency | null>(null)
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<Boolean>(false)
    const [alert, setAlert] = useState<String>('')


    
    useEffect(() => {
        fetchAllPoi()
    }, [page])

    useEffect(() => {
        const storagedToken = localStorage.getItem('@GuiaTuristico::token');

        if (storagedToken) {
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, [])


    const fetchAllPoiCarousel = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/poi?page=${1}`)

            if (response.status === 200) {
                setPoisCarousel(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            if (error.response) {
                setLoading(false)
                setAlert(error.response.data.message)
            }
        }
    }

    const fetchAllPoi = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/poi?page=${page}`)

            if (response.status === 200) {
                setPois(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            if (error.response) {
                setLoading(false)
                setAlert(error.response.data.message)
            }
        }
    }

    const fetchPoiById = async (id: string) => {
        setLoading(true)
        try {
            const response = await api.get(`/poi/findOne/${id}`)

            if (response.status === 200) {
                setPoi(response.data)
                
                const responseAgencyName = await api.get(`/agencies/${response.data.agencyId}`)
                console.log(responseAgencyName)
                
                setAgencyName(responseAgencyName.data)
                
                setLoading(false)
            }
        } catch (error) {
            if (error.response) {
                setLoading(false)
                setAlert(error.response.data.message)
            }
        }
    }

    return (
        <PoiContext.Provider value={{
            poisCarousel,
            pois,
            poi,
            agencyName,
            loading,
            alert,
            fetchAllPoiCarousel,
            fetchAllPoi,
            fetchPoiById,
            page,
            setPage
        }}>
            {children}
        </PoiContext.Provider>
    )
}


export function useAuth() {
    const context = useContext(PoiContext);

    return context;
}

export default PoiContext;