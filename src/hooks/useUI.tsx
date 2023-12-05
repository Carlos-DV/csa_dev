
import { useContext } from "react";
import UIContext from "../context/ui/UIProvider";

const useUI = () => {
    return useContext(UIContext)
}

export { useUI };