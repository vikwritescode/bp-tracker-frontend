import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config.ts";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert.tsx";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner.tsx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "This should not be visible."
  );
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      setLoad(true);
      if (!(password === confirmPassword)) {
        throw new Error("Passwords do not match.");
      }
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(String(err));
      }
    } finally {
      setLoad(false);
    }
  };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Alert variant="destructive" hidden={!error}>
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle className="text-left">Registration Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="foo@bar.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Confirm password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleSignUp} className="w-full" disabled={load}>
          {load ? <Spinner /> : "Register"}
        </Button>
      </CardContent>
      <CardFooter className="justify-center">
        Have an account?{" "}
        <Link to="/signin" className="underline ml-1">
          Log in
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
