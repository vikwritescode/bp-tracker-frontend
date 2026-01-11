import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

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
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink to="/">Dashboard</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {user ? (
            <>
              <NavigationMenuTrigger>{user.email}</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 w-[200px]">
                <NavigationMenuLink>
                  <button onClick={handleSignOut}>Sign Out</button>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </>
          ) : (
            <>
              <NavigationMenuTrigger>Account</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 w-[200px]">
                <NavigationMenuLink>
                  <NavLink to="/signin"> Sign In</NavLink>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <NavLink to="/signup"> Sign Up</NavLink>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

export default NavBar;
