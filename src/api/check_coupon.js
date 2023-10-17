const BASE_URL = 'http://localhost/restApis';

export const checkCoupon = async (code) => {
    try {
        const response = await fetch(`${BASE_URL}/check_coupon.php?code=${code}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching coupon data: ${error.message}`);
    }
};
