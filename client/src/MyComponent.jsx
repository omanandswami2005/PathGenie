import { useSession, signOut } from "./lib/auth-client";
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  const { data, session, isPending, error } = useSession();
  console.log(data);
  console.log(session);
  console.log(isPending);
  console.log(error);
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) {
    return (
      <div>
        Welcome, {data.user.name}!
        <div>
          <button
            onClick={async () => {
              await signOut({
                fetchOptions: {
                  onSuccess: () => {
                    navigate("/login");
                  },
                },
              });
            }}
          >
            signout
          </button>
        </div>
      </div>
    );
  }
  return <div>Please sign in.</div>;
}

export default MyComponent;
