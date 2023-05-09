export const getItem=(key)=>{
    return JSON.parse(localStorage.getItem(key)) 
}

export const setItem=(key, data)=>{
    console.log(data)
    console.log(key)
    return localStorage.setItem(key, JSON.stringify(data))
}