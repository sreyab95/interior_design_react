import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";


function Search({ closeSearch }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // Debounce effect: wait 500ms after typing stops
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler); // cleanup if user keeps typing
        };
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            console.log("Searching for:", debouncedQuery);
            // Call your API here
        }
    }, [debouncedQuery]);


    const searchData = [
        {
            id: 1,
            title: "Modern Bedroom Design",
            category: "bedroom",
            description: "Luxury modern bedroom with wooden texture.",

            designer: "Emma Johnson",
            reviews: "4.7 ★ (210 Reviews)",
            location: "Delhi, India",



            images: [
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
            ]
        },

        {
            id: 2,
            title: "Living Room Interior",
            category: "room",
            description: "Elegant living room interior design ideas.",

            designer: "Emma Johnson",
            reviews: "4.7 ★ (210 Reviews)",
            location: "Delhi, India",

            images: [
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
            ]
        },

        {
            id: 3,
            title: "Office Workspace",
            category: "office",
            description: "Creative office workspace setup.",

            designer: "Emma Johnson",
            reviews: "4.7 ★ (210 Reviews)",
            location: "Delhi, India",

            images: [
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=1200&auto=format&fit=crop"
            ]
        }
    ];

    const filteredResults = searchData.filter((item) =>
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="w-full bg-white shadow-lg border-t border-gray-200 absolute top-full left-0 z-40">

            {/* Search Bar */}
            <div className="max-w-5xl mx-auto p-5">

                <div className="relative">

                    <input
                        type="text"
                        placeholder="Search room, bedroom, office..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />

                </div>

                {/* Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                    {query && filteredResults.length > 0 ? (

                        filteredResults.map((item) => (

                            <div
                                key={item.id}
                                // onClick={() =>
                                //     navigate("/searchdetails", {
                                //         state: item,
                                //     })
                                // }
                                onClick={() => {
                                    navigate("/searchdetails", {
                                        state: item,
                                    });

                                    // 👇 force close search
                                    setQuery("");   // clear search
                                }}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer group"
                            >

                                {/* Image Section */}
                                <div className="relative overflow-hidden">

                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                                    />

                                    {/* Hover Content */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">

                                        <h3 className="text-white text-lg font-semibold">
                                            {item.designer}
                                        </h3>

                                        <p className="text-gray-200 text-sm mt-1">
                                            {item.reviews}
                                        </p>

                                    </div>

                                </div>

                                {/* Bottom Content */}
                                <div className="p-4">

                                    <h2 className="text-lg font-bold text-gray-800">
                                        {item.title}
                                    </h2>

                                    <p className="text-gray-600 mt-2 text-sm">
                                        {item.description}
                                    </p>

                                    {/* Location */}
                                    <p className="mt-3 text-sm text-green-700 font-medium">
                                        📍 {item.location}
                                    </p>

                                </div>

                            </div>

                        ))

                    ) : query ? (

                        <p className="text-gray-500 mt-4">
                            No results found
                        </p>

                    ) : null}

                </div>

            </div>

        </div>
    );
}

export default Search;