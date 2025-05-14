import { signIn } from "./lib/auth-client";
// import { useNavigate } from "react-router-dom";

function LoginForm() {
  // const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
      console.log("Signed in with Google");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signIn.social(
        { provider: "github", callbackURL: "http://localhost:5173" },
        {
          // onSuccess: () => {
          //   navigate({ to: "http://localhost:5173" });
          // },
          onError: (error) => {
            console.error(error);
          },
        }
      );
      console.log("Signed in with GitHub");
    } catch (error) {
      console.error("GitHub sign-in error:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <button
        onClick={handleGitHubSignIn}
        style={{ border: "1px solid black" }}
      >
        Sign In with GitHub
      </button>
    </div>
  );
}

export default LoginForm;
