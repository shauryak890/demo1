import { jwtDecode } from 'jwt-decode'; // Correctly import the named export

/**
 * Checks if the user is authenticated by verifying the existence
 * and validity of the JWT token.
 * 
 * @returns {boolean} - Returns true if authenticated, false otherwise.
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const { exp } = jwtDecode(token); // Decode using the correct method
      // Check if the token is expired
      return exp * 1000 > Date.now();
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }
  return false;
};

/**
 * Retrieves the user's role from the JWT token.
 * 
 * @returns {string|null} - Returns the user's role if available, null otherwise.
 */
export const getRole = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const userData = jwtDecode(token); // Decode using the correct method
      return userData.role || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};

/**
 * Logs the user out by removing the JWT token from localStorage.
 */
export const logout = () => {
  localStorage.removeItem('token');
};
