// Header.jsx
import { Link } from "react-router";
import { useState, useEffect } from 'react'
import '../App.css';
import { IoHomeOutline } from "react-icons/io5";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import appLogo from "../assets/ILogo.png";
import { MdDashboard } from "react-icons/md";
import Search from "./Search"
import { useLocation } from "react-router";

import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

import { useNavigate } from "react-router";

import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

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



function Header() {

    const { darkMode, toggleTheme } = useTheme();

    const [loggedInUser, setLoggedInUser] = useState(
        localStorage.getItem("loggedInUser") || ""
    );

    const displayName = loggedInUser
        ? loggedInUser.split("@")[0]
        : "";


    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");

        setLoggedInUser("");

        // setShowMenu(false);

        navigate("/authform");
    };

    const [open, setOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false);

    const location = useLocation();

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    useEffect(() => {
        const updateUser = () => {
            setLoggedInUser(
                localStorage.getItem("loggedInUser") || ""
            );
        };

        window.addEventListener("userLogin", updateUser);

        return () => {
            window.removeEventListener("userLogin", updateUser);
        };
    }, []);


    return (
        <>
            {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                            Get free delivery on orders over $100
                        </p> */}

            <div className="bg-white">

                <header className="absolute top-0 left-0 w-full z-50">


                    <nav className="mx-auto max-w-[1200px] lg:max-w-[1600px] xl:max-w-[1800px] px-7 bg-transparent">
                        <div className="border-b border-gray-200">
                            <div className="flex h-14 items-center">
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon aria-hidden="true" className="size-6" />
                                </button>

                                {/* Logo */}


                                <div className="ml-4 flex lg:ml-0">
                                    <Link to="/" className="flex items-center gap-2">

                                        <img
                                            src={appLogo}
                                            alt="App Logo"
                                            className="h-8 w-auto"
                                        />

                                        <div >
                                            Interior Design Cafe
                                        </div>

                                    </Link>
                                </div>

                                {/* Flyout menus */}
                                <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        {navigation.categories.map((category) => (
                                            <Popover key={category.name} className="relative">
                                                <div className="flex">
                                                    <PopoverButton className="pt-5 outline-none focus:outline-none ring-0 focus:ring-0 group relative flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                                        {category.name}
                                                        <span
                                                            aria-hidden="true"
                                                            className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-green-600"
                                                        />
                                                    </PopoverButton>
                                                </div>

                                                <PopoverPanel
                                                    transition
                                                    className="absolute left-0 top-full z-20 mt-2 w-64"
                                                >
                                                    <div className="overflow-hidden rounded-2xl bg-white text-sm shadow-lg ring-1 ring-gray-900/5">

                                                        <div className="p-4">
                                                            {/* {category.sections.map((section) => (
                                                                        <div
                                                                            key={section.id}
                                                                            className="group relative flex rounded-lg p-3 hover:bg-gray-50"
                                                                        >
                                                                            <a href="#" className="font-semibold text-gray-900">
                                                                                {section.name}
                                                                                <span className="absolute inset-0" />
                                                                            </a>
                                                                        </div>
                                                                    ))} */}

                                                            {category.sections.map((section) => (
                                                                <div
                                                                    key={section.id}
                                                                    className="group relative flex rounded-lg p-3 hover:bg-gray-50"
                                                                >
                                                                    <Link to={section.path} className="font-semibold text-gray-900 w-full">
                                                                        {section.name}
                                                                        <span className="absolute inset-0" />
                                                                    </Link>
                                                                </div>
                                                            ))}

                                                        </div>

                                                    </div>
                                                </PopoverPanel>
                                            </Popover>
                                        ))}
                                        {/* {navigation.pages.map((page) => (
                                                <a
                                                    key={page.name}
                                                    href={page.href}
                                                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                                >
                                                    {page.name}
                                                </a>
                                            ))} */}
                                    </div>
                                </PopoverGroup>

                                <div className="ml-auto flex items-center">
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <span href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            <Link to="/">
                                                <IoHomeOutline size={14} color="green" />
                                            </Link>
                                        </span>
                                        <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                                        <span href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            <Link to="/authform">
                                                <MdDashboard size={14} color="green" />
                                            </Link>
                                        </span>
                                        <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                                        <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            About Us
                                        </a>
                                        <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Help
                                        </a>
                                    </div>

                                    <div className="hidden lg:ml-8 lg:flex">
                                        <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                            {/* <img
                                                        alt=""
                                                        src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                                                        className="block h-auto w-5 shrink-0"
                                                    />
                                                    <span className="ml-3 block text-sm font-medium">CAD</span> */}
                                            <span className="sr-only">, change currency</span>
                                        </a>
                                    </div>

                                    {/* Search */}
                                    <div className="flex lg:ml-6 relative">

                                        <button
                                            onClick={() => setShowSearch(!showSearch)}
                                            className="p-2 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">Search</span>

                                            <MagnifyingGlassIcon
                                                aria-hidden="true"
                                                className="size-6"
                                            />
                                        </button>

                                        {/* Search Component */}
                                        {showSearch && <Search closeSearch={() => setShowSearch(false)} />}
                                        {/* {showSearch && <Search />} */}

                                    </div>

                                    {/* Cart */}
                                    {/* <div className="ml-4 flow-root lg:ml-6">
                                        <a href="#" className="group -m-2 flex items-center p-2">
                                            <ShoppingBagIcon
                                                aria-hidden="true"
                                                className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </a>
                                    </div> */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <Link to="/cart" className="group -m-2 flex items-center p-2">
                                            <ShoppingBagIcon
                                                aria-hidden="true"
                                                className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-5 ml-6">

                                        <Link
                                            to="/favorites"
                                            className="group -m-2 flex items-center p-2 relative"
                                        >

                                            <FaHeart className="text-red-500 text-2xl" />

                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                                {favorites.length}
                                            </span>

                                        </Link>

                                    </div>


                                    {/* {loggedInUser && (
                                        <Link
                                            to="/user" className="flex items-center gap-5 ml-6">

                                            <div className="group -m-2 flex items-center p-2 relative">

                                                <FaUser className="text-purple-500 text-2xl m-2" />

                                                <h2>{displayName}</h2>

                                            </div>

                                        </Link>
                                    )} */}

                                    {loggedInUser && (
                                        <div className="relative ml-6">

                                            <button
                                                onClick={() => setShowMenu(!showMenu)}
                                                className="flex items-center gap-3 cursor-pointer"
                                            >
                                                <FaUser className="text-purple-500 text-2xl" />

                                                <h2>{displayName}</h2>
                                            </button>

                                            {showMenu && (
                                                <div className="absolute top-12 right-0 w-40 bg-white shadow-lg border rounded-md z-50">

                                                    <button
                                                        onClick={() => {
                                                            setShowMenu(false);
                                                            navigate("/user");
                                                        }}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        My Account
                                                    </button>

                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                                    >
                                                        Logout
                                                    </button>

                                                </div>
                                            )}

                                        </div>
                                    )}

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <div className="group -m-2 flex items-center p-2">
                                            <button
                                                onClick={toggleTheme}
                                                className="text-2xl"
                                            >
                                                {darkMode ? <FaSun /> : <FaMoon />}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </nav>
                    {showSearch && <Search />}
                </header>
            </div>
        </>

    );
}

export default Header;