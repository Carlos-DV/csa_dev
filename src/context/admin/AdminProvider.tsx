"use client"
import { createContext, useEffect, useState, useReducer, useCallback} from "react";
import { adminReducer } from "./";
import { IAdmonTickets, IDepartament } from "../../interfaces";
import { admonAPI } from "../../server";
import { useAuth } from "../../hooks";

type ContextProps = {
    admonTicket: IAdmonTickets[]
}

export interface AdminState {
    admonTicket: IAdmonTickets[]
}

interface props {
    children: JSX.Element | JSX.Element[]
}
const UI_INITIAL_STATE: AdminState = {
    admonTicket: []
}
const AdminContext = createContext<ContextProps>({} as ContextProps);

const AdminProvider = ({ children } : props ) => {

    const [state, dispatch] = useReducer( adminReducer , UI_INITIAL_STATE );
    const { user } = useAuth();

    useEffect(()=> {
        const getAdmonTicket = async () => {
            try {
                if(user && user.departament){
                    const id: number[] = user.departament.map((dep: { pkDepartment: number }) => dep.pkDepartment);
                    const res = await admonAPI.getAdmonTicket(id[0]);
                    console.log(res);
                    dispatch({type: '[Admon] - GetAll', payload: res});
                }
            } catch (error) {
                console.log(`ex: ${error}`) 
            }
        }           
        getAdmonTicket();
    }, [user])

    return (
        <AdminContext.Provider
            value={{
                ...state,
                // Methods
            }}
        >
            { children }
        </AdminContext.Provider>
    )
}
export {
    AdminProvider,
    AdminContext
}

