import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const login = async (email, password, userType) => {
    try {
      const response = await fetch('http://localhost/Devoi_socila_media/src/backend/controllers/users/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Inclut les cookies (notamment PHPSESSID)
        body: JSON.stringify({ email, password , userType}),
      });
      console.log('http://localhost/Devoi_socila_media/src/backend/controllers/users/login.php', response);
      if (response.ok) {
        const sessionResponse = await fetch('http://localhost/Devoi_socila_media/src/backend/controllers/users/check_session.php', {
          method: 'GET',
          credentials: 'include', // Inclut également les cookies dans cette requête
        });
  
        const sessionData = await sessionResponse.json();
        console.log('http://localhost/Devoi_socila_media/src/backend/controllers/users/check_session.php', sessionData);
        if (sessionData.loggedIn) {
          router.push('/');
        } else {
          throw new Error('Session non valide');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la connexion');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

  const signup = async (username, email, password, userType) => {
    try {
      const response = await fetch('http://localhost/Devoi_socila_media/src/backend/controllers/users/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, userType }),
      });

      if (response.ok) {
        console.log('http://localhost/Devoi_socila_media/src/backend/controllers/users/signup.php', response);
        router.push('/login');
        console.log('User added successfully, You need to log in now');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { login, signup };
}
