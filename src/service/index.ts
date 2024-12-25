export const getUser = () => {
    const user = sessionStorage.getItem('user');

    if(!user) {
        return null;
    }else{
        return JSON.parse(user);
    }
}

export const getToken = () => {
    return sessionStorage.getItem('token');
}

export const setUserSession = (user:any, token:any) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', JSON.stringify(token))
}

export const resetUserSession = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
}