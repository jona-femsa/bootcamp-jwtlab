import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const CACHE_KEY = 'cachedUsers';

export const fetchUsers = async(search: string) => {
    try {
        // Primero desde cache
        const cache = await AsyncStorage.getItem(CACHE_KEY);

        if(cache) {
            console.log('Datos cargados desde cache');
            return JSON.parse(cache).filter((item: {name: string}) => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        const response = await axios.get(API_URL);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
        
        console.log('Datos cargados desde API');
        return response.data.filter((item: {name: string}) => item.name.toLowerCase().includes(search.toLowerCase()));;
    } catch(error) {
        throw new Error('Error obteniendo usuarios');
    }
}

export const clearCache = async () => {
    try {
        await AsyncStorage.removeItem(CACHE_KEY);
    } catch (error) {
        console.error('Error limpiando cache', error);
    }
};
