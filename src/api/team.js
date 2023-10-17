const BASE_URL = 'http://localhost/restApis';

export const fetchTeam = async () => {
    try {
        const response = await fetch(`${BASE_URL}/team.php`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching Team data: ${error.message}`);
    }
};

export const fetchHomeTeam = async () => {
    try {
        const response = await fetch(`${BASE_URL}/home-team.php`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching Home Team data: ${error.message}`);
    }
};
