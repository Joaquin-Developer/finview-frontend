import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useAuthStore } from "../store/authStore";
import {
  getSummary,
  getByMonth,
  getByCategory,
  getByBank,
  getTopMerchants,
  getTrends,
} from "../api/stats";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#0ea5e9",
  "#3b82f6",
];

function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [summary, setSummary] = useState(null);
  const [byMonth, setByMonth] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [byBank, setByBank] = useState([]);
  const [topMerchants, setTopMerchants] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sum, month, cat, bank, merch, trend] = await Promise.all([
          getSummary(),
          getByMonth(6),
          getByCategory(),
          getByBank(),
          getTopMerchants(5),
          getTrends(30),
        ]);
        setSummary(sum);
        setByMonth(month.reverse());
        setByCategory(cat);
        setByBank(bank);
        setTopMerchants(merch);
        setTrends(trend);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: "UYU",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-slate-400">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <Link to="/" className="text-lg font-semibold hover:text-indigo-400">Finview</Link>
        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/transactions"
            className="text-slate-400 hover:text-white"
          >
            Transacciones
          </Link>
          <Link
            to="/upload"
            className="rounded-md bg-indigo-500 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-400"
          >
            Subir estado
          </Link>
          <span className="text-slate-400">
            {user ? `${user.username}` : "Sesión iniciada"}
          </span>
          <button
            onClick={logout}
            className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="px-6 py-8">
        <h2 className="mb-6 text-2xl font-semibold">Dashboard</h2>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm text-slate-400">Total transacciones</p>
            <p className="mt-1 text-3xl font-bold">{summary?.total_transactions || 0}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm text-slate-400">Este mes</p>
            <p className="mt-1 text-3xl font-bold text-red-400">
              {formatCurrency(summary?.total_spent_current_month || 0)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm text-slate-400">Mes anterior</p>
            <p className="mt-1 text-3xl font-bold text-amber-400">
              {formatCurrency(summary?.total_spent_previous_month || 0)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm text-slate-400">Estados de cuenta</p>
            <p className="mt-1 text-3xl font-bold">{summary?.statements_count || 0}</p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-4 text-lg font-medium">Gastos por mes</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    formatter={(value) => [formatCurrency(value), "Total"]}
                  />
                  <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Gastos por categoría</h3>
              <Link
                to="/categories"
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Editar categorías
              </Link>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={byCategory}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {byCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    formatter={(value) => [formatCurrency(value), "Total"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-4 text-lg font-medium">Gastos por banco</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byBank} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <YAxis dataKey="bank" type="category" stroke="#94a3b8" fontSize={12} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    formatter={(value) => [formatCurrency(value), "Total"]}
                  />
                  <Bar dataKey="total" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="mb-4 text-lg font-medium">Top comerciantes</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topMerchants}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="merchant" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    formatter={(value) => [formatCurrency(value), "Total"]}
                  />
                  <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="mb-4 text-lg font-medium">Tendencias últimos 30 días</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                  formatter={(value) => [formatCurrency(value), "Total"]}
                />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
