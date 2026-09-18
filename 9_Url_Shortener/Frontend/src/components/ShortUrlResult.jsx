import React, { useState } from "react";
import { Check, Copy, Link2, ExternalLink } from "lucide-react";

const ShortUrlResult = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const fullShortUrl = `http://localhost:3000/${result.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-10 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-3">
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        URL shortened successfully!
      </div>

      <div className="flex items-center justify-between gap-3 bg-slate-950/80 border border-slate-800 rounded-xl p-3 mb-3">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          <Link2 className="w-4 h-4 shrink-0 text-slate-400" />
          <span>http://localhost:3000/7xKp2a</span>
        </div>
        <button
        onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition-colors shrink-0 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap">
        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">
          {result.originalUrl}
        </span>
      </div>
    </div>
  );
};

export default ShortUrlResult;
