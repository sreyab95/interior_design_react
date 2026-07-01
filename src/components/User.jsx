import { useRef, useState, useEffect } from "react";
import '../App.css';
function User() {

    const [title, setTitle] = useState("");
    const [savedTitle, setSavedTitle] = useState("");

    const [images, setImages] = useState([]);

    // const [portfolio, setPortfolio] = useState([]);

    const loggedInUser = localStorage.getItem("loggedInUser");




    const [portfolio, setPortfolio] = useState(() => {
        if (!loggedInUser) return [];

        const savedPortfolio = localStorage.getItem(
            `portfolio_${loggedInUser}`
        );

        return savedPortfolio ? JSON.parse(savedPortfolio) : [];
    });

    const fileInputRef = useRef(null);

    // Upload only one image
    const handleFiles = (files) => {
        if (images.length > 0) {
            alert(
                "Please add the current image to portfolio before uploading another image."
            );
            return;

        }

        const file = files[0];

        if (!file) return;

        if (file.size > 500000) {
            alert("Please upload image below 500KB");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setImages([
                {
                    file,
                    preview: reader.result, // Base64 string
                },
            ]);
        };

        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const saveTitle = () => {
        if (!title.trim()) {
            alert("Please enter title");
            return;
        }

        setSavedTitle(title);
    };

    const addToPortfolio = () => {
        if (images.length === 0) {
            alert("Please upload an image.");
            return;
        }

        if (!savedTitle.trim()) {
            alert("Please add title.");
            return;
        }

        const newCard = {
            id: Date.now(),
            image: images[0].preview,
            title: savedTitle,
            isEditing: false,
        };

        setPortfolio((prev) => {
            if (prev.length >= 6) {
                alert(
                    "Portfolio limit reached.\nFirst card will be replaced with the new one."
                );

                return [...prev.slice(1), newCard];
            }

            return [...prev, newCard];
        });

        setImages([]);
        setTitle("");
        setSavedTitle("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const deleteCard = (id) => {
        setPortfolio(portfolio.filter((item) => item.id !== id));
    };

    const editCard = (id) => {
        setPortfolio(
            portfolio.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        isEditing: true,
                        editTitle: item.title,
                    }
                    : item
            )
        );
    };

    const saveCard = (id) => {
        setPortfolio(
            portfolio.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        title: item.editTitle,
                        isEditing: false,
                    }
                    : item
            )
        );
    };

    const changeEditTitle = (id, value) => {
        setPortfolio(
            portfolio.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        editTitle: value,
                    }
                    : item
            )
        );
    };


    // useEffect(() => {
    //     if (loggedInUser) {
    //         localStorage.setItem(
    //             `portfolio_${loggedInUser}`,
    //             JSON.stringify(portfolio)
    //         );
    //     }
    // }, [portfolio, loggedInUser]);

    useEffect(() => {
        if (!loggedInUser) return;

        try {
            localStorage.setItem(
                `portfolio_${loggedInUser}`,
                JSON.stringify(portfolio)
            );
        } catch (err) {
            alert(
                "Storage limit reached. Please delete some portfolio items."
            );

            console.error(err);
        }
    }, [portfolio, loggedInUser]);


    return (
        <>
            {/* Upload Section */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <div className="bg-white shadow-lg p-8">

                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Upload New Room Design
                    </h2>

                    {/* Title */}
                    <div className="mb-8">
                        <label className="block text-gray-700 font-medium mb-3">
                            Add Title
                        </label>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Enter room design title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="flex-1 border border-gray-300 px-4 py-3 focus:outline-none"
                            />

                            <button
                                type="button"
                                onClick={saveTitle}
                                className="bg-gray-900 text-white px-6 py-3 hover:bg-gray-700"
                            >
                                Add Title
                            </button>
                        </div>

                        {savedTitle && (
                            <p className="mt-2 text-green-600">
                                Title saved: {savedTitle}
                            </p>
                        )}
                    </div>

                    {/* Upload */}
                    <div className="mb-8">
                        <label className="block text-gray-700 font-medium mb-3">
                            Upload Images
                        </label>

                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="border-2 border-dashed border-gray-300 p-10 text-center"
                        >
                            <p className="text-gray-500 mb-4">
                                Drag and drop one image here
                            </p>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="bg-gray-900 text-white px-6 py-3 hover:bg-gray-700"
                            >
                                Upload Image
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    handleFiles(e.target.files)
                                }
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    {images.length > 0 && (
                        <div className="mb-8">
                            <img
                                src={images[0].preview}
                                alt="Preview"
                                className="w-52 h-40 object-cover border"
                            />
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={addToPortfolio}
                        className="w-full bg-black text-white py-4 font-semibold hover:bg-gray-800"
                    >
                        ADD TO PORTFOLIO
                    </button>
                </div>
            </section>

            {/* Live Portfolio */}
            <section className="max-w-6xl mx-auto px-6 pb-16">

                <h2 className="text-3xl font-bold mb-8">
                    Your Live Portfolio
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {portfolio.map((item) => (
                        <div
                            key={item.id}
                            className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)]
        transform
        hover:-translate-y-3
        transition-all
        duration-500
        animate-[fadeIn_0.6s_ease]
    "
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="
            w-full
            h-64
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
        "
                            />
                            {/* Gradient Overlay */}
                            {/* <div
                                className="
            absolute inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-transparent
        "
                            /> */}
                            <div className="p-6">

                                {!item.isEditing ? (
                                    <>
                                        <h3 className="
        text-2xl
        font-bold
        text-gray-800
        mb-5
        tracking-wide
    ">
                                            {item.title}
                                        </h3>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() =>
                                                    editCard(item.id)
                                                }
                                                className="
    flex-1
    bg-black
    text-white
    px-5
    py-2.5
   
    hover:bg-gray-800
    hover:scale-105
    transition-all
    duration-300
"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteCard(item.id)
                                                }
                                                className="
    flex-1
    border
    border-gray-300
    px-5
    py-2.5
   text-black
    hover:bg-red-50
    hover:border-red-400
    hover:text-red-600
    hover:scale-105
    transition-all
    duration-300
"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-2 text-gray-600">
                                            ↓ Edit
                                        </p>

                                        <input
                                            type="text"
                                            value={item.editTitle}
                                            onChange={(e) =>
                                                changeEditTitle(
                                                    item.id,
                                                    e.target.value
                                                )
                                            }
                                            className="
    w-full
    border
    border-gray-300
    rounded-xl
    px-4
    py-3
    mb-5
    focus:outline-none
    focus:ring-2
    focus:ring-gray-400
    transition-all
"
                                        />

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() =>
                                                    saveCard(item.id)
                                                }
                                                className="
    flex-1
    bg-black
    text-white
    px-5
    py-2.5
    
    hover:bg-gray-800
    hover:scale-105
    transition-all
    duration-300
"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteCard(item.id)
                                                }
                                                className="
    flex-1
    border
    border-gray-300
    px-5
    py-2.5
  text-black
    hover:bg-red-50
    hover:border-red-400
    hover:text-red-600
    hover:scale-105
    transition-all
    duration-300
"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </>
    );

}
export default User;