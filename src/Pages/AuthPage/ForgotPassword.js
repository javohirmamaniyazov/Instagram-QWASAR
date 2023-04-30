import React, { useState, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';
import { LOGIN, SIGN_UP } from '../../components/routes';
import ResetPassword from '../../Icons/ResetPassword';
import "./style.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent!");
            })
            .catch((error) => {
                alert(`${error.code} ${error.message}`)
            });
    }

    const isInvalid = email.trim() === '';

    useEffect(() => {
        document.title = "Reset Password • Instagram";
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col">
                <div className="p-4 bg-white border border-gray-primary mb-0 w-80">
                    {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="" method="post">
                        <div>
                            <div className='flex items-center justify-center mb-3'>
                                <ResetPassword />
                            </div>
                            <div className="text-2xl text-center mb-5">
                                Trouble logging in?
                            </div>
                            <p className='p1 mb-4'>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                            <input
                                type="text"
                                aria-label="Enter your email address"
                                placeholder="Email address"
                                className="text-sm text-gray-base w-full py-5 px-4 h-2 border
                                border-gray-primary rounded mb-4"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={
                                    `bg-blue-inst cursor-pointer text-white rounded w-full h-8 font-bold ${isInvalid && "opacity-50"}`
                                }
                            >
                                Reset Password
                            </button>
                            <a className='reset_password mb-4 mt-3' href='https://help.instagram.com/374546259294234'>Can't reset your password?</a>
                            <div className='login__ordiv'>
                                <div className="login__dividor"></div>
                                <div className="login__or">OR</div>
                                <div className="login__dividor"></div>
                            </div>
                            <div className="flex justify-center items-center flex-col w-full bg-white p-4">
                                <p className="text-sm">
                                    <Link to={SIGN_UP} className="text-black-inst mb-4 ml-2">Create new account</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-silver p-4 border border-gray-primary">
                    <p className="text-sm">
                        <Link to={LOGIN} className="text-blue-inst ml-2">Back to Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;