import { useState } from "react"
import '../App.css';
import loginbgImage from "../assets/White and Brown Minimalist Organic Home Decor Presentation.jpg";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
function Home() {
    let navigate = useNavigate();

    return (
        <>
            <div className="home-container" style={{ backgroundImage: `url(${loginbgImage})` }}>
                <div className="text-sec">
                    <h3>Let us decorate your home</h3>
                    <button onClick={() => navigate("/authform")} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 getStartedbtn ">Get Started <FaArrowRight /></button>
                </div>
            </div>

        </>
    )
}
export default Home