import {useState} from 'react'


const useLocalStorage = (key, initialValue) => {
    
    const [localStorageValue, setLocalStorageValue] = useState(() => getLocalStorageValue(key, initialValue))

    const setValue = (value) => {
        
        //Check if function
        const valueToStore = value instanceof Function ? value(localStorageValue) : value

        //Set to State
        setLocalStorageValue(value)

        //Set to Local Storage
        localStorage.setItem(key, JSON.stringify(valueToStore))

    }


    return [localStorageValue, setValue]
}


const getLocalStorageValue = (key, initialValue) => {
    const itemFromStorage = localStorage.getItem(key)

    return itemFromStorage ? JSON.parse(itemFromStorage) : initialValue
}

export default useLocalStorage