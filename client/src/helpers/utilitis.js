
export const ucFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export const setToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  }