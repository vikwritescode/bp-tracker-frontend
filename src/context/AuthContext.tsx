import { createContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, type User } from "firebase/auth";
// used AI to make this behave with TS

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

export const Context = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true
});

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoad(false);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const values: AuthContextType = {
    user,
    setUser,
    loading: load
  };

  return (
    <Context.Provider value={values}>{!load && children}</Context.Provider>
  );
};

export default AuthContext;
