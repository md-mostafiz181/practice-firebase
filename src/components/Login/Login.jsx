import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from "../../firebase/firebase.init";


const Login = () => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider()

    const handleGoogleLogin = () =>{
        signInWithPopup(auth, provider)
        .then(result=>{
            const user = result.user;
            console.log(user)
        })
        .catch(error =>{
            console.log("error", error.massage)
        })
    }
    return (
        <div>
              <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Login</h2>
        <form>
          <div className="mb-4 text-left">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
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
        </form>
        <div className="divider">OR</div>
        <div className="flex justify-center items-center">
            <div className="icon me-2"><FcGoogle /></div>
            <div ><button onClick={handleGoogleLogin}> Google </button></div>
        </div>
         
      </div>
    </div>
        </div>
    );
};

export default Login;