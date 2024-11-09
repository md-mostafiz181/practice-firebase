import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";


const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleGithubLogin = ()=>{
    signInWithPopup(auth,GithubProvider)
    .then(result =>{
        const loggedUser = result.user
        setUser(loggedUser)
    })
    .catch((error)=>{
        console.log("error", error.message)
    })
    
  }

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(null);
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error.massage);
      });
  };
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Login</h2>
          <form>
            <div className="mb-4 text-left">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6 text-left">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md font-medium text-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Login
            </button>
            <div className="divider">OR</div>
            {user ? (
              <button
                onClick={handleGoogleSignOut}
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md font-medium text-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Log Out
              </button>
            ) : (
              <div>
                <button
                  onClick={handleGoogleLogin}
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-md font-medium text-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Google Login
                </button>
                <div className="divider">OR</div>
                <button
                  onClick={handleGithubLogin}
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-md font-medium text-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Github Login
                </button>
              </div>
            )}
          </form>
        </div>

        {user && (
          <div className="card card-compact bg-base-100 w-96 ms-3 shadow-xl">
            <figure>
              <img src={user?.photoURL} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">User Name : {user.displayName}</h2>
              <p>Email : {user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
