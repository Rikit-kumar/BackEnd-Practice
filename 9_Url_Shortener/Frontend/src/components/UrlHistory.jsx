import React from "react";
import { History } from "lucide-react";
import UrlHistoryItem from "./UrlHistoryItem";


const UrlHistory = ({urls, onDelete}) => {
  return (
    <section id="history" className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" /> Your URL History
          </h2>
          <p className="text-xs text-slate-400">
            Manage and track all your shortened URLs.
          </p>
        </div>
        <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700/50">
          Total URLs: {urls.length}
        </span>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-900/40">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Original URL</th>
                <th className="py-3 px-4">Short Code</th>
                <th className="py-3 px-4">Created On</th>
                <th className="py-3 px-4">Clicks</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((item, idx) => (
                <UrlHistoryItem key={item._id} item={item} index={idx} onDelete={onDelete}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UrlHistory;
