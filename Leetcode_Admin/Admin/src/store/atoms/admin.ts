import {atom} from 'recoil';
// const email: string|null =null;
type admin={
    adminEmail:string|null
}
export const adminState=atom<admin | null>({
    key:'adminState',
    default:{
        adminEmail:null
    },
})