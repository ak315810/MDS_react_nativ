import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_DB_KEY = '@users_db';
const CURRENT_USER_KEY = '@current_user';

export const authService = {
  // new user registration
  register: async (email, password) => {
    try {
      const existingUsersJson = await AsyncStorage.getItem(USERS_DB_KEY);
      const users = existingUsersJson ? JSON.parse(existingUsersJson) : [];

      // check if email already registered
      const userExists = users.find(u => u.email === email);
      if (userExists) {
        throw new Error('Konto z tym adresem email już istnieje.');
      }

      // add new user; automatic log in
      const newUser = { email, password };
      users.push(newUser);
      
      await AsyncStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  // Log in
  login: async (email, password) => {
    try {
      const existingUsersJson = await AsyncStorage.getItem(USERS_DB_KEY);
      const users = existingUsersJson ? JSON.parse(existingUsersJson) : [];

      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Nieprawidłowy email lub hasło.');
      }

      // active session save
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Log out
  logout: async () => {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  },

  // Checking who is logged in
  getCurrentUser: async () => {
    try {
      const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      return null;
    }
  }
};