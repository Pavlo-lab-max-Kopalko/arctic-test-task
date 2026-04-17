'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditSnippetPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("note");
  const [tags, setTags] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/snippets/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setType(data.type);
        setTags(data.tags.join(", "));
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      title,
      content,
      type,
      tags: tags.split(',').map(tag => tag.trim()).filter(t => t !== ""),
    };

    const res = await fetch(`http://localhost:3000/snippets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      alert("Оновлено успішно!");
      router.push(`/snippets/${id}`); // Повертаємося на сторінку деталі
    }
  };

  return (
    <main className="p-10 max-w-2xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-6">Редагування сніпета</h1>
      
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 bg-gray-50 p-6 rounded-xl border">
        <input 
          className="p-2 border rounded" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Назва"
        />
        
        <textarea 
          className="p-2 border rounded h-40 font-mono" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />

        <div className="flex gap-4">
          <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 border rounded bg-white">
            <option value="note">Note</option>
            <option value="link">Link</option>
            <option value="command">Command</option>
          </select>

          <input 
            className="p-2 border rounded flex-1" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="Теги через кому"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Зберегти зміни
          </button>
          <button type="button" onClick={() => router.back()} className="text-gray-500 px-6 py-2">
            Скасувати
          </button>
        </div>
      </form>
    </main>
  );
}
