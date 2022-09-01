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
        let data="";
        try{
            data = await response.json();    
        }catch(error){

        }
        let token=response.headers.get("authorization");  
        
        return {
            result:true,
            token: token,
            content:data,
        };

    } else {
        let data = await response.json();


        let errmsg = ""
        try{
             data.error && data.error.join('\r\n');
        }catch(error){
            errmsg = data.error;
        }

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

//撤銷token
export const ApiSingout=()=>{

    return webService(`${url}/users/sign_out`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token'),
        },
        method: "Delete"
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
//取得todo list
export const ApiGetList=()=>{
    return webService(`${url}/todos`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token'),
        },
        method: "Get"
    });

}

//新增 todo list
export const ApiAddItem = (data)=>{
    let jsondata = JSON.stringify(data);
    console.log(jsondata);
    return webService(`${url}/todos`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
        },
        body: jsondata,
        method: "POST"
    });
}


//刪除 todo list
export const ApiDelItem = (id) => {

    return webService(`${url}/todos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token'),
        },
        method: "DELETE"
    });
}

//變更狀態
export const ApiToggleItem = (id) => {

    return webService(`${url}/todos/${id}/toggle`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token'),
        },
        method: "PATCH"
    });
}


