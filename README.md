# 💸 ExpenseTracker — React Finance Dashboard

A multi-page personal finance tracker with category breakdowns, monthly summaries, dark/light theme switching, currency toggle, and localStorage persistence. Built as the second project in my 3-part React learning series — this is where hooks, Context API, and routing all come together.

**[Live Demo →](https://expense-tracker-react-black-delta.vercel.app/)** &nbsp;|&nbsp; **[GitHub →](https://github.com/Nikhilsatish/expense-tracker-react)**

> Project 2 of 3 in my React learning series. Covers R11–R20 — hooks, Context, custom hooks, and React Router.

---

## 📸 Preview

> <img width="1920" height="762" alt="image" src="https://github.com/user-attachments/assets/0d644801-fb43-4f7a-b6a0-5be0d53bb8e8" />


---

## ✨ Features

- ➕ Add and delete expenses with title, amount, category
- 📊 Dashboard with total spent and category-wise breakdown
- 🌙 Dark / Light theme toggle — powered by Context API
- 💱 Currency switcher (₹ / $) — also via Context
- 💾 Data persists across page refreshes via localStorage
- 🔍 Expense detail page with full breakdown
- 📁 Multi-page navigation — Dashboard, Expenses, Add, Settings
- 🧹 Clear all data with one click from Settings

---

## 🧠 React Concepts Practiced (R11–R20)

| Topic | What I implemented |
|---|---|
| **R11 — useState** | Expenses array, form fields (title, amount, category), showForm toggle |
| **R12 — useEffect** | Load from localStorage on mount (`[]` dep), save on every expenses change (`[expenses]` dep) |
| **R13 — Lifecycle (hooks-based)** | Mount log + cleanup return in `AddExpenseForm` — `useEffect(() => { ... }, [])` |
| **R14 — Lifting state up** | `AddExpenseForm` owns its own field state, lifts new expense up to App via `onAdd` prop |
| **R15 — Context API** | `ThemeContext` and `CurrencyContext` created with `createContext` + Provider pattern |
| **R16 — useContext hook** | `useTheme()` and `useCurrency()` consumed in Settings, navbar — zero prop drilling |
| **R17 — useRef hook** | Auto-focus the title input when `AddExpenseForm` mounts via `inputRef.current.focus()` |
| **R18 — useMemo + useCallback** | `useExpenseSummary` uses `useMemo` for total and category totals computation |
| **R19 — Custom hooks** | `useLocalStorage(key, initial)` and `useExpenseSummary(expenses)` — reusable and extracted |
| **R20 — React Router v6** | `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Navigate`, `useParams` for `/expense/:id` |

---

## 🗂️ Project Structure

```
src/
├── components/
│   └── AddExpenseForm.jsx      # Controlled form, useRef auto-focus, lifts state up
├── context/
│   ├── ThemeProvider.jsx       # createContext + ThemeProvider + useTheme hook
│   └── CurrencyProvider.jsx    # createContext + CurrencyProvider + useCurrency hook
├── hooks/
│   ├── useLocalStorage.jsx     # Generic persistence hook with lazy initializer
│   └── useExpenseSummary.jsx   # total, categoryTotals, count — all memoized
├── pages/
│   ├── Dashboard.jsx           # /dashboard — summary cards + category breakdown
│   ├── ExpenseList.jsx         # /expenses — list with delete + view link
│   ├── AddExpense.jsx          # /add — form page, redirects after submit
│   ├── Settings.jsx            # /settings — theme toggle, currency toggle, clear data
│   └── ExpenseDetail.jsx       # /expense/:id — detail view with useParams
├── App.jsx                     # BrowserRouter + Routes + state + handlers
└── main.jsx                    # ReactDOM.createRoot + ThemeProvider + CurrencyProvider
```

---

## 🔑 Key Learnings

**1. Feeling prop drilling before fixing it with Context**
I deliberately passed the `theme` value through 4 component levels before switching to Context. By the time it reached the deepest component, every intermediate layer had a prop it didn't need. That frustration made Context click immediately — you need to feel the problem to value the solution.

**2. The `useLocalStorage` custom hook**
The localStorage read/write logic was repeating across components. Extracting it to `useLocalStorage(key, initial)` collapsed `useState + 2 useEffects` into one line anywhere it's needed. The lazy initializer — passing a function to `useState(() => JSON.parse(...))` — is the key insight: it only reads localStorage once on mount.

**3. useEffect dependency array — the 3 patterns**
```js
useEffect(() => { ... })           // Runs after every render — rarely what you want
useEffect(() => { ... }, [])       // Runs once on mount — used for initial data load
useEffect(() => { ... }, [value])  // Runs when value changes — used for saving to storage
```
I intentionally removed the `[]` from the load effect to watch an infinite loop — the fastest way to understand why the array matters.

**4. Lifting state up**
`AddExpenseForm` owns `title`, `amount`, `category` in its own local state. When the form is submitted, it calls `onAdd(newExpense)` to send the data up to App. App is the only component that knows about the full expenses array. This separation keeps each component responsible for exactly what it needs.

**5. useMemo for derived calculations**
`categoryTotals` and `total` are calculated from expenses. Wrapping them in `useMemo` means they only recalculate when expenses changes — not on every render. For a list that could have hundreds of entries, this matters.

---

## 🚀 Run Locally

```bash
git clone https://github.com/Nikhilsatish/expense-tracker-react.git
cd expense-tracker-react
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Built With

- [React 18](https://react.dev)
- [React Router v6](https://reactrouter.com)
- [Vite](https://vitejs.dev)
- Vanilla CSS — no UI framework

---

## 📌 Part of My React Learning Series

| Project | Topics | Status |
|---|---|---|
| [TaskFlow](https://github.com/Nikhilsatish/react-taskflow) | R1–R10 · Fundamentals | ✅ Complete |
| **ExpenseTracker** (this one) | R11–R20 · Hooks + Context + Router | ✅ Complete |
| [DevBoard](https://github.com/Nikhilsatish/devboard) | R21–R30 · Redux + Advanced Patterns | ⏳ Upcoming |

---

## 👨‍💻 Author

**Nikhil** — Senior Software Engineer
[GitHub](https://github.com/Nikhilsatish) · [LinkedIn](https://linkedin.com/in/nikhil-sathish)
