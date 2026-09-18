import React, { useState } from "react";
import { Copy, Trash2, Eye, Check } from "lucide-react";

const UrlHistoryItem = ({ item, index, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const fullShortUrl = `http://localhost:3000/${item.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <tr className="border-b border-slate-800/60 hover:bg-slate-800/20 transition-colors text-sm">
      <td className="py-4 px-4 text-slate-500 font-mono">{index + 1}</td>
      <td className="py-4 px-4 max-w-xs truncate text-slate-300 font-mono text-xs">
        {item.originalUrl}
      </td>
      <td className="py-4 px-4 font-mono text-emerald-400 text-xs font-semibold">
        {item.shortCode}
      </td>
      <td className="py-4 px-4 text-slate-400 text-xs whitespace-nowrap">
        {new Date(item.createdAt).toLocaleDateString()}
      </td>
      <td className="py-4 px-4 text-slate-300 text-xs whitespace-nowrap">
        <span className="inline-flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          {item.click || 0}
        </span>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1 text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="p-1.5 bg-rose-500/10 text-rose-400 rounded"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UrlHistoryItem;
