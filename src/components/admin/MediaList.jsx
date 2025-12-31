import { useState } from "react";
import MediaListItem from "./MediaListItem";

export default function MediaList({ media, onEdit, onDelete }) {
  const [showAll, setShowAll] = useState(false);
  const displayedMedia = showAll ? media : media.slice(0, 6);

  return (
    <div className="space-y-4">
      {displayedMedia.map((item) => (
        <MediaListItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {media.length > 6 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
}
