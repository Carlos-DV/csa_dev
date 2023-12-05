import { ModalState } from "./UIProvider";

type ModalActionType = 
 | { type : '[Modal] - ToggleMenu' }
 | { type: '[Modal] - ToggleReply' }

export const modalReducer = ( state: ModalState, action: ModalActionType) : ModalState => {

    switch (action.type) {
        case '[Modal] - ToggleMenu':
            return {
                ...state,
                modalOpen: !state.modalOpen,
            }
        case '[Modal] - ToggleReply':
            return {
                ...state,
                showReply: !state.showReply,
            }
            default: 
                return state;
    }
}