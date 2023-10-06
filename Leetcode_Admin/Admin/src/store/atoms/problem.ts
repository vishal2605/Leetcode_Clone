import {atom} from 'recoil';


export const problemState=atom({
    key:'problemState',
    default:{
        count:0,
        title:"",
        difficulty:""
    },
})