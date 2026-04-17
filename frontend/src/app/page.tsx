'use client';

import { useState, useEffect } from 'react';
import { ISnippet } from './types/snippet';
import { SnippetCard } from './components/SnippetCard';

export default function Home() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [snippets, setSnippets] = useState<ISnippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<null | string>(null);

  const [tags, setTags] = useState("");
  const [type, setType] = useState("note");

  const [searchQuery, setSearchQuery] = useState("");

  const fetchSnippets = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/snippets?search=${query}`);
      const data = await res.json();
      setSnippets(data);
    } catch {
      setError("Не вдалося завантажити дані");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSnippets(searchQuery);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !code) return alert('Заповніть усі поля!');

    const snippetData = {
      title: title,
      content: code,
      type: type,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ""),
    };

    try {
      const res = await fetch('http://localhost:3000/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snippetData),
      });

      if (res.ok) {
        setTitle('');
        setCode('');
        fetchSnippets();
      }
    } catch (err) {
      console.error("Помилка при збереженні", err);
      alert("Бекенд не відповідає. Перевір, чи запущений NestJS!");
    }
  };

  const deleteSnippet = async (_id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/snippets/${_id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchSnippets();
      }
    } catch (err) {
      console.error("Помилка при видаленні", err);
      alert("Бекенд не відповідає. Перевір, чи запущений NestJS!");
    }
  }

  console.log(snippets);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Snippet Vault</h1>

      <form onSubmit={handleSubmit} className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Назва сніпету (напр. Auth Hook)"
            className="p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Вставте ваш код тут..."
            className="p-2 border rounded h-40 font-mono text-sm text-black focus:ring-2 focus:ring-blue-500 outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 border rounded bg-white text-black min-w-[150px] cursor-pointer outline-none"
            >
              <option value="note">Note 📝</option>
              <option value="link">Link 🔗</option>
              <option value="command">Command 💻</option>
            </select>

            <input
              type="text"
              placeholder="Теги через кому (react, api, style)"
              className="p-2 border rounded flex-1 text-black outline-none"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            Зберегти у базу
          </button>
        </div>
      </form>

      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-bold text-black border-b pb-2">Збережені нотатки</h2>

        {loading && <p className="text-blue-500 animate-pulse">Завантаження даних...</p>}

        {!loading && snippets.length === 0 && (
          <div className="p-8 text-center border-2 border-dashed rounded-lg text-gray-400">
            Тут поки порожньо. Напишіть щось!
          </div>
        )}


        <div className="mb-6">
          <input
            type="text"
            placeholder="Пошук за назвою, кодом або тегами..."
            className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          {snippets.map((item: ISnippet) => (
            <SnippetCard
              key={item._id}
              item={item}
              onDelete={deleteSnippet}
            />
          ))}
        </div>

      </div>
    </main>
  );
}
