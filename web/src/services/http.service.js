import axios from "axios";
import {getToken, getAdminToken} from "../helpers/utilities"
const baseURL = "http://localhost:3002/api"
export const URL = "http://localhost:3002";
export const homeurl = "http://localhost:3000"

const http = axios.create({
    baseURL: baseURL,
    headers: {

    }
})


const getHeaders = (is_strict) => {

    let token = getAdminToken();
    let user = null;

    if(!token){
        token = getToken()
        if(token){
            user = token.user.id
        }
    }

    if(token){
        token = token.token
    }
    
    if(is_strict) {
        return {
            headers: {
                "authorization": token,
                "user": user
            }
        }
    } else {
        return {
            headers: {}
        }
    }
}

export const postRequest = (url, data, is_strict = false) => {
    return new Promise((resolve, reject) => {
        let headers = getHeaders();
        http.post(url, data, headers)
        .then((response) => {
            // console.log("Succ: ", response)
            resolve(response);
        }) 
        .catch((error) => {
            alert(error);
            reject(error);
        })
    })
}

export const getRequest = (url, is_strict = false, is_admin = true) => {
    return new Promise((resolve, reject) => {
        
        let headers = getHeaders(is_strict);
console.log(headers)

        http.get(url, headers)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const updateRequest = (url, data, is_strict = false) => {
    return new Promise((resolve, reject) => {
        let headers = getHeaders(is_strict);
        http.put(url, data, headers)
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            alert(err);
            reject(err);
        })
    })
}

export const deleteRequest = (url, is_strict = false) => {
    return new Promise((resolve, reject) => {
        let headers = getHeaders();
        http.delete(url, headers)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const uploadSingleFile = (method, url, data, file, is_strict = false) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();

        formData.append("movie", file, file.name);
        
    
        // other fields
        for(let key in data){
            formData.append(key, data[key])
        }

        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4){
                
                
                let response = JSON.parse(xhr.response);
                
                if(response.result){

                    res(response);
                } else {
                    rej(response);
                }
            }
        }

        xhr.open(method, baseURL+"/"+url);
        if(is_strict){
            xhr.setRequestHeader('authorization', localStorage.getItem('_at'))
        }
        xhr.send(formData);
    });
}