import React from "react";
import { Link, NavLink as ActiveLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="header mt-10">
            <div className="container flex flex-col items-center max-w-[1920px] mx-auto">
                <h2 className="text-[40px] font-semibold">
                    <p>
                        <Link to="/">Sunglass Hut</Link>
                    </p>
                </h2>
                <nav>
                    <ul className="flex gap-x-6 text-[24px] text-[#3498db]">
                        <li className="hover:text-gray-400">
                            <ActiveLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                        ? "active"
                                        : ""
                                }
                            >
                                Home
                            </ActiveLink>
                        </li>
                        <li className="hover:text-gray-400">
                            <ActiveLink
                                to="/third-party"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                        ? "active"
                                        : ""
                                }
                            >
                                Third Party
                            </ActiveLink>
                        </li>
                        <li className="hover:text-gray-400">
                            <ActiveLink
                                to="/login"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                        ? "active"
                                        : ""
                                }
                            >
                                Login
                            </ActiveLink>
                        </li>
                        <li className="hover:text-gray-400">
                            <ActiveLink
                                to="/register"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                        ? "active"
                                        : ""
                                }
                            >
                                Register
                            </ActiveLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
