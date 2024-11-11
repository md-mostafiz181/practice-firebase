import {  getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Email_Pass = () => {

  const [loginError, setLoginError]=useState(" ");
  const [success,setSuccess]=useState(" ")
  const emailRef =useRef(null)


  
 

  const handleLogin = e =>{
    

    e.preventDefault()
    const email =e.target.email.value;
    const password = e.target.password.value;
    console.log(email,password)

    setLoginError("");
     setSuccess("");

    const auth = getAuth();
    signInWithEmailAndPassword(auth,email,password)
    .then(result=>{
      console.log(result.user)
      setSuccess("User Login successful")
    })
    .catch(error=>{
      console.log(error)
      setLoginError("Your password is wrong")
    })
    
  }

  const handleResetPassword = ()=>{
    const email = emailRef.current.value;
    console.log("please provide your email",emailRef.current.value)
    if(!email){
      setLoginError("pleaser provide your email")
      return;
    }else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      setLoginError("please provide a write email")
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        alert("please check your email")
    })
    .catch(error=>{
      console.log(error.message)
    })
  }


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Email and Password Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
             
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter your password"
            />

          <label onClick={handleResetPassword} className="label text-2xl font-bold">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
          </div>

          

          <input
            className=" w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
            value="Login"
          />
        </form>

        



        <Link to="/signUp">
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </Link>

        <div className="text-2xl text-green-700">
          {
            success && <p>{success}</p>
          }
        </div>

        <div className="text-2xl text-red-700">
          {
            loginError && <p>{loginError}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Email_Pass;
