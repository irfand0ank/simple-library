import React, { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Index() {
    const { books, auth } = usePage().props;

    const [confirmingId, setConfirmingId] = useState(null);
    const [toastMessage, setToastMessage] = useState("");

    const handleDelete = (id) => {
        // Send delete request to the server
        router.delete(`/books/${id}`, {
            onSuccess: () => {
                setConfirmingId(null);
                setToastMessage("✅ Book deleted successfully!");
                setTimeout(() => setToastMessage(""), 3000); // auto hide in 3 seconds
            },
            onError: () => {
                setToastMessage("❌ Failed to delete book.");
                setTimeout(() => setToastMessage(""), 3000);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h3 className="text-2xl font-bold "> Books</h3>}
        >
            {toastMessage && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
                    {toastMessage}
                </div>
            )}
            <div className="container mx-auto p-4">
                <Head title="Books" />
                <h1 className="text-2xl font-bold mb-4 mt-2">📚 Books</h1>
                <Link href="/books/create" className="text-blue-600">
                    ➕ Add Book
                </Link>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Author</th>
                            <th className="py-2 px-4 border-b">Year</th>
                            <th className="py-2 px-4 border-b">
                                Available Copies
                            </th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td className="py-2 px-4 border-b">
                                    {book.title}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {book.author}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {book.year}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {book.available_copies}
                                </td>
                                <td className="border px-2 py-1">
                                    <Link
                                        href={`/books/${book.id}/edit`}
                                        className="text-yellow-600 mr-2"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <button
                                        onClick={() => setConfirmingId(book.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        🗑 Delete
                                    </button>
                                    {/* Confirmation Modal */}
                                    {confirmingId === book.id && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                            <div className="bg-white p-6 rounded shadow-md w-80">
                                                <h2 className="text-lg font-bold mb-2">
                                                    Confirm Delete
                                                </h2>
                                                <p className="text-gray-700 mb-4">
                                                    Are you sure you want to
                                                    delete{" "}
                                                    <span className="font-semibold">
                                                        {book.title}
                                                    </span>
                                                    ?
                                                </p>
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            setConfirmingId(
                                                                null
                                                            )
                                                        }
                                                        className="px-4 py-2 bg-gray-300 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                book.id
                                                            )
                                                        }
                                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
