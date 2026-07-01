import { useState, Fragment, useEffect, useRef } from 'react'
import '../App.css';
import bgImage from "../assets/loginPage.jpg";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";

import { Link } from "react-router";
import { useNavigate } from "react-router";
import dinningImg from "../assets/yann-maignan-x3BCSWCAtrY-unsplash.jpg";
// import Header from "./Header";
import { FaUserGraduate } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

const navigation = {
    categories: [
        {
            id: 'designgallery',
            name: 'Design Gallery',

            sections: [
                {
                    id: 'ModularKitchen',
                    name: 'Modular Kitchen',
                    path: '/modularkitchen'

                },
                {
                    id: 'Customise your Kitchen',
                    name: 'Customise your Kitchen',

                },
                {
                    id: 'Wardrobe Design',
                    name: 'Wardrobe Design',

                },
            ],
        },
        {
            id: 'recentprojects',
            name: 'Recent projects',

            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',

                },
                {
                    id: 'accessories',
                    name: 'Accessories',

                },
                {
                    id: 'customiseyourkitchen',
                    name: 'Customise Your Kitchen',

                },
                {
                    id: 'brands',

                },
                {
                    id: 'brandsa',
                    name: 'Brandsa',

                },
            ],
        },
        {
            id: 'Blog',
            name: 'Blog',

            sections: [
                {
                    id: 'clothings',
                    name: 'Clothings',

                },
                {
                    id: 'accessoriess',
                    name: 'Accessoriess',

                },
                {
                    id: 'brandss',
                    name: 'Brandss',
                    // items: [
                    //     { name: 'Full Nelson', href: '#' },
                    //     { name: 'My Way', href: '#' },
                    //     { name: 'Re-Arranged', href: '#' },
                    //     { name: 'Counterfeit', href: '#' },
                    //     { name: 'Significant Other', href: '#' },
                    // ],
                },
            ],
        },
    ],
    // pages: [
    //     { name: 'Company', href: '#' },
    //     { name: 'Stores', href: '#' },
    // ],
}
function Authform() {

    const { darkMode } = useTheme();

    useEffect(() => {
        console.log("Component Loaded");
        // getUsers();
    }, []);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [isLogin, setIslogin] = useState(true);

    const [formData, setFormData] = useState({
        userId: "",
        password: ""
    })

    //focus input
    const userIdRef = useRef(null);
    const passwordRef = useRef(null);

    const [error, setError] = useState({})
    // const [ErrorSignin, setFormDataSignin] = useState({})
    const [errorSignin, setErrorSignin] = useState({})
    const [isChecked, setIsChecked] = useState(true);

    const validform = () => {

        let newError = {}
        if (!formData.userId.trim()) {
            newError.userId = "UserId is required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.userId)) {
            newError.userId = "Invalid UserId"
        }

        if (!formData.password.trim()) {
            newError.password = "Password is required"
        } else if (formData.password.length < 5) {
            newError.password = "Password must be greater than 5 character "
        }
        return newError;
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     // setFormData({ ...formData, [name]: value })

    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));

    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const validdataError = validform()
    //     if (Object.keys(validdataError).length === 0) {
    //         console.log("Form Submitted", formData);

    //         alert("Value Submitted")

    //         setFormData({
    //             userId: "",
    //             password: ""
    //         })
    //         setError({})
    //     } else {
    //         setError(validdataError);

    //         //focus input
    //         if (validdataError.userId) {
    //             userIdRef.current.focus();
    //         } else if (validdataError.password) {
    //             passwordRef.current.focus();
    //         }
    //     }



    // }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setError(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validdataError = validform();

        if (Object.keys(validdataError).length > 0) {
            setError(validdataError);

            if (validdataError.userId) {
                userIdRef.current?.focus();
            } else if (validdataError.password) {
                passwordRef.current?.focus();
            }

            return;
        }

        try {
            const response = await loginUser(formData)

            const data = await response.json();

            // alert(data.message);

            if (response.ok) {
                toast.success(data.message);
                localStorage.setItem("loggedInUser", formData.userId);
                window.dispatchEvent(new Event("userLogin"));
                setFormData({
                    userId: "",
                    password: ""
                });

                setError({});
                navigate("/user");
                // navigate("/dashboard");
            } else {
                toast.error(data.message);
            }

        } catch (err) {
            console.error(err);
            toast.error("Server Error");
        }
    };

    const [isSignin, setIsSignIn] = useState(false);
    const [formDatasignin, setFormDatasignin] = useState({
        userId: "",
        password: ""
    })

    // const handleChangesignIn = (e) => {
    //     const { name, value } = e.target
    //     // setFormDatasignin({ ...formDatasignin, [name]: value })

    //     setFormDatasignin(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));

    // }

    // const validSigninform = () => {

    //     let newErrorSignin = {}
    //     if (!formDatasignin.userid.trim()) {
    //         newErrorSignin.userid = "UserId is required"
    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formDatasignin.userId)) {
    //         newErrorSignin.userid = "Invalid userid"
    //     }

    //     if (!formDatasignin.password.trim()) {
    //         newErrorSignin.password = "Password is required"
    //     } else if (formDatasignin.password.length < 5) {
    //         newErrorSignin.password = "Password must be greater than 5 character "
    //     }
    //     return newErrorSignin;
    // }

    const handleChangesignIn = (e) => {
        const { name, value } = e.target;

        setFormDatasignin(prev => ({
            ...prev,
            [name]: value
        }));

        setErrorSignin(prev => ({
            ...prev,
            [name]: ""
        }));
    };
    const validSigninform = () => {
        let newErrorSignin = {};

        if (!formDatasignin.userId.trim()) {
            newErrorSignin.userId = "UserId is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formDatasignin.userId)
        ) {
            newErrorSignin.userId = "Invalid UserId";
        }

        if (!formDatasignin.password.trim()) {
            newErrorSignin.password = "Password is required";
        } else if (formDatasignin.password.length < 5) {
            newErrorSignin.password = "Password must be greater than 5 characters";
        }

        return newErrorSignin;
    };
    // const handleSigninsubmit = async (e) => {
    //     e.preventDefault()
    //     const action = e.nativeEvent.submitter.value;
    //     if (action === "signup") {
    //         console.log("signup logic");
    //     }

    //     else if (action === "guest") {
    //         console.log("Guest logic");
    //     }

    //     const validdataErrorSignin = validSigninform()
    //     if (Object.keys(validdataErrorSignin).length === 0) {
    //         console.log("Form Submitted", formDatasignin);

    //         alert("Value Submitted")

    //         setIsSignIn({
    //             userid: "",
    //             password: ""
    //         })
    //         setFormDataSignin({})
    //     } else {
    //         setFormDataSignin(validdataErrorSignin)
    //     }




    // }
    const handleSigninsubmit = async (e) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter.value;

        if (action === "guest") {
            console.log("Guest logic");
            return;
        }

        const validdataErrorSignin = validSigninform();

        if (Object.keys(validdataErrorSignin).length > 0) {
            setErrorSignin(validdataErrorSignin);
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formDatasignin)
            });

            const data = await response.json();

            // alert(data.message);

            // if (response.ok) {
            //     setFormDatasignin({
            //         userId: "",
            //         password: ""
            //     });

            //     setErrorSignin({});
            // }

            if (response.ok) {
                toast.success(data.message);

                localStorage.setItem("loggedInUser", formDatasignin.userId);

                setFormDatasignin({
                    userId: "",
                    password: ""
                });

                setErrorSignin({});

                setIslogin(true);

                // navigate("/user");
                // automatically show Login form
            } else {

                toast.error(data.message);

            }

        } catch (err) {
            console.error(err);

            toast.error("Server Error");
        }
    };
    const [selected, setSelected] = useState("All Designs");

    // const options = [
    //     "All Designs",
    //     "Indian Home Design Photos",
    //     "American Home Design Photos",
    //     "Eclectic Home Design Photos",
    //     "Asian Home Design Photos",
    //     "British Colonial Home Design Photos",
    // ];

    const designData = [
        {
            id: 1,
            category: "British Colonial Home Design Photos",
            images: [
                "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
            ],
        },
        {
            id: 2,
            category: "Indian Home Design Photos",
            images: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
            ],
        },
        {
            id: 3,
            category: "Contemporary Home Design Photos",
            images: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
            ],
        },
        {
            id: 4,
            category: "Modern Home Design Photos",
            images: [
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",


            ],
        }


    ];
    const [selectedImage, setSelectedImage] = useState(null);
    //selected → stores the currently selected dropdown value
    // setSelected → updates the selected value
    // Case 1 → If selected is "All Designs" --> selected === "All Designs" Then:filteredData = designData
    // Case 2 → If another category is selected -->selected = "Indian Home Design Photos" Then this runs: designData.filter((item) => item.category === selected)

    const filteredData =
        selected === "All Designs"
            ? designData
            : designData.filter((item) => item.category === selected);

    const designcategories = [
        "All Designs",
        ...new Set(designData.map((item) => item.category)),
    ];
    //designData.map((item) => item.category) Extracts all category names.
    //new Set(...) Removes duplicates.
    //... Spread operator converts Set back into array. ["British Colonial Home Design Photos","Indian Home Design Photos",]

    // designcategories → Creates Dropdown Options ,This decides: What options will appear inside dropdown ["All Designs", "Indian Home Design Photos",]
    //2. selected → Stores Current Selected Option -->const [selected, setSelected] = useState("All Designs");This stores:Which option user selected currently




    const scrollRef = useRef();

    const stories = [
        { id: 1, title: "Home", img: "https://images.unsplash.com/photo-1560184897-ae75f418493e" },
        { id: 2, title: "Office", img: "https://images.unsplash.com/photo-1497366216548-37526070297c" },
        { id: 3, title: "Kitchen", img: "https://images.unsplash.com/photo-1556911220-bff31c812dba" },
        { id: 4, title: "Living Room", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" },
        { id: 5, title: "Gym", img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e" },
        { id: 6, title: "Wardrobe", img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf" },
        { id: 7, title: "Corridor", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
        { id: 8, title: "Entry", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
        { id: 9, title: "Bedroom", img: "https://images.unsplash.com/photo-1505693314120-0d443867891c" },
        { id: 10, title: "Utility Room", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952" },
        { id: 11, title: "Staircase", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d" },
        { id: 12, title: "Exterior", img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" },
    ];

    const scroll = (direction) => {
        const scrollAmount = 400;
        if (direction === "left") {
            scrollRef.current.scrollLeft -= scrollAmount;
        } else {
            scrollRef.current.scrollLeft += scrollAmount;
        }
    };




    const ExploredesignData = [
        {
            id: 1,
            titleexp: "Wardrobe Design",
            descriptionexp: "Elegant wardrobe solutions for modern homes.",

            cover:
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",

            imagesexp: [
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
                "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
                "https://images.unsplash.com/photo-1616046229478-9901c5536a45",
            ],
        },

        {
            id: 2,
            titleexp: "Living Room",
            descriptionexp: "Comfortable and aesthetic living space designs.",

            cover:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",

            imagesexp: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                "https://images.unsplash.com/photo-1494526585095-c41746248156",
            ],
        },

        {
            id: 3,
            titleexp: "Living Room",
            descriptionexp: "Comfortable and aesthetic living space designs.",

            cover:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",

            imagesexp: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                "https://images.unsplash.com/photo-1494526585095-c41746248156",
            ],
        },
    ];

    const cardRef = useRef(null);
    const [animate, setAnimate] = useState(false);

    const cardRef2 = useRef(null);
    const [animate2, setAnimate2] = useState(false);

    useEffect(() => {
        const observer1 = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(false);

                    setTimeout(() => {
                        setAnimate(true);
                    }, 50);
                }
            },
            { threshold: 0.5 }
        );

        const observer2 = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate2(false);

                    setTimeout(() => {
                        setAnimate2(true);
                    }, 50);
                }
            },
            { threshold: 0.5 }
        );

        if (cardRef.current) {
            observer1.observe(cardRef.current);
        }

        if (cardRef2.current) {
            observer2.observe(cardRef2.current);
        }

        return () => {
            observer1.disconnect();
            observer2.disconnect();
        };
    }, []);


    return (
        <>

            <div
                className="w-full h-[87vh] bg-cover bg-[center_30%] bg-no-repeat relative"
                style={{ backgroundImage: `url(${bgImage})` }}
            >

                <div className="form-container">
                    <div className="btn-sec">
                        <button type="button" className={isLogin ? "active" : ""} onClick={() => setIslogin(true)}>Log in</button>
                        <button type="button" className={!isLogin ? "active" : ""} onClick={() => setIslogin(false)}>Sign up</button>
                    </div>
                    {isLogin ?
                        <>
                            <div className="form">
                                <h1 className="text-black">Login Form</h1>
                                <h3 className="text-gray-700"> Let's Login to Your Account Here!</h3>
                                <form onSubmit={handleSubmit} >


                                    <div className="relative mt-4 max-w-md">
                                        <FaRegUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                                        <input
                                            ref={userIdRef} // Step 2: Attach ref
                                            type="text"
                                            name="userId"
                                            value={formData.userId}
                                            placeholder="Username"
                                            onChange={handleChange}
                                            autoComplete="email"
                                            className={`w-full rounded-md bg-white pl-10 pr-3 py-2 text-gray-900 outline-1 
            outline-gray-300 placeholder:text-gray-500 focus:outline-2 
            ${error.userId ? "outline-red-500" : "focus:outline-indigo-600"}`}
                                        />
                                    </div>

                                    <p style={{ color: "red" }}>{error.userId}</p>
                                    <div className="relative mt-4 max-w-md">
                                        <MdOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                                        <input
                                            ref={passwordRef} // Step 2: Attach ref
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            placeholder='password'
                                            onChange={handleChange}
                                            autoComplete="email"
                                            className={`w-full rounded-md bg-white pl-10 pr-3 py-2 text-gray-900 outline-1 
            outline-gray-300 placeholder:text-gray-500 focus:outline-2 
            ${error.password ? "outline-red-500" : "focus:outline-indigo-600"}`}
                                        />

                                    </div>

                                    <p style={{ color: "red" }}>{error.password}</p>

                                    <div className='forgot'>
                                        <div className="remembertxt text-gray-800">
                                            <input type="checkbox" id="remember" value="remember" />
                                            <label htmlFor="remember" >Remember me</label>
                                        </div>

                                        <a href='#'>Forgot Password?</a>
                                    </div>

                                    <div className="submitbtn">
                                        <button type='submit' className='loginBtn' >Login</button>
                                    </div>

                                </form>
                            </div>
                        </>

                        : <>
                            <div className="form">

                                <h2>SignUp Form</h2>

                                <form onSubmit={handleSigninsubmit} >


                                    <div className="relative mt-4 max-w-md">
                                        <FaRegUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                                        {/* <input
                                            type="text"
                                            name="userid"
                                            value={formDatasignin.userid}
                                            placeholder="Username or Email"
                                            onChange={handleChangesignIn}
                                            autoComplete="email"
                                            className="w-full rounded-md bg-white pl-10 pr-3 py-2 text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600"
                                        /> */}

                                        <input
                                            type="text"
                                            name="userId"
                                            value={formDatasignin.userId}
                                            placeholder="Username or Email"
                                            onChange={handleChangesignIn}
                                            autoComplete="email"
                                            className={`w-full rounded-md bg-white pl-10 pr-3 py-2 text-gray-900 outline-1
    outline-gray-300 placeholder:text-gray-500 focus:outline-2
    ${errorSignin.userId ? "outline-red-500" : "focus:outline-indigo-600"}`}
                                        />

                                    </div>

                                    {/* <p style={{ color: "red" }}>{ErrorSignin.userid}</p> */}

                                    <p style={{ color: "red" }}>
                                        {errorSignin.userId}
                                    </p>

                                    <div className="relative mt-4 max-w-md">
                                        <MdOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                                        {/* <input type="password"
                                            name="password"
                                            value={formDatasignin.password}
                                            placeholder='password'
                                            onChange={handleChangesignIn}
                                            autoComplete="password"
                                            className="w-full rounded-md bg-white pl-10 pr-3 py-2 text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600"
                                        /> */}

                                        <input
                                            type="password"
                                            name="password"
                                            value={formDatasignin.password}
                                            placeholder="password"
                                            onChange={handleChangesignIn}
                                            autoComplete="password"
                                            className={`w-full rounded-md bg-white pl-10 pr-3 py-2 text-gray-900 outline-1
    outline-gray-300 placeholder:text-gray-500 focus:outline-2
    ${errorSignin.password ? "outline-red-500" : "focus:outline-indigo-600"}`}
                                        />

                                    </div>

                                    {/* <p style={{ color: "red" }}>{ErrorSignin.password}</p> */}

                                    <p style={{ color: "red" }}>
                                        {errorSignin.password}
                                    </p>

                                    <div className='forgot'>
                                        <div className="remembertxt text-gray-800">
                                            <input type="checkbox" id="keepmecheck" value="keepmecheck" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                                            <label htmlFor="signedin">Keep me signed in</label>
                                        </div>

                                        <a href='#'>Forgot Password?</a>
                                    </div>

                                    <div className="submitbtn">
                                        <button type='submit' className='signBtn' name="action" value="signup">Sign In</button>
                                        <button type='submit' className='emailBtn' name="action" value="guest">Email me Link to Sign In</button>
                                    </div>

                                </form>
                            </div>
                        </>}

                </div>

            </div>
            <div className={` ${darkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-black"
                }`}>
                <div className=" py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="mx-auto max-w-2xl lg:text-center">

                            <p
                                className={`text-4xl font-semibold tracking-tight sm:text-5xl ${darkMode
                                    ? "text-white"
                                    : "text-gray-900"
                                    }`}>
                                Explore Designs
                            </p>

                        </div>
                        {/* <h2 className="text-2xl font-semibold mb-6">
                       
                    </h2> */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

                            {ExploredesignData.map((item) => (

                                <div
                                    key={item.id}
                                    onClick={() =>
                                        navigate("/design", {
                                            state: item,
                                        })
                                    }
                                    className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white cursor-pointer"
                                >

                                    <img
                                        src={item.cover}
                                        className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                                    />

                                    <div className="p-4">

                                        <h2 className="font-semibold text-gray-800">
                                            {item.titleexp}
                                        </h2>

                                        <p className="text-sm text-gray-600 mt-2">
                                            {item.descriptionexp}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="relative rounded-xl overflow-hidden shadow-lg group">
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
                                className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
                            />

                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                                <h2 className="text-white text-lg font-semibold">
                                    Custom Kitchen
                                </h2>
                                <p className="text-gray-200 text-sm">
                                    Designed for your lifestyle
                                </p>
                            </div>
                        </div>

                    </div></div>

                <div className="bg-[rgb(234,221,202)] py-16 px-6 ">
                    <div className="max-w-7xl mx-auto">

                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {selected}
                                </h2>
                                <p className="mt-2 text-gray-600">
                                    Select Your Design
                                </p>
                            </div>

                            {/* <div className="relative">
                                <select
                                    value={selected}
                                    onChange={(e) => setSelected(e.target.value)}
                                    className="appearance-none w-full px-4 py-2 pr-10 rounded-xl border border-gray-300 bg-white shadow-md text-gray-700 font-medium focus:ring-2 focus:ring-green-400"
                                >
                                    {designcategories.map((cat, index) => (
                                        <option key={index} value={cat} className="bg-white text-gray-700">
                                            {cat}
                                        </option>
                                    ))}
                                </select>

                              
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    ▼
                                </span>
                            </div> */}

                            <div className="relative">
                                <select
                                    value={selected}
                                    onChange={(e) => setSelected(e.target.value)}
                                    className={`appearance-none w-full px-4 py-2 pr-10 rounded-xl border shadow-md font-medium focus:ring-2 focus:ring-green-400
        ${darkMode
                                            ? "bg-gray-800 text-white border-gray-600"
                                            : "bg-white text-gray-700 border-gray-300"
                                        }`}
                                >
                                    {designcategories.map((cat, index) => (
                                        <option
                                            key={index}
                                            value={cat}
                                            className={
                                                darkMode
                                                    ? "bg-gray-800 text-white"
                                                    : "bg-white text-gray-700"
                                            }
                                        >
                                            {cat}
                                        </option>
                                    ))}
                                </select>

                                <span
                                    className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${darkMode
                                        ? "text-white"
                                        : "text-gray-500"
                                        }`}
                                >
                                    ▼
                                </span>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {filteredData.map((item) =>
                                item.images.map((img, index) => (
                                    <div
                                        key={`${item.id}-${index}`}
                                        className="bg-white rounded-xl shadow-md overflow-hidden"
                                    >
                                        {/* <img
                                        src={img}
                                        className="w-full h-48 object-cover"
                                    /> */}

                                        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white group">
                                            <img
                                                src={img}
                                                alt=""
                                                onClick={() => setSelectedImage(img)}
                                                className="w-full h-48 object-cover hover:scale-105 transition duration-300 cursor-pointer"
                                            />

                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-160 transition duration-300 pointer-events-none">
                                                <span className="bg-transparent/90 text-gray-600 px-4 py-2 rounded-lg text-sm shadow-md">
                                                    Click the image to expand
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            )}

                            {selectedImage && (
                                <div
                                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
                                    onClick={() => setSelectedImage(null)}
                                >
                                    <div
                                        className="relative max-w-6xl w-[90%]"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* Close Button */}
                                        <button
                                            onClick={() => setSelectedImage(null)}
                                            className="absolute -top-12 right-0 text-white text-4xl"
                                        >
                                            ✕
                                        </button>

                                        <img
                                            src={selectedImage}
                                            alt=""
                                            className="w-full max-h-[85vh] object-contain rounded-xl"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className="w-full py-12 bg-[rgb(192,192,192)] mt-2 ">

                    {/* Heading */}
                    <div className="max-w-7xl mx-auto flex items-center mb-8 px-6 ">
                        <div className="flex-grow h-[2px] bg-gray-300"></div>
                        <h2 className="ml-6 text-3xl font-bold text-gray-800 whitespace-nowrap">
                            Our Stories
                        </h2>
                    </div>

                    {/* Carousel */}
                    <div className="relative max-w-7xl mx-auto px-6">

                        {/* LEFT BUTTON */}
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
                        >
                            ◀
                        </button>

                        {/* CARDS */}
                        <div
                            ref={scrollRef}
                            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
                        >
                            {stories.map((item) => (
                                <div
                                    key={item.id}
                                    className="min-w-[200px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                                >
                                    <img
                                        src={`${item.img}?auto=format&fit=crop&w=400&q=80`}
                                        className="w-full h-32 object-cover"
                                    />

                                    <div className="p-3 text-center">
                                        <p className="font-semibold text-gray-800">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT BUTTON */}
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
                        >
                            ▶
                        </button>

                    </div>
                </div>



                <div className="w-full py-16 ">
                    <div className="max-w-[1600px] mx-auto px-6">

                        <div
                            onClick={() => navigate("/shop")}
                            className="relative cursor-pointer overflow-hidden rounded-2xl group"
                        >

                            {/* IMAGE */}
                            <img
                                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80"
                                alt="Shop"
                                className="w-full h-[650px] object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* DARK OVERLAY */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-500"></div>

                            {/* CENTER CONTENT */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">

                                {/* TEXT */}
                                <p className="text-white text-xl md:text-2xl font-semibold mb-4 drop-shadow-lg">
                                    Best Sellers for a Reason
                                </p>

                                {/* BUTTON */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate("/shop");
                                    }}
                                    className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:bg-green-500 hover:text-white transition duration-300"
                                >
                                    Shop Now
                                </button>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                        {/* Left Side - Image */}
                        <div>
                            <img
                                src={dinningImg}
                                alt="Light Shade Dining Hall"
                                className="w-full h-[500px] object-cover"
                            />



                        </div>

                        {/* Right Side - Content */}
                        <div>

                            <div className="flex justify-end mb-8">
                                <div
                                    ref={cardRef}
                                    className={`bgwhite shadow-lg border border-gray-100 p-4 w-[280px] rounded-2xl ${animate ? "zoom-twice" : ""
                                        }`}
                                >
                                    <div className="flex justify-end gap-6">
                                        <div>
                                            <h3 className="text-base font-bold text-gray-800 flex gap-2">
                                                <FaUserGraduate />
                                                Sarah Johnson
                                            </h3>

                                            <p className="text-xs text-gray-600 flex gap-2">
                                                <FaBriefcase />
                                                Interior Designer
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                12+ Years Experience
                                            </p>
                                        </div>

                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                                            alt="Professional"
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>


                            <p className="text-sm uppercase tracking-[3px] text-gray-500 mb-3">
                                Elegant Dining
                            </p>

                            <h2 className={`text-4xl font-bold text-gray-800 mb-6 ${darkMode
                                ? "text-white"
                                : "text-gray-900"
                                }`}>
                                Create Beautiful Dining Moments
                            </h2>

                            <p className="text-gray-600 leading-8 mb-8">
                                Designed with soft neutral tones and natural light,
                                this dining space brings warmth and simplicity to your home.
                                The clean layout, wooden accents, and comfortable seating
                                create the perfect atmosphere for everyday meals and special
                                family gatherings.
                            </p>

                            <button className="bg-gray-900 text-white px-6 py-3 hover:bg-gray-700 transition">
                                Discover More
                            </button>
                        </div>

                    </div>
                </div>


                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                        {/* Left Side - content */}

                        <div>

                            <div className="flex justify-start mb-8">
                                <div
                                    ref={cardRef2}
                                    className={`bg-white shadow-lg border border-gray-100 p-4 w-[280px] rounded-2xl ${animate2 ? "zoom-twice" : ""
                                        }`}
                                >
                                    <div className="flex justify-start gap-6">

                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                                            alt="Professional"
                                            className="w-16 h-16 rounded-full object-cover"
                                        />

                                        <div>
                                            <h3 className="text-base font-bold text-gray-800 flex gap-2">
                                                <FaUserGraduate />
                                                Mousi Nair
                                            </h3>

                                            <p className="text-xs text-gray-600 flex gap-2">
                                                <FaBriefcase />
                                                Interior Designer
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                19+ Years Experience
                                            </p>
                                        </div>


                                    </div>
                                </div>
                            </div>


                            <p className="text-sm uppercase tracking-[3px] text-gray-500 mb-3">
                                Elegant Dining
                            </p>

                            <h2 className={`text-4xl font-bold text-gray-800 mb-6 ${darkMode
                                ? "text-white"
                                : "text-gray-900"
                                }`}>
                                Create Beautiful Dining Moments
                            </h2>

                            <p className="text-gray-600 leading-8 mb-8 ">
                                Designed with soft neutral tones and natural light,
                                this dining space brings warmth and simplicity to your home.
                                The clean layout, wooden accents, and comfortable seating
                                create the perfect atmosphere for everyday meals and special
                                family gatherings.
                            </p>

                            <button className="bg-gray-900 text-white px-6 py-3 hover:bg-gray-700 transition">
                                Discover More
                            </button>
                        </div>
                        <div>
                            <img
                                src={dinningImg}
                                alt="Light Shade Dining Hall"
                                className="w-full h-[500px] object-cover"
                            />



                        </div>

                        {/* Right Side - Image */}
                    </div>
                </div>


                <footer className="bg-gray-900 text-gray-300 mt-16">
                    <div className="max-w-7xl mx-auto px-6 py-12">

                        {/* Top Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                            {/* Brand */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    RoomDesign
                                </h2>
                                <p className="text-sm leading-6">
                                    Discover inspiring room designs, connect with professionals,
                                    and build your dream living space with confidence.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    Quick Links
                                </h3>

                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="hover:text-white transition">
                                            About
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" className="hover:text-white transition">
                                            Careers
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" className="hover:text-white transition">
                                            Contact Us
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" className="hover:text-white transition">
                                            Terms & Privacy
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Professionals */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    Professionals
                                </h3>

                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="hover:text-white transition">
                                            Review Professionals
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" className="hover:text-white transition">
                                            Suggested Professionals
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" className="hover:text-white transition">
                                            Become a Professional
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" className="hover:text-white transition">
                                            Professional Directory
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-700 mt-10 pt-6">

                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                                <p className="text-sm">
                                    © 2026 RoomDesign. All rights reserved.
                                </p>

                                <div className="flex flex-wrap gap-6 text-sm">
                                    <a href="#" className="hover:text-white transition">
                                        Terms
                                    </a>

                                    <a href="#" className="hover:text-white transition">
                                        Privacy
                                    </a>

                                    <a href="#" className="hover:text-white transition">
                                        Contact
                                    </a>

                                    <a href="#" className="hover:text-white transition">
                                        Support
                                    </a>
                                </div>

                            </div>

                        </div>

                    </div>
                </footer>
            </div>

        </>
    )
}
export default Authform