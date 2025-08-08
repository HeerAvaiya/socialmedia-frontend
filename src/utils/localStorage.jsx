const localStorageUtils = {
    getItem: (key) => {
        try {
            const item = localStorage.getItem(key);
            return JSON.parse(item);
        } catch (error) {
            return null;
        }
    },
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
        }
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
    clear: () => {
        localStorage.clear();
    }
};

export default localStorageUtils;
