import React, { useEffect, useReducer, useState } from 'react';
import InputBox from '../UI/InputBox';

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({email:"", password: ""});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer((lastState, action)=> {
        return {value: "", isValid: false};
    }, {value: "", isValid:false})

    useEffect(() => {
        const timeoutIdentifier = setTimeout(()=> {
            console.log("Validation");
            setIsFormValid(loginDetails.email.includes("@") && loginDetails.password.length > 3);
        }, 500);
        console.log("timeoutIdentifier", timeoutIdentifier);

        return ()=> {
            console.log("Cleanup", timeoutIdentifier);
            clearTimeout(timeoutIdentifier);
        }
    }, [loginDetails])

    useEffect(() => {
        const storedLoggedInInformation = localStorage.getItem("isLoggedIn");
        if(storedLoggedInInformation === "1"){
            setIsLoggedIn(true);
        }
    }, []);
    
    const LogoutSection = () => {
        return (
            <>
            <h2>Logout Now</h2>
            <button onClick={logoutHandler} className="text-gray-500 border border-gray-500 rounded-md px-8 py-2 text-base font-medium hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-text-300">
              Logout
            </button>
            </>
        );
    };

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.setItem("isLoggedIn", "0");
        setIsLoggedIn(false);
    }
    const changeHandler = (event) =>  {
        setLoginDetails((prev) => {
            return {...prev, [event.target.name]: event.target.value};
        })
    };

    if (isLoggedIn){
        return (
            <>
        <LogoutSection/>
        <h1>User Logged In</h1>
    </>
        );
    }
  return (
    <>
      {/* {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )} */}
      <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg">
        <h1 className='font-bold'>Login</h1>
        <form onSubmit={loginHandler}>
          <div className="grid">
            <label className="block text-sm font-medium">Email</label>
            <InputBox
              name="email"
              value={loginDetails.email}
              onChange={changeHandler}
            />
          </div>
          <div className="grid mt-2">
            <label className="block text-sm font-medium">Password</label>
            <InputBox
              type="password"
              name="password"
              value={loginDetails.password}
              onChange={changeHandler}
            />
          </div>
          <div className="mt-2">
            <button disabled={!isFormValid}  className="bg-green-500 text-white disabled:bg-green-400 rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;