import { useMemo } from "react";

function ReviewTable({ rows, categories, onChangeRow, onDeleteRow }) {
  const categoryOptions = useMemo(
    () =>
      categories.map((c) => ({
        id: c.id,
        name: c.name
      })),
    [categories]
  );

  const handleFieldChange = (id, field, value) => {
    const row = rows.find((r) => r.id === id);
    if (!row) return;
    const updated = {
      ...row,
      [field]: value,
      category_source: field === "category_id" ? "user" : row.category_source || "user"
    };
    onChangeRow(updated);
  };

  return (
    <div className="overflow-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="min-w-full text-left text-xs text-slate-200">
        <thead className="bg-slate-800/60 text-[11px] uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-3 py-2">Fecha</th>
            <th className="px-3 py-2">Descripción</th>
            <th className="px-3 py-2">Comercio</th>
            <th className="px-3 py-2 text-right">Monto</th>
            <th className="px-3 py-2">Moneda</th>
            <th className="px-3 py-2">Categoría</th>
            <th className="px-3 py-2 text-center">Origen</th>
            <th className="px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-800/80 hover:bg-slate-800/40">
              <td className="px-3 py-2 align-top">
                <input
                  type="date"
                  value={row.date ?? ""}
                  onChange={(e) => handleFieldChange(row.id, "date", e.target.value)}
                  className="w-32 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
                />
              </td>
              <td className="px-3 py-2 align-top">
                <textarea
                  value={row.description ?? ""}
                  onChange={(e) => handleFieldChange(row.id, "description", e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
                />
              </td>
              <td className="px-3 py-2 align-top">
                <input
                  type="text"
                  value={row.merchant ?? ""}
                  onChange={(e) => handleFieldChange(row.id, "merchant", e.target.value)}
                  className="w-40 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
                />
              </td>
              <td className="px-3 py-2 align-top text-right">
                <input
                  type="number"
                  step="0.01"
                  value={row.amount ?? ""}
                  onChange={(e) => handleFieldChange(row.id, "amount", Number(e.target.value))}
                  className="w-24 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-right"
                />
              </td>
              <td className="px-3 py-2 align-top">
                <input
                  type="text"
                  value={row.currency ?? ""}
                  onChange={(e) => handleFieldChange(row.id, "currency", e.target.value)}
                  className="w-16 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
                />
              </td>
              <td className="px-3 py-2 align-top">
                <select
                  value={row.category_id ?? ""}
                  onChange={(e) => handleFieldChange(row.id, "category_id", e.target.value || null)}
                  className="w-40 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
                >
                  <option value="">Sin categoría</option>
                  {categoryOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {row.suggested_category && !row.category_id && (
                  <p className="mt-1 text-[10px] text-slate-500">
                    Sugerida:&nbsp;
                    <span className="font-medium text-emerald-400">{row.suggested_category}</span>
                  </p>
                )}
              </td>
              <td className="px-3 py-2 align-top text-center">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] ${
                    row.category_source === "user"
                      ? "bg-sky-500/10 text-sky-300 border border-sky-500/40"
                      : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                  }`}
                >
                  {row.category_source === "user" ? "Editado" : "IA"}
                </span>
              </td>
              <td className="px-3 py-2 align-top text-right">
                <button
                  type="button"
                  onClick={() => onDeleteRow(row.id)}
                  className="text-[11px] text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewTable;

