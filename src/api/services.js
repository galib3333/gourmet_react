const BASE_URL = 'http://localhost/restApis';

export const fetchServices = async () => {
    try {
        const response = await fetch(`${BASE_URL}/services.php`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching Services data: ${error.message}`);
    }
};
export const fetchHomeService = async () => {
    try {
        const response = await fetch(`${BASE_URL}/home-services.php`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching Services data: ${error.message}`);
    }
};

