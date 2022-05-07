import React, { useEffect, useReducer, useState } from 'react';
import Card from '../UI/Card';
import InputBox from '../UI/InputBox';

const Login = () => {
    // const [loginDetails, setLoginDetails] = useState({email:"", password: ""});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer((lastState, action)=> {
      if(action.type === "USER_INPUT"){
        return {value: action.value, isValid: action.value.includes('@')};
      }
      if(action.type === "INPUT_BLUR"){
        return {value: lastState.value, isValid: lastState.value.includes('@')};
      }
      return {value: "", isValid: false};
    }, {value: "", isValid:null});

    const passwordReducer = (lastState, action) => {
      if(action.type === "USER_INPUT"){
        return {value: action.value, isValid: action.value.length > 3};
      }
      if(action.type === "INPUT_BLUR"){
        return {value: lastState.value, isValid: lastState.value.length > 3};
      }
      return {value: "", isValid: false};
    };

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: null});

    useEffect(() => {
      setIsFormValid(emailState.isValid && passwordState.isValid);
        // const timeoutIdentifier = setTimeout(()=> {
        //     console.log("Validation");
        //     setIsFormValid(emailState.isValid && passwordState.isValid);
        // }, 500);
        // console.log("timeoutIdentifier", timeoutIdentifier);

        // return ()=> {
        //     console.log("Cleanup", timeoutIdentifier);
        //     clearTimeout(timeoutIdentifier);
        // }
    }, [emailState.isValid, passwordState.isValid])

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
      if(event.target.name === "email"){
        dispatchEmail({type: "USER_INPUT", value: event.target.value});
      }
      if(event.target.name === "password"){
        dispatchPassword({type: "USER_INPUT", value: event.target.value});
      }
        // setLoginDetails((prev) => {
        //     return {...prev, [event.target.name]: event.target.value};
        // })
    };

    const validateEmailHandler = () => {
      dispatchEmail({type: "INPUT_BLUR"});
    };

    const validatePasswordHandler = () => {
      dispatchPassword({type: "INPUT_BLUR"});
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
      <Card>
        <h1 className='font-bold'>Login</h1>
        <form onSubmit={loginHandler}>
          <div className="grid">
            <label className="block text-sm font-medium">Email</label>
            <InputBox
              name="email"
              value={emailState.value}
              onChange={changeHandler}
              isValid = {emailState.isValid}
              onBlur = {validateEmailHandler}
            />
          </div>
          <div className="grid mt-2">
            <label className="block text-sm font-medium">Password</label>
            <InputBox
              type="password"
              name="password"
              value={passwordState.value}
              onChange={changeHandler}
              isValid = {passwordState.isValid}
              onBlur = {validatePasswordHandler}
            />
          </div>
          <div className="mt-2">
            <button disabled={!isFormValid}  className="bg-green-500 text-white disabled:bg-green-400 rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
              Login
            </button>
          </div>
        </form>
      </Card>
    </>
  )
}

export default Login;