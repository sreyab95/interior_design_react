import { useLocation } from "react-router";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
function DesignPage() {

    const { darkMode } = useTheme();


    // const addToFavorites = (img) => {

    //     const existing =
    //         JSON.parse(localStorage.getItem("favorites")) || [];

    //     const updated = [...existing, img];

    //     localStorage.setItem(
    //         "favorites",
    //         JSON.stringify(updated)
    //     );
    // };

    const { state } = useLocation();

    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );

    const toggleFavorite = (img) => {

        let updatedFavorites;

        // Check if image already exists
        if (favorites.includes(img)) {

            // REMOVE image
            updatedFavorites = favorites.filter(
                (item) => item !== img
            );

        } else {

            // ADD image
            updatedFavorites = [...favorites, img];
        }

        setFavorites(updatedFavorites);

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        );
    };
    const [selectedImage, setSelectedImage] = useState(null);
    return (

        <div
            className={`p-6 ${darkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-black"
                }`}
        >
            <div className="min-h-screen bg-gray-100 py-12 px-6">

                <div className="max-w-7xl mx-auto mt-7">

                    <h1 className="text-4xl font-bold mb-10 z">
                        {state.titleexp}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {state.imagesexp.map((img, index) => (

                            <div
                                key={index}
                                className="relative rounded-2xl overflow-hidden shadow-lg bg-white group"
                            >

                                <img
                                    src={img}
                                    alt=""
                                    onClick={() => setSelectedImage(img)}
                                    className="w-full h-72 object-cover hover:scale-105 transition duration-300 cursor-pointer"
                                />

                                {/* Hover Text */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                                    <span className="bg-white/90 text-gray-600 px-4 py-2 rounded-lg text-sm shadow-md">
                                        Click the image to expand
                                    </span>
                                </div>

                                {/* Favorite Icon */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(img);
                                    }}
                                    className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg"
                                >
                                    <FaHeart
                                        className={`text-2xl transition ${favorites.includes(img)
                                            ? "text-red-500"
                                            : "text-gray-300"
                                            }`}
                                    />
                                </button>

                                {/* Shopping Bag Icon */}
                                <button
                                    className="absolute bottom-4 right-4 bg-transparent p-3 rounded-full shadow-lg"
                                >
                                    <ShoppingBagIcon
                                        aria-hidden="true"
                                        className="size-6 shrink-0 text-white-400 group-hover:text-gray-500"
                                    /></button>


                                {/* Favorite Icon */}
                                {/* <button
                                onClick={() => toggleFavorite(img)}
                                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg"
                            > */}
                            </div>

                        ))}

                    </div>

                </div>
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


    );
}
export default DesignPage