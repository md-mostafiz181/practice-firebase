import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";



const SignUp = () => {

  const [registerError, setRegisterError]=useState(" ");
  const [success, setSuccess]= useState(" ");
  const [showPassword, setShowPassword]= useState(false);
  const [accepted,setAccepted]= useState(false)

    const auth = getAuth();
    const handleRegister = (e)=>{
        e.preventDefault()
        
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted =e.target.terms.checked;
        console.log(email,password, accepted)



        
        setRegisterError("");
        setSuccess("")

        if(password.length < 6){
          setRegisterError("Password at least 6 characters or longer")
          return;
        }else if(!/[A-Z]/.test(password)){
          setRegisterError("Use at least one uppercase")
          return;
        }else if(!accepted){
          setRegisterError("Please accept our terms and conditions")
          return;
        }



        
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user)
            setSuccess("User created successfully")
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type={showPassword ? "text":"password"}
              id="password"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter your password"
              
              required
              
            />
            <span className="absolute mt-5 -ms-8" onClick={()=>setShowPassword(!showPassword)}>
              {
                showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>
              }
            </span>
          </div>
          <input type="checkbox"
           name="terms" 
           id="terms"
           checked={accepted}
           onChange={()=>setAccepted(!accepted)}
            />
           
          <label className="ms-1" htmlFor="terms">Accept our Terms and Conditions</label>

          <div>
          
            <input className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" type="submit"
             value="SignUp"
             disabled={!accepted}
              /> 
          
          </div>

          
        </form>



        <Link to="/email_pass">
        <p className="text-sm text-center text-gray-500">
          Don’t have an account? <a href="#" className="text-blue-500 hover:underline">SingIn</a>
        </p></Link>

        {
          registerError && <p className="text-red-600">{registerError}</p>
        }

        {
          success && <p className="text-green-700">{success}</p>
        }
      </div>
    </div>
        </div>
    );
};

export default SignUp;