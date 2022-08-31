import React from 'react';
import { appendErrors } from 'react-hook-form';
import { useApp } from '../context/AppContext';

let url ="https://todoo.5xcamp.us";

export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let webService=async (url,option)=>{  
    let response = await fetch(url, option);  

    if (response.status >= 200 && response.status <= 204) {
        let data = await response.json();    
        let token=response.headers.get("authorization");  

        return {
            result:true,
            token: token,
            content:data,
        };

    } else {
        let data = await response.json();

        let errmsg = data.error && data.error.join('\r\n');
        if (errmsg===undefined)
            errmsg="";

        return {
            result:false,
            content: data.message + ':' + errmsg,
        };
    }    
}

//確認token是否仍有效
export const CheckToken = ()=>{    
    return webService(`${url}/check`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('token'),
        },
        method: "Get"
    });
}

//註冊
export const ApiSignup = (data) => {    
    let jsondata=JSON.stringify(data);
    return webService(`${url}/users`,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: jsondata
    });
}

//登入
export const ApiLogin=(data)=>{
    let jsondata = JSON.stringify(data);
    return webService(`${url}/users/sign_in`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: jsondata
    });
}


