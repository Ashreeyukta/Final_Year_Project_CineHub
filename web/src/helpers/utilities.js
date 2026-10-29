import { URL } from "../services/http.service";

export const ucFirst = (string) => {
    // console.log(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export const setToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken.data));
}

export const setAdminToken = (userToken) => {
    localStorage.setItem("admin_token", JSON.stringify(userToken));
}


export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'));
}

export const getAdminToken = () => {
    return JSON.parse(localStorage.getItem('admin_token'));
}

export const getImageUrl = (file_name) => {

    let url = URL+"/images/"+file_name;
    // console.log(url);
    return url;
}

export const deleteToken = () => {
    localStorage.removeItem('token');
}

export const deleteAdminToken = () => {
    localStorage.removeItem('admin_token');
}

export const compareDate = (date, today=Date.now()) => {
    date = new Date(date);
    return (date.getTime() >= today)
}

export const getTodayDateString = () => {
    let date = new Date();
    let date_string = date.getFullYear();
    let month = date.getMonth()+1;
    if(month < 10){
        month = "0"+month;
    }
    let day = date.getDate();
    if(day < 10){
        day = "0"+day
    }

    date_string += "-"+month+"-"+day;
    return date_string;

}

export const getSeatName = (index) => {
    let seat = "";
    
    let seat_names = ["A","B","C","D","E","F","G","H"]

    let ind = parseInt(index/8);

    let count = index%8;

    return seat_names[ind]+count;
    
}

export const getDateOnly = (d) => {
    let date = new Date(d);
    let date_string = date.getFullYear();
    let month = date.getMonth()+1;
    if(month < 10){
        month = "0"+month;
    }
    let day = date.getDate();
    if(day < 10){
        day = "0"+day
    }

    date_string += "-"+month+"-"+day;
    return date_string;
}