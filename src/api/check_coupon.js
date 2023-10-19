import axios from "axios";

export const checkCoupon = async (code) => {
    try {
        const response = await axios.get(`${global.config.apiUrl}couponcheck/index/${code}`);
        const data = response.data;
        return data.data;
    } catch (error) {
        throw new Error(`Error fetching coupon data: ${error.message}`);
    }
};
