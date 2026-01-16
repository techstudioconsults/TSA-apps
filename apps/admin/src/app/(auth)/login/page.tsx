import { Suspense } from "react";
import LoginForm from "./views/LoginForm";

const Login = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};
export default Login;
