import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from '../../firebase/firebaseStatus';
import "./style.css";
import { HOME, LOGIN } from '../../components/routes';
import { doesUsernameExist } from '../../firebase/firebaseServise';

const SignUp = () => {
    const { firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const isInvalid = password === '' || email === '';

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const usernameExists = await doesUsernameExist(username);
            if(!usernameExists.length) {
                try {
                    const userResult = await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password);

                    await userResult.user.updateProfile({
                        displayName: username
                    })

                    await firebase.firestore().collection("users").add({
                        userId: userResult.user.uid,
                        username: username.toLowerCase(),
                        email: email.toLowerCase(),
                        following: [],
                        followers: [],
                        dataCreated: Date.now(),
                        avatarSrc: "/images/avatars/default.png"
                    });

                    navigate(HOME);
                } catch (error) {
                    setEmail('');
                    setPassword('');
                    alert(error.message);
                }
            } else {
                alert("This username is already taken, please try another.");
            }
        } catch (error) {
            setEmail('');
            setPassword('');
            alert(error.message);
        }
    }


    useEffect(() => {
        document.title = "Sign Up • Instagram";
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col">
                <div className="p-4 bg-white border border-gray-primary mb-4 w-80 rounded">
                    <div className="instagram-font text-5xl text-center mb-4">
                        Instagram
                    </div>
                    { error && <p className="mb-4 text-xs text-red-500">{error}</p> }
                    <h6 className='mb-4'>Register</h6>
                    
                    <div className='center'>
                        <p className='p1 mb-4'>Register to see photos and videos of your friends.</p>
                    </div>
                   
                    <form onSubmit={handleSubmit} className="" method="post">
                        <div>
                            <input
                                type="text"
                                aria-label="Enter your email username"
                                placeholder="Username"
                                className="text-sm text-gray-base w-full py-5 px-4 h-2 border
                                border-gray-primary rounded mb-4"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
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
                                    `bg-blue-inst cursor-pointer text-white rounded w-full h-8 font-bold ${isInvalid && "opacity-50"}`
                                }
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
                <div className="rounded flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Already have an account?{` `}
                        <Link to={LOGIN} className="font-bold text-blue-inst">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;