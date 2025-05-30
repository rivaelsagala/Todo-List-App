import React, { useState } from 'react';
import '../index.css';

interface TodoInput {
    title: string;
    location: string;
    date: string;
}

const TodoForm: React.FC<{ onAdd: (todo: TodoInput) => void }> = ({ onAdd }) => {
    const [form, setForm] = useState<TodoInput>({
        title: '',
        location: '',
        date: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title) return;
        onAdd(form);
        setForm({ title: '', location: '', date: '' });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 bg-white shadow-2xl rounded-2xl px-8 py-6"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tambah Kegiatan</h2>

            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="title">
                    Nama Kegiatan
                </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Contoh: Belajar React"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="location">
                    Tempat
                </label>
                <input
                    type="text"
                    name="location"
                    placeholder="Contoh: Rumah"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="date">
                    Waktu
                </label>
                <input
                    type="datetime-local"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
                Simpan
            </button>
        </form>

    );
};

export default TodoForm;
