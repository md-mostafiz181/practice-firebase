import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";


const SignUp = () => {

  const [registerError, setRegisterError]=useState(" ")

    const auth = getAuth();
    const handleRegister = (e)=>{
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name,email,password)
        
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            setRegisterError(error)
        })

        
    }
    return (
        <div>
           
            <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Email and Password SignUp</h2>
        
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter your password"
            />
          </div>

          <input className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" type="submit" value="SignUp" />

          
        </form>



        <Link to="/email_pass">
        <p className="text-sm text-center text-gray-500">
          Don’t have an account? <a href="#" className="text-blue-500 hover:underline">SingIn</a>
        </p></Link>

        {
          registerError && <p className="text-red-600">{registerError.message}</p>
        }
      </div>
    </div>
        </div>
    );
};

export default SignUp;