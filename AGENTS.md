# AGENTS.md - Finview Frontend

## Project Overview

React + Vite + Tailwind CSS frontend for Finview expense tracking app. Communicates with the backend API.

## Relationship with Backend

- **Backend URL**: `http://localhost:8000`
- **API Base**: `/api/v1` (configured in `.env` and `src/api/client.js`)
- **Backend Repo**: Separate repo (`finview-backend`)

## Commands

```bash
# Development
npm run dev

# With network exposure (for mobile testing)
npx vite --host

# Build for production
npm run build
```

## Project Structure

```
src/
├── App.jsx           # Main app with routes
├── main.jsx          # Entry point
├── api/              # API client functions
│   ├── client.js     # Axios instance
│   ├── purchase.js   # Purchase module API calls
│   └── ...
├── pages/            # Page components
│   ├── purchase/     # Purchase module pages
│   │   ├── PurchaseDashboardPage.jsx
│   │   ├── PurchaseCartPage.jsx
│   │   ├── PurchaseListsPage.jsx
│   │   ├── PurchaseListDetailPage.jsx
│   │   ├── PurchaseCategoriesPage.jsx
│   │   └── PurchaseStatsPage.jsx
│   └── ...
├── components/       # Reusable components
├── store/           # State management (if any)
└── utils/           # Utility functions
```

## Purchase Module (Módulo de Compras)

UI layer for the purchase module. Corresponds to backend's `purchase_` endpoints.

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/purchase` | Overview with quick actions |
| Cart | `/purchase/cart/:id` | Active/completed cart details |
| Cart History | `/purchase/history` | List of completed carts |
| Lists | `/purchase/lists` | All shopping lists |
| List Detail | `/purchase/lists/:id` | Items in a list |
| Categories | `/purchase/categories` | Manage categories |
| Stats | `/purchase/stats` | Statistics and charts |

### Business Logic (shared with Backend)

1. **Shopping Cart**: Only 1 active cart at a time per user
2. **Shopping Lists**: User can have N lists for pre-shopping planning
3. **Categories**: Independent from expense categories
4. **New Flow**: Click checkbox on list item → modal asks for price/quantity → adds to cart → marks as checked

## API Client

All API calls go through `src/api/client.js` using Axios. API functions are in separate files (e.g., `purchase.js`).

```javascript
// Example API call
import { getActiveCart } from "../api/purchase";
```

## Styling

- **Framework**: Tailwind CSS
- **Theme**: Dark mode (slate-950 background)
- **Colors**: 
  - Primary: Indigo (`indigo-500`)
  - Success: Emerald (`emerald-500/600`)
  - Error: Red (`red-400`)
  - Text: Slate (`slate-50`, `slate-400`)

## Adding New Pages

1. Create component in `src/pages/`
2. Add route in `App.jsx`:
   ```jsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in dashboard or other pages

## Adding API Endpoints

1. Add function in appropriate `src/api/*.js` file:
   ```javascript
   export const newEndpoint = async () => {
     const { data } = await api.get("/endpoint");
     return data;
   };
   ```

## State Management

- Local state with `useState` and `useEffect`
- React Router for navigation

## Charts

Using `recharts` library. See `PurchaseStatsPage.jsx` for examples.

## Notes

- All monetary values displayed in UYU (Uruguayan Pesos)
- Dates formatted in `es-UY` locale
- Forms use controlled components
- Error handling with `try/catch` and user alerts
