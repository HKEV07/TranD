import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IntraAx, handle42Callback, getUserData } from '../../api/authService42Intra';

const IntraCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (code && state) {
        try {
          const response = await handle42Callback({ 
            code,
            state 
          });

          if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            axiosInstance.defaults.headers.common['Authorization'] = 
              `Bearer ${response.data.access_token}`;
            navigate('/');
          }
        } catch (error) {
          console.error('Authentication failed:', error);
          navigate('/login');
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="text-white text-xl">Authenticating...</div>
    </div>
  );
};

export default IntraCallback;