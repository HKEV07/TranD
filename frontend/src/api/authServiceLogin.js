import axiosInstance from './axiosInstance';


const LoginAx = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response; // Return the response data
  } catch (error) {
    throw (error) // Handle errors
  }
};



export default LoginAx;
