# 💰📊 Financial Dashboard

A sleek and interactive **Financial Dashboard** built with **Vite, React, TypeScript, TailwindCSS**, and **Lucide Icons**. This application provides a visual representation of financial data, allowing users to track balances, currency trends, and investments effortlessly.

---

## 🚀 Features

✅ **Balance Overview** – Easily monitor your income, expenses, and net balance.  
✅ **Currency Converter** – Convert currencies with real-time exchange rates.  
✅ **Investment Insights** – Get an overview of your investments and asset distribution.  
✅ **Currency Trends Chart** – Visualize currency fluctuations with interactive charts.  
✅ **Modern UI/UX** – Built with TailwindCSS for a clean and responsive design.

---

## 📂 Project Structure

```
📦 /financial-dashboard
├── 📜 .gitignore
├── 📜 eslint.config.js
├── 📜 index.html
├── 📜 LICENSE
├── 📜 package-lock.json
├── 📜 package.json
├── 📜 postcss.config.js
├── 📜 README.md
├── 🎨 tailwind.config.js
├── 🛠 tsconfig.app.json
├── 🛠 tsconfig.json
├── 🛠 tsconfig.node.json
├── ⚡ vite.config.ts
│
├── 📂 .github
│   └── 🔄 workflows
│       ├── 🤖 snorkell-auto-documentation.yml
│
└── 📂 src
    ├── 📜 App.tsx
    ├── 🎨 index.css
    ├── 🚀 main.tsx
    ├── 📜 vite-env.d.ts
    │
    ├── 🏗 components
    │   ├── 💰 BalanceOverview
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── 💱 CurrencyConverter
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── 📉 CurrencyTrendsChart
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── 📈 Investments
    │       ├── 📝 index.tsx
    │
    ├── 🔄 hooks
    │   ├── 🪝 useMockApi.ts
    │
    ├── 🏗 layout
    │   ├── 🏠 AppLayout.tsx
    │   ├── 🏷 Header.tsx
    │   ├── 📑 Sidebar.tsx
    │
    ├── 📄 pages
    │   ├── 🏦 Accounts
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── 📊 Dashboard
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── 📈 Investments
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── 🔑 Login
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── 🔔 Notifications
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── 👤 Profile
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── ⚙️ Settings
    │   │   ├── 📝 index.tsx
    │   │
    │   ├── 💳 Transactions
    │       ├── 📝 index.tsx
    │
    ├── 🔧 utils
    │   ├── 📏 formatters.ts
```

---

## 🛠 Setup & Installation

### 1️⃣ Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/financial-dashboard.git
cd financial-dashboard
```

### 3️⃣ Install Dependencies
```sh
yarn install  # or npm install
```

### 4️⃣ Start Development Server
```sh
yarn dev  # or npm run dev
```
The app will be available at `http://localhost:5173/`

### 5️⃣ Build for Production
```sh
yarn build  # or npm run build
```
This will generate optimized static assets in the `dist/` folder.

---

## 🏗 Next Steps

- [ ] Define component responsibilities (e.g., what data each widget should handle).
- [ ] Integrate mock API responses for testing before connecting real APIs.
- [ ] Implement currency trends and investment charts.
- [ ] Improve accessibility and add dark mode support.
- [ ] Deploy the application using **Vercel** or **Netlify**.

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

🚀 **Happy Coding!**

