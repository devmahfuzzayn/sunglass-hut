import React from "react";

const Home = () => {
    return (
        <div className="home mt-10">
            <div className="container flex flex-col items-center max-w-[1920px] mx-auto">
                <h2 className="text-[48px]">
                    Welcome to the Home of{" "}
                    <span className="text-[#42971d]">Sunglass Hut</span>
                </h2>
                <p className="text-[24px] text-gray-500">
                    Navigate to any above pages to get signed up or in.
                </p>
            </div>
        </div>
    );
};

export default Home;
