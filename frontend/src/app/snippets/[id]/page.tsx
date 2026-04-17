'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ISnippet } from '@/app/types/snippet';
import Link from 'next/link';

export default function SnippetDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [snippet, setSnippet] = useState<ISnippet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/snippets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSnippet(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-black">Завантаження...</div>;
  if (!snippet) return <div className="p-10 text-black">Сніпет не знайдено</div>;

  return (
    <main className="p-10 max-w-4xl mx-auto text-black">
      <Link href="/" className="text-blue-500 hover:underline">
        ← Назад до списку
      </Link>

      <div className="mt-6 bg-white p-8 rounded-xl border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{snippet.title}</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold uppercase">
            {snippet.type}
          </span>
        </div>

        <div className="flex gap-2 mb-6">
          {snippet.tags?.map((tag: string) => (
            <span key={tag} className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
              #{tag}
            </span>
          ))}
        </div>

        <div className="relative">
          <h2 className="text-sm font-semibold text-gray-400 mb-2 uppercase">Вміст / Код:</h2>
          <pre className="p-6 bg-gray-900 text-green-400 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed">
            {snippet.content}
          </pre>
        </div>

        <div className="mt-8 flex gap-4 border-t pt-6">
          <button 
            onClick={() => router.push(`/snippets/${id}/edit`)}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Редагувати
          </button>
          
          <div className="text-xs text-gray-400 self-center">
            Востаннє оновлено: {new Date(snippet.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </main>
  );
}
