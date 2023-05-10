/**
 * Obtiene el arreglo de tareas que ha sido guardado en el localStorage
 * @param {string} key Nombre del arreglo que sera buscado en el localStorage
 * @returns Retorna el arreglo de tareas que haya sido guardado en el localStorage
 */

export const getItem=(key)=>{
    return JSON.parse(localStorage.getItem(key)) 
}

/**
 * Actualiza el arreglo de tareas que ha sido guardado en el localStorage
 * @param {string} key Nombre del arreglo que sera buscado en el localStorage
 * @param {Array} data Iformación de las tarea actualizar 
 * @returns 
 */

export const setItem=(key, data)=>{
    return localStorage.setItem(key, JSON.stringify(data))
}