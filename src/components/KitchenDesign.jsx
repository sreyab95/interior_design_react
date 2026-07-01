function DesignShowcase() {
    const data = [
        {
            title: "Home / Room Design",
            description:
                "Beautiful and modern home interiors crafted with elegance and comfort.",
            designer: "Aarav Sharma",
            role: "Interior Designer",
            image:
                "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Office Design",
            description:
                "Smart office spaces designed for productivity and modern work culture.",
            designer: "Priya Mehta",
            role: "Workspace Specialist",
            image:
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Furniture Design",
            description:
                "Custom furniture crafted to enhance both functionality and aesthetics.",
            designer: "Rahul Verma",
            role: "Furniture Designer",
            image:
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",

        },
    ];

    return (
        <div className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto space-y-16">

                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                            }`}
                    >

                        {/* LEFT / RIGHT TEXT */}
                        <div className={`${index % 2 !== 0 ? "order-2 md:order-1" : ""}`}>
                            <h2 className="text-3xl font-bold text-gray-800">
                                {item.title}
                            </h2>
                            <p className="mt-4 text-gray-600">{item.description}</p>
                        </div>

                        {/* IMAGE WITH OVERLAY */}
                        <div className="relative group">
                            <img
                                src={item.image}
                                className="w-full h-80 object-cover rounded-2xl shadow-md"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                                <h3 className="text-white text-lg font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-200">
                                    Designed by {item.designer}
                                </p>
                                <p className="text-xs text-gray-300">{item.role}</p>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default DesignShowcase;