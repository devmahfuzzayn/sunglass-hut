import React, { useState } from "react";
import {
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

const auth = getAuth(app);

const ThirdParty = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [signInPlatform, setSignInPlatform] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(result.user);
                setLoggedUser(user);
                setSignInPlatform("Google");
            })
            .catch((error) => {
                const message = error.message;
                console.log(message);
                setLoggedUser(null);
            });
    };

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const user = result.user;
                console.log(result.user);
                setLoggedUser(user);
                setSignInPlatform("Github");
            })
            .catch((error) => {
                const message = error.message;
                console.log(message);
                setLoggedUser(null);
            });
    };

    const handleFacebookSignIn = () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;
                console.log(result.user);
                setLoggedUser(user);
                setSignInPlatform("Facebook");
            })
            .catch((error) => {
                const message = error.message;
                console.log(message);
                setLoggedUser(null);
            });
    };

    return (
        <div className="third-party my-10">
            <div className="container max-w-[1920px] flex flex-col items-center gap-y-10 mx-auto">
                <div className="authentication-container flex gap-x-4">
                    <div className="google">
                        <button
                            onClick={handleGoogleSignIn}
                            className="bg-[#13ba1b] text-white text-[22px] px-4 py-2 rounded-lg"
                        >
                            Sign in using Google
                        </button>
                    </div>
                    <div className="github">
                        <button
                            onClick={handleGithubSignIn}
                            className="bg-[#030509] text-white text-[22px] px-4 py-2 rounded-lg"
                        >
                            Sign in using Github
                        </button>
                    </div>
                    <div className="github">
                        <button
                            onClick={handleFacebookSignIn}
                            className="bg-[#3498db] text-white text-[22px] px-4 py-2 rounded-lg"
                        >
                            Sign in using Facebook
                        </button>
                    </div>
                </div>
                <div className="user-information-container">
                    {loggedUser && (
                        <div className="div">
                            <h2 className="text-[40px]">
                                User Signed In Information{" "}
                                <span className="text-violet-500">
                                    ({signInPlatform})
                                </span>
                            </h2>
                            <div className="text-[22px] flex flex-col items-center">
                                <img
                                    className="w-full max-w-[150px] rounded-lg"
                                    src={loggedUser.photoURL}
                                    alt=""
                                />
                                <p className="mt-4">
                                    User Name: {loggedUser.displayName}
                                </p>
                                <p>
                                    Email:{" "}
                                    <span className="text-indigo-500">
                                        {loggedUser.email
                                            ? loggedUser.email
                                            : "Not Available"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThirdParty;
