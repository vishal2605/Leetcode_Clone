import { selector } from "recoil";
import {adminState} from '../atoms/admin';

export const adminEmailState = selector({
    key: "adminEmailState",
    get:({get})=>{
        const state= get(adminState);
        if(state==null)return null;
        return state.adminEmail;
    },
});