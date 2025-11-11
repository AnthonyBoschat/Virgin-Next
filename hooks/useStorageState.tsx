import StorageService from "@/services/StorageService";
import { useState, Dispatch, SetStateAction } from "react";

/**
 * Hook personnalisé pour synchroniser un state React avec le localStorage via StorageService.
 *
 * @param initialValue - Valeur initiale si aucune valeur n'est trouvée dans le localStorage.
 * @param localStorageKey - Clé utilisée pour stocker la valeur dans le localStorage.
 * @returns Tableau contenant la valeur et la fonction de mise à jour (comme useState).
 */
export default function useStorageState<T>(initialValue: T, localStorageKey: string): [T, Dispatch<SetStateAction<T>>] {
    
    const [value, setValue] = useState<T>(() => {
        const stored = StorageService.get(localStorageKey);
        return stored !== undefined && stored !== null ? stored : initialValue;
    });

    const handleSetValue: Dispatch<SetStateAction<T>> = (newValue) => {
        // Si newValue est une fonction, on l'applique à la valeur courante
        const valueToStore = typeof newValue === "function" 
            ? (newValue as (prevState: T) => T)(value) 
            : newValue;

        if (valueToStore === initialValue) {
            StorageService.remove(localStorageKey);
        } else {
            StorageService.set(localStorageKey, valueToStore);
        }
        setValue(valueToStore);
    };

    return [value, handleSetValue];
}