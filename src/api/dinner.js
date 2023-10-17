const BASE_URL = 'http://localhost/restApis';

export const fetchDinner = async () => {
    try {
        const response = await fetch(`${BASE_URL}/dinner.php`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching testimonials data: ${error.message}`);
    }
};
