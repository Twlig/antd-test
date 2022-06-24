import store from "./store";
import {createContext, useContext} from "react";
class RootStore {
    comment = store
}
const rootStore = new RootStore()
const Context = createContext(rootStore)

export const useStore = function () {
    return useContext(Context)
}