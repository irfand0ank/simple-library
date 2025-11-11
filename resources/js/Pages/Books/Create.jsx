import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Create() {
    const [values, setValues] = useState({
        title: "",
        author: "",
        year: "",
        available_copies: "",
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form values to the server or perform desired actions
        router.post("/books", values);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">➕ Add New Book</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={values.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block mb-1">
                        Author
                    </label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={values.author}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="year" className="block mb-1">
                        Year
                    </label>
                    <input
                        type="number"
                        name="year"
                        id="year"
                        value={values.year}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="available_copies" className="block mb-1">
                        Available Copies
                    </label>
                    <input
                        type="number"
                        name="available_copies"
                        id="available_copies"
                        value={values.available_copies}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Book
                </button>
            </form>
        </div>
    );
}
