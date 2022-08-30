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
        return {
            result:true,
            content:data,
        };
    } else {
        let data = await response.json();
        let errmsg = data.error && data.error.join('\r\n');//data.error.join();
        return {result:false,
            content: data.message + ':' + errmsg,
        };
    }
    
}


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
