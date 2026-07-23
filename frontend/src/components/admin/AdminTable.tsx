'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  addLabel?: string;
  searchPlaceholder?: string;
  total?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  extraActions?: (row: T) => React.ReactNode;
}

export default function AdminTable<T extends { _id: string }>({
  title, data, columns, loading, onAdd, onEdit, onDelete,
  addLabel = 'Add New', searchPlaceholder = 'Search...', total = 0,
  page = 1, onPageChange, extraActions,
}: Props<T>) {
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = search
    ? data.filter(row => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()))
    : data;

  const totalPages = Math.ceil(total / 10);

  const confirmDelete = (row: T) => {
    if (deleteId === row._id) {
      onDelete?.(row);
      setDeleteId(null);
    } else {
      setDeleteId(row._id);
      setTimeout(() => setDeleteId(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-5 py-4 border-b border-[#EAEAEA]">
        <h2 className="font-bold text-[#111] text-lg">{title}</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9 pr-4 py-2 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] w-48" />
          </div>
          {onAdd && (
            <button onClick={onAdd} className="btn-primary text-sm py-2 px-4">
              <FiPlus size={14} /> {addLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              {columns.map(col => (
                <th key={col.key} className="px-5 py-3 text-left font-semibold">{col.label}</th>
              ))}
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA]">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {columns.map(col => (
                    <td key={col.key} className="px-5 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                  <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded animate-pulse w-16 ml-auto" /></td>
                </tr>
              ))
            ) : filtered.length > 0 ? (
              filtered.map((row) => (
                <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="px-5 py-3.5">
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      {extraActions?.(row)}
                      {onEdit && (
                        <button onClick={() => onEdit(row)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          <FiEdit2 size={14} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => confirmDelete(row)}
                          className={`p-1.5 rounded-lg transition-colors ${deleteId === row._id ? 'bg-red-500 text-white' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                          title={deleteId === row._id ? 'Click again to confirm' : 'Delete'}>
                          <FiTrash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-gray-400">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#EAEAEA]">
          <p className="text-xs text-gray-500">Showing {filtered.length} of {total} records</p>
          <div className="flex items-center gap-1">
            <button onClick={() => onPageChange?.(page - 1)} disabled={page === 1}
              className="p-1.5 rounded-lg border border-[#EAEAEA] disabled:opacity-40 hover:border-[#5FAF00] transition-colors">
              <FiChevronLeft size={14} />
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => (
              <button key={i} onClick={() => onPageChange?.(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${page === i + 1 ? 'bg-[#5FAF00] text-white' : 'border border-[#EAEAEA] hover:border-[#5FAF00]'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => onPageChange?.(page + 1)} disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-[#EAEAEA] disabled:opacity-40 hover:border-[#5FAF00] transition-colors">
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
