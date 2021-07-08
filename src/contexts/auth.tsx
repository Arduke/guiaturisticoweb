import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api'

interface AuthContextData {
    signed: boolean;
    user: String | null;
    loading: Boolean;
    alert: String;
    setAlert(text: String): any;
    Login(email: String, password: String, callback: Function): Promise<void>;
    Logout(): Promise<void>;
    Register(user: User, callback: Function): Promise<void>;
}

interface User {
    email: String;
    password: String;
    username: String;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<String | null>(null);
    const [loading, setLoading] = useState<Boolean>(false);
    const [alert, setAlert] = useState<String>('')


    useEffect(() => {
        const storagedUser = localStorage.getItem('@GuiaTuristico::user');
        const storagedToken = localStorage.getItem('@GuiaTuristico::token');

        if (storagedToken && storagedUser) {
            setUser(storagedUser);
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, []);


    const Login = async (email: String, password: String, callback: Function) => {
        setLoading(true)
        try {
            const response = await api.post("/users/login", {
                email: email,
                password: password
            })

            if (response.status === 201) {
                localStorage.setItem('@GuiaTuristico::user', response.data.email)
                localStorage.setItem('@GuiaTuristico::token', response.data.access_token)
                setUser(response.data.email)
                api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`
                setLoading(false)
                callback()
            }
        } catch (error) {
            console.log(error)
            if (error.response) {
                Logout()
                setLoading(false)
                setAlert(error.response.data.message)
            }
        }


    }

    const Logout = async () => {
        setUser(null)
        localStorage.removeItem('@GuiaTuristico::token')
        localStorage.removeItem('@GuiaTuristico::user')
    }

    const Register = async (user: User, callback: Function) => {
        setLoading(true)
        try {
            const response = await api.post("/users/", {
                email: user.email,
                password: user.password,
                username: user.username
            })

            if (response.status === 201) {
                setLoading(false)
                setAlert(response.data.message)
                callback()
            }
        } catch (error) {
            if (!error.response.ok) {
                Logout()
                setLoading(false)
                setAlert(error.response.data.message)
            }
        }
    }


    return (
        <AuthContext.Provider value={{
            signed: Boolean(user),
            user,
            loading,
            alert,
            setAlert,
            Login,
            Logout,
            Register
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export default AuthContext;