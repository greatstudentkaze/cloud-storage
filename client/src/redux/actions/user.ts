import axios from 'axios';

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:9111/api/auth/registration', { email, password });

    alert(response.data.message);
  } catch (err) {
    alert(err.response.data.message);
  }
};
