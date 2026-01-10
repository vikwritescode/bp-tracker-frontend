import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const NavBar = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar">
      <NavLink to="/">Dashboard</NavLink>
      {user ? (
        <>
          <p>hello, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <NavLink to="/signin"> Sign In</NavLink>
          <NavLink to="/signup"> Sign Up</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;
