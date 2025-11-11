import React, { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Index() {
    const { borrows, auth } = usePage().props;
    const [toastMessage, setToastMessage] = useState("");
    const handleReturn = (id) => {
        router.put(`/borrows/${id}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h3 className="text-2xl font-bold "> Borrows</h3>}
        >
            {toastMessage && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
                    {toastMessage}
                </div>
            )}

            <div className="container mx-auto p-4">
                <div className="p-6 bg-white shadow-sm sm:rounded-lg">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-2xl font-bold">Borrow Records 2</h1>
                        <Link
                            href="/borrows/create"
                            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                        >
                            ➕ New Borrow
                        </Link>
                    </div>

                    <table className="min-w-full border">
                        <thead>
                            <tr>
                                <th className="border px-3 py-2">Member</th>
                                <th className="border px-3 py-2">Book</th>
                                <th className="border px-3 py-2">Borrowed</th>
                                <th className="border px-3 py-2">Returned</th>
                                <th className="border px-3 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrows.map((b) => (
                                <tr key={b.id}>
                                    <td className="border px-3 py-2">
                                        {b.member.name}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {b.book.title}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {b.borrowed_at}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {b.returned_at || "-"}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {!b.returned_at && (
                                            <button
                                                onClick={() =>
                                                    handleReturn(b.id)
                                                }
                                                className="text-green-600 hover:underline"
                                            >
                                                ✅ Return
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
