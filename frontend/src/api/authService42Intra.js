import axiosInstance from './axiosInstance';


const IntraAx = async () => {
  try {
    const response = await axiosInstance.get('/oauth2/42/');
    return response;
  } catch (error) {
    // console.error('IntraAx error:', error);
    throw error;
  }
};


const handle42Callback = async (code, state) => {
  try {
    const response = await axiosInstance.post('/oauth2/42/callback/', { 
      code,
      state 
    });
    
    if (response.data?.access_token) {
      // Store the tokens
      localStorage.setItem('access_token', response.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem('refresh_token', response.data.refresh_token);
      }
      
      // Update axios instance headers
      axiosInstance.defaults.headers.common['Authorization'] = 
        `Bearer ${response.data.access_token}`;
        
      // Store user data if provided
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('Callback error:', error);
    throw error;
  }
};


const getUserData = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No access token found');
    }
    
    const response = await axiosInstance.get('/users/me/');
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Get user data error:', error);
    throw error;
  }
};


const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  delete axiosInstance.defaults.headers.common['Authorization'];
};


const isAuthenticated = () => {
  return localStorage.getItem('access_token') !== null;
};


const getStoredUserData = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export { IntraAx, handle42Callback, getUserData, logout, isAuthenticated, getStoredUserData };