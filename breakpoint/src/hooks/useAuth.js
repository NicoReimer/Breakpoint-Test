import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/user', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return { user };
}
