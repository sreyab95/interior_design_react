
import { useLocation } from "react-router";

function SearchDetails() {

    const location = useLocation();

    const item = location.state;

    if (!item) {
        return <h2 className="text-center mt-20">No Data Found</h2>;
    }

    return (

        <div className="min-h-screen bg-gray-100 py-20 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Title */}
                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-gray-800">
                        {item.title}
                    </h1>

                    <p className="mt-4 text-gray-600 text-lg">
                        {item.description}
                    </p>

                    <p className="mt-4 text-blue-600 text-lg">
                        {item.designer}
                    </p>
                    <p className="mt-4 text-yellow-600 text-lg">
                        {item.reviews}
                    </p>
                    <p className="mt-3 text-sm text-green-700 font-medium">
                        📍 {item.location}
                    </p>

                </div>

                {/* All Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {item.images.map((img, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl"
                        >

                            <img
                                src={img}
                                alt=""
                                className="w-full h-[400px] object-cover hover:scale-105 transition duration-300"
                            />

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default SearchDetails;