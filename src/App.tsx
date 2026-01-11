import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import AuthContext from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./routes/Layout";
import Debates from "./routes/Debates";
import ImportDebates from "./routes/ImportDebates";
import AddDebate from "./routes/AddDebate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "debates",
        element: (
          <ProtectedRoute>
            <Debates />
          </ProtectedRoute>
        ),
      },
      {
        path: "import",
        element: (
          <ProtectedRoute>
            <ImportDebates />
          </ProtectedRoute>
        )
      },
      {
        path: "add",
        element: (
          <ProtectedRoute>
            <AddDebate />
          </ProtectedRoute>
        )
      }
    ],
  },
]);

function App() {
  return (
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  );
}

export default App;
