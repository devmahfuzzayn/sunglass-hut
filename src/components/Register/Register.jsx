import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const handleRegister = (e) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const checkPassword = validatePassword(password);
        if (!checkPassword) return;

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setSuccess("User successfully registered.");
                setError(null);
                console.log(result);
                sendEmailVerification(user)
                    .then(() => {
                        setSuccess("Please verify your email.");
                        updateProfile(user, {
                            displayName: name,
                        })
                            .then(() => {
                                form.reset();
                            })
                            .catch((error) => {
                                console.log(error.message);
                            });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                const message = error.message;
                console.log(message);
                setError(message);
            });
    };

    const validatePassword = (password) => {
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError("The password must contain 2 uppercase characters.");
            return false;
        } else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError("The password must contain a special character.");
            return false;
        } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError("The password must contain two number.");
            return false;
        } else if (!/.{8}/.test(password)) {
            setError("The password must be eight characters long.");
            return false;
        }
        return true;
    };

    return (
        <div className="register my-10">
            <div className="container flex flex-col items-center max-w-[1920px] mx-auto">
                <form
                    onSubmit={handleRegister}
                    className="w-full max-w-[400px] flex flex-col text-[22px] gap-y-4 mt-4"
                >
                    <h2 className="text-[40px] text-center">Please Register</h2>
                    <input
                        className="border-2 border-gray-500 px-4 py-2 rounded-md"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your Name"
                        required
                    />
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
                            Already registered?{" "}
                            <Link to="/login" className="text-[#3498db]">
                                Login
                            </Link>
                        </small>
                    </p>
                    <input
                        className="bg-[#13ba1b] text-white text-[22px] px-4 py-2 rounded-lg cursor-pointer"
                        type="submit"
                        value="Register"
                    />
                </form>
            </div>
        </div>
    );
};

export default Register;
