"use client"
import { createContext, useEffect, useState, useReducer } from "react";
import { modalReducer } from "./UIReducer";


type ContextProps = {
    modalOpen: boolean,
    toogleMenu: () => void,
    showReply: boolean,
    toogleReply: () => void,
}

export interface ModalState {
    modalOpen: boolean,
    showReply: boolean,
}

interface props {
    children: JSX.Element | JSX.Element[]
}

const UI_INITIAL_STATE: ModalState = {
    modalOpen: false,
    showReply: false,
}

const UIContext = createContext<ContextProps>({} as ContextProps);

const UIProvider = ({ children }: props) => {

    const [state, dispatch] = useReducer( modalReducer , UI_INITIAL_STATE );

    const toogleMenu = () => {
        dispatch({ type: '[Modal] - ToggleMenu' });
    }

    const toogleReply = () => {
        dispatch({ type: '[Modal] - ToggleReply' });
    }
    return (
        <UIContext.Provider
            value={{
                ...state,
                toogleMenu,
                toogleReply,
            }}
        >
            {children}
        </UIContext.Provider>
    )
}

export {
    UIProvider
}

export default UIContext