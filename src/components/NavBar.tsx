import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
    <div className="w-full border-b overflow-x-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/"
                  className="whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Dashboard
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {user && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to="/debates"
                      className="whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      Debates
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <NavigationMenuLink className="whitespace-nowrap overflow-hidden text-ellipsis">
                        Add Records
                      </NavigationMenuLink>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 max-w-full"
                    >
                      <DropdownMenuItem asChild>
                        <NavLink to="/add">Add Debate Manually</NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <NavLink to="/import">Import from Tab URL</NavLink>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              {user ? user.email : "Account"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 max-w-full">
            {user ? (
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <NavLink to="/signin">Sign In</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/signup">Sign Up</NavLink>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
