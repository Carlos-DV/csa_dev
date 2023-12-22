"use client"
import { createContext, useEffect, useState, useReducer, useCallback} from "react";
import { authReducer } from "./AuthReducer";
import { IUser } from "../../interfaces";
import { logintAPI } from "../../server";
import { useRouter } from 'next/router';

type ContextProps = {
    isLoggedIn: boolean;
    user?: IUser;
    loginUser: (user: string, password: string) => Promise<boolean>;
    isAgent?: boolean;
    logout: () => void;
}
export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
    isAgent?: boolean;
}

interface props {
    children: JSX.Element | JSX.Element[]
}
const UI_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}
const AuthContext = createContext<ContextProps>({} as ContextProps);

const AuthProvider = ({ children } : props ) => {

    const [state, dispatch] = useReducer( authReducer , UI_INITIAL_STATE );

    const router = useRouter();

    const validateLogin = useCallback(() => {
        const token = localStorage.getItem("ANC_SECURE_UUID");
        if (!token) {
            router.push('/');
            return;
        } else {
            const userIdString: string | null = localStorage.getItem("userID");
            const userIdNumber: number = userIdString ? Number(userIdString) : 0;
            if (userIdString !== null) {
                const user: IUser = {
                    id: userIdNumber,
                    userName: localStorage.getItem("userName") as string,
                    email: localStorage.getItem("email") as string,
                    firstName: localStorage.getItem("userFirstName") as string,
                    lastName: localStorage.getItem("userLastName") as string,
                    departament: JSON.parse(localStorage.getItem("departments") || '[]'),
                    isAgent: localStorage.getItem("isAgent") as string,
                };
                dispatch({ type: '[Auth] - Login', payload: user });
                console.log(user);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

           

    useEffect(() => {
        return  () => {
            validateLogin();
        }
    }, [validateLogin])
    

    const loginUser = async (userName: string, password: string): Promise<boolean> => {
        try {
            const companyId = localStorage.setItem("compañia", "ancona");
            const loginProccess = await logintAPI.postAuthenticate({userName, password})
            console.log(loginProccess);
            dispatch({ type: '[Auth] - Login', payload: loginProccess });
            if (loginProccess.isAgent === 'true') {
                router.push('/ticket');
            }else if(loginProccess.isAgent === 'false') {
                router.push('/ticket');
            }else{
                router.push('/login');
            }
            return true;

        } catch (err) {
            console.error(err)
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem("ANC_SECURE_UUID");
        localStorage.removeItem("ANC_RF");
        localStorage.removeItem("ANC_AUTH_EX_AT");
        localStorage.removeItem("userFirstName");
        localStorage.removeItem("userLastName");
        localStorage.removeItem("userID",);
        localStorage.removeItem("email");
        localStorage.removeItem("roles");
        localStorage.removeItem("companyLogo");
        localStorage.removeItem("companyName");
        localStorage.removeItem("isAgent");
        localStorage.removeItem('departments');
        localStorage.removeItem("userName");
        dispatch({type: '[Auth] - Logout'});
        router.push('/');
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                // Methods
                loginUser,
                logout,
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export {
    AuthProvider,
    AuthContext
}

