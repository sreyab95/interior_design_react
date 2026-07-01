import { FaHeart } from "react-icons/fa";

function Favorites() {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    return (

        <div className="min-h-screen bg-gray-100 py-12 px-6">

            <h1 className="text-4xl font-bold text-center mb-10">
                Favorite Designs
            </h1>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {favorites.map((img, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-2xl overflow-hidden shadow-md"
                    >

                        <img
                            src={img}
                            className="w-full h-72 object-cover"
                        />

                        <div className="p-4 flex items-center gap-2">

                            <FaHeart className="text-red-500" />

                            <span className="font-medium">
                                Saved Design
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Favorites;