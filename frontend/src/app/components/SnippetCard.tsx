import Link from 'next/link';
import { ISnippet } from '../types/snippet'; // імпортуй свій інтерфейс

interface Props {
  item: ISnippet;
  onDelete: (id: string) => void;
}

export const SnippetCard = ({ item, onDelete }: Props) => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <Link href={`/snippets/${item._id}`}>
            <h3 className="font-bold text-lg text-blue-600 hover:underline cursor-pointer">
              {item.title}
            </h3>
          </Link>

          <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${item.type === 'command' ? 'bg-orange-100 text-orange-600' :
            item.type === 'link' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
            }`}>
            {item.type}
          </span>
        </div>

        <button
          onClick={() => onDelete(item._id)}
          className="text-red-400 hover:text-red-600 text-sm"
        >
          Видалити
        </button>
      </div>

      <pre className="mt-2 p-3 bg-gray-50 rounded text-sm font-mono text-gray-700 overflow-x-auto border border-gray-100">
        {item.content}
      </pre>

      {item.tags && item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs border border-gray-200">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-50 text-[10px] text-gray-400 flex justify-between">
        <span>Створено: {new Date(item.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
};
