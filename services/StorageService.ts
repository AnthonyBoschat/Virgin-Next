class StorageService {
    static #instance: StorageService | null = null;
    private namespace: string;

    static #get(): StorageService {
        if (!this.#instance) {
            this.#instance = new StorageService(process.env.NEXT_PUBLIC_APP_NAME || 'app');
        }
        return this.#instance;
    }

    constructor(namespace: string = process.env.NEXT_PUBLIC_APP_NAME || 'app') {
        this.namespace = namespace;
    }

    // Vérifie si on est côté client
    private isClient(): boolean {
        return typeof window !== 'undefined';
    }

    private _get(key: string, callback?: (value: any) => void): any {
        if (!this.isClient()) return null;
        
        const fullKey = `${this.namespace}_${key}`;
        let value = localStorage.getItem(fullKey);
        
        if (value) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                // Valeur brute
            }
            if (callback && typeof callback === 'function') callback(value);
        }
        return value;
    }

    private _set(key: string, value: any): void {
        if (!this.isClient()) return;
        
        const fullKey = `${this.namespace}_${key}`;
        const toStore = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(fullKey, toStore);
    }

    private _remove(key: string): void {
        if (!this.isClient()) return;
        
        const fullKey = `${this.namespace}_${key}`;
        localStorage.removeItem(fullKey);
    }

    private _clear(): void {
        if (!this.isClient()) return;
        
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.namespace)) localStorage.removeItem(key);
        });
    }

    static get(key: string, callback?: (value: any) => void): any {
        return this.#get()._get(key, callback);
    }
    static set(key: string, value: any): void {
        return this.#get()._set(key, value);
    }
    static remove(key: string): void {
        return this.#get()._remove(key);
    }
    static clear(): void {
        return this.#get()._clear();
    }

    get(key: string, callback?: (value: any) => void): any {
        return this._get(key, callback);
    }
    set(key: string, value: any): void {
        return this._set(key, value);
    }
    remove(key: string): void {
        return this._remove(key);
    }
    clear(): void {
        return this._clear();
    }
}

export default StorageService;