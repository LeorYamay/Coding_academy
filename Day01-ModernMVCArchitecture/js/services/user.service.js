
export const userService = {
    getUser,
    setUser
}
function getUser(){
    let storedUserJson = JSON.parse(localStorage.getItem('userData'));
    return storedUserJson;
}

function setUser(userJson){
    let storedUser = localStorage.setItem('userData',userJson);
}
