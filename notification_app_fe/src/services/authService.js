import apiClient from '../api/axiosConfig';
import { logOperation, logError } from '../utils/logger';

export const registerClient = async (clientData) => {
  try {
    logOperation('Initiating client registration', { clientData });
    const response = await apiClient.post('/auth/register', clientData);
    
    const { clientId, clientSecret } = response.data;
    localStorage.setItem('clientId', clientId);
    localStorage.setItem('clientSecret', clientSecret);
    
    logOperation('Client registration successful', { clientId });
    return response.data;
  } catch (error) {
    logError('Client registration failed', error);
    throw error;
  }
};

export const authenticateClient = async () => {
  try {
    const clientId = localStorage.getItem('clientId');
    const clientSecret = localStorage.getItem('clientSecret');
    
    logOperation('Initiating authentication');
    
    const response = await apiClient.post('/auth/login', {
      clientId,
      clientSecret
    });
    
    const { token } = response.data;
    localStorage.setItem('bearerToken', token);
    
    logOperation('Authentication successful');
    return token;
  } catch (error) {
    logError('Authentication failed', error);
    throw error;
  }
};

export const logout = () => {
  logOperation('User logout initiated');
  localStorage.removeItem('bearerToken');
  localStorage.removeItem('clientId');
  localStorage.removeItem('clientSecret');
};