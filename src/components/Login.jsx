import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkEmailAndPassword } from '../utilities/validate';
import { Signup, Signin, signInWithGoogle } from '../utilities/Firebase';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp)
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        const message = checkEmailAndPassword(emailRef.current.value, passwordRef.current.value);
        setErrorMessage(message);
        if (message === null) {
            if (isSignUp) {
                Signup(emailRef.current.value, passwordRef.current.value).then((res) => setErrorMessage(res));
            } else {
                Signin(emailRef.current.value, passwordRef.current.value).then((res) => setErrorMessage(res));
            }
        }
    }

    const handleButtonClickV2 = (e) => {
        e.preventDefault();
        signInWithGoogle().then((res) => setErrorMessage(res));
    }
    return (
        <div>
            <Header />
            <form className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75'>
                <h1 className='font-bold text-3xl py-4'>{isSignUp ? "Sign Up" : "Sign In"}</h1>
                {isSignUp && (<input ref={nameRef} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />)}
                <input ref={emailRef} type='text' placeholder='Email or Mobile Number' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />
                <input ref={passwordRef} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />
                {errorMessage && (<p>{errorMessage}</p>)}
                <button className='p-4 my-6 w-full bg-red-700 rounded-lg' onClick={handleButtonClick}>{isSignUp ? "Sign Up" : "Sign In"}</button>
                { !isSignUp && (<button className='p-4 my-2 w-full bg-red-700 rounded-lg' onClick={handleButtonClickV2}>Sign In With Google</button>)}
                <p className='py-4'>{isSignUp ? "Already a User? " : "New to Netflix? "}<span className='font-bold' onClick={toggleSignUp}>{isSignUp ? "Sign In" : "Sign Up"}</span></p>
            </form>
            <div>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/3149e5eb-4660-4e3d-9e65-b1e615229c64/IN-en-20240513-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='background-img' />
            </div>
        </div>
    )
}

export default Login
