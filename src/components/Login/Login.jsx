import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                if (!user.emailVerified) {
                    setError("Please verify your email first.");
                    return;
                }
                setSuccess("User successfully logged in.");
                setError(null);
                setLoggedUser(user);
                form.reset();
                // Hide Form After Successful Authentication
                // form.classList.add("hidden");
                console.log(result);
            })
            .catch((error) => {
                const message = error.message;
                console.log(message);
                setError(message);
            });
    };

    return (
        <div className="login my-10">
            <div className="container flex flex-col items-center max-w-[1920px] mx-auto">
                <form
                    onSubmit={handleRegister}
                    className="form w-full max-w-[400px] flex flex-col text-[22px] gap-y-4 mt-4"
                >
                    <h2 className="text-[40px] text-center">Please Login</h2>
                    <input
                        className="border-2 border-gray-500 px-4 py-2 rounded-md"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email"
                        required
                    />
                    <input
                        className="border-2 border-gray-500 px-4 py-2 rounded-md"
                        type={`${!isPasswordVisible ? "password" : "text"}`}
                        name="password"
                        id="password"
                        placeholder="Enter Your Password"
                        required
                    />
                    <div className="flex items-center gap-x-2">
                        <input
                            onChange={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                            }
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                        />
                        <label
                            className="text-[20px] select-none relative top-[2px]"
                            htmlFor="flexCheckChecked"
                        >
                            See password
                        </label>
                    </div>
                    {success && (
                        <p>
                            <span className="text-green-500">{success}</span>
                        </p>
                    )}
                    {error && (
                        <p>
                            <span className="text-red-400">{error}</span>
                        </p>
                    )}
                    <p>
                        <small>
                            Not registered?{" "}
                            <Link to="/register" className="text-[#3498db]">
                                Register
                            </Link>
                        </small>
                    </p>
                    <input
                        className="bg-[#13ba1b] text-white text-[22px] px-4 py-2 rounded-lg cursor-pointer"
                        type="submit"
                        value="Login"
                    />
                </form>
                <div className="logged-in-user-container mt-12">
                    {loggedUser && (
                        <div className="user-information flex flex-col items-center text-[20px]">
                            <h2 className="text-[40px] text-center">
                                Logged In User Information
                            </h2>
                            {loggedUser.photoURL ? <img src={loggedUser.photoURL} alt="" /> : <p className="text-gray-400"><small>Photo Unavailable</small></p>}
                            <h2>Name: {loggedUser.displayName}</h2>
                            <p>
                                Email:{" "}
                                <span className="text-indigo-500">
                                    {loggedUser.email}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
