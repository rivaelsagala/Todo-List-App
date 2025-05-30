import React, { useState } from 'react';

interface Todo {
    id?: number;
    title: string;
    location: string;
    date: string;
}

interface Props {
    todos: Todo[];
    onDelete: (id: number) => void;
    onUpdate: (id: number, data: Omit<Todo, 'id'>) => void;
}

const TodoList: React.FC<Props> = ({ todos, onDelete, onUpdate }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        date: '',
    });

    const handleEditClick = (todo: Todo) => {
        setEditingId(todo.id ?? null);
        setFormData({
            title: todo.title,
            location: todo.location,
            date: todo.date.slice(0, 16),
        });
    };

    const handleUpdate = () => {
        if (editingId !== null) {
            onUpdate(editingId, formData);
            setEditingId(null);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Daftar Kegiatan</h2>

            {todos.length === 0 ? (
                <p className="text-gray-500 italic">Belum ada kegiatan.</p>
            ) : (
                <ul className="space-y-4">
                    {todos.map((todo) => (
                        <li key={todo.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
                            {editingId === todo.id ? (
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Nama Kegiatan"
                                    />
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="Tempat"
                                    />
                                    <input
                                        type="datetime-local"
                                        className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                    <div className="flex gap-3 pt-1">
                                        <button
                                            onClick={handleUpdate}
                                            className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                        >
                                            Simpan
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="px-4 py-1.5 text-sm bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
                                        <p className="text-sm text-gray-600">📍 {todo.location}</p>
                                        <p className="text-sm text-gray-600">🕒 {new Date(todo.date).toLocaleString()}</p>
                                    </div>
                                    <div className="space-x-2 pt-1">
                                        <button
                                            onClick={() => handleEditClick(todo)}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => todo.id && onDelete(todo.id)}
                                            className="text-sm text-red-500 hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
