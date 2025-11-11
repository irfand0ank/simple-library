import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    const { books, members, auth } = usePage().props;

    const defaultDue = new Date();
    defaultDue.setDate(defaultDue.getDate() + 7);
    const [values, setValues] = useState({
        book_id: "",
        member_id: "",
        due_date: defaultDue.toISOString().split("T")[0],
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/borrows", values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl">➕ New Borrow</h2>}
        >
            <div className="p-6 bg-white shadow-sm sm:rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Member</label>
                        <select
                            name="member_id"
                            value={values.member_id}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        >
                            <option value="">Select Member</option>
                            {members.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Book</label>
                        <select
                            name="book_id"
                            value={values.book_id}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        >
                            <option value="">Select Book</option>
                            {books.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Due Date</label>
                        <input
                            type="date"
                            name="due_date"
                            value={values.due_date}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
