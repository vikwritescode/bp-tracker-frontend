import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config.ts";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
return (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle>Sign In</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
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
      <Button onClick={handleSignIn} className="w-full">
        Sign In
      </Button>
    </CardContent>
  </Card>
);
};

export default SignIn;
