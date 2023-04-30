import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from '../../firebase/firebaseStatus';
import "./style.css";
import { HOME, SIGN_UP, FORGOTPASSWORD } from '../../components/routes';
import instagramlogo from '../../images/instagramlogo.svg';

const Login = () => {
    const { firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password === '' || email === '';

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate(HOME);

        } catch (error) {
            setEmail('');
            setPassword('');
            alert(error.message);
        }
    }


    useEffect(() => {
        document.title = "Login • Instagram";
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <img className='instagramlogo' src={instagramlogo} width="454px" />
            </div>
            <div className="flex flex-col">
                <div className="p-4 bg-white border border-gray-primary mb-4 w-80 rounded">
                    <div className="instagram-font text-5xl text-center mb-3">
                        Instagram
                    </div>
                    {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
                    <h6 className='mb-4'>Login</h6>

                    <form onSubmit={handleSubmit} className="" method="post">
                        <div>
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
                            <input
                                type="password"
                                aria-label="Enter your password"
                                placeholder="Password"
                                className="text-sm text-gray-base w-full py-5 px-4 h-2 border
                                border-gray-primary rounded mb-4"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={
                                    `mb-3 bg-blue-inst cursor-pointer text-white rounded w-full h-8 font-bold ${isInvalid && "opacity-50"}`
                                }
                            >
                                Log In
                            </button>
                        </div>

                        <div className='center m-1'>
                            <Link to={FORGOTPASSWORD} className="font-semibold text-sm text-blue-inst center">
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="rounded flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Don't have an account yet?{` `}
                        <Link to={SIGN_UP} className="font-bold text-blue-inst">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;