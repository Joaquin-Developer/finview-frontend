# Finview Frontend

React + Vite frontend for **Finview**, a personal finance app: review AI-parsed bank statements, browse transactions and spending stats, plus an independent shopping cart/list module ("Compras").

For environment variables, project structure, and conventions, see [AGENTS.md](./AGENTS.md).

## Stack

- **React 18** + **Vite** + **React Router**
- **Tailwind CSS** (dark theme)
- **Zustand** for state, **Axios** for API calls
- **Recharts** for charts

## Quick start

```bash
cp .env.development .env
npm install
npm run dev
```

Requires the backend (`finview-backend`) running and reachable at the URL configured in `VITE_API_BASE_URL`.

## Main flows

- **Statement review**: upload a PDF (`/upload`) → AI parses it → review, edit, or delete each transaction before confirming (`/review/:id`).
- **Dashboard** (`/`): spend by month, by category, by bank, top merchants, and recent trends. The category/bank/merchant charts have an "Último mes / Todo" toggle.
- **Transactions** (`/transactions`): full list with filters, pagination, and delete.
- **Compras** (`/purchase`): separate shopping cart and list module, independent from expense tracking.

## Related repos

- Backend: [`finview-backend`](https://github.com/Joaquin-Developer/finview-backend)
