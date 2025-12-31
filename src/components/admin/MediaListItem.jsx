import { FaEdit, FaTrash } from "react-icons/fa";

export default function MediaListItem({ item, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white border rounded-lg">
      <div className="flex items-center gap-4">
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title}
            className="object-cover w-20 h-16 rounded"
          />
        )}
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-500">
            {item.type} · {item.status}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => onEdit(item)} className="text-blue-600">
          <FaEdit />
        </button>
        <button onClick={() => onDelete(item.id)} className="text-red-600">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
