# Financial Dashboard

A modern, responsive financial dashboard built with React, TypeScript, and a custom UI Kit.

## 🚀 Features

- **Modern UI Kit**: Custom-built components with consistent design
- **Dark Mode**: Full dark mode support with smooth transitions
- **Responsive Design**: Mobile-first approach with responsive layouts
- **TypeScript**: Full type safety and excellent developer experience
- **Accessibility**: WCAG 2.1 AA compliant components
- **Performance**: Optimized bundle size and runtime performance

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Build Tool**: Vite 7.0.0
- **Icons**: Lucide React
- **UI Components**: Custom UI Kit built on Tailwind CSS

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/guibranco/financial-dashboard.git
cd financial-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎨 UI Kit

This project includes a comprehensive UI Kit with the following components:

### Core Components

- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Card**: Flexible container with header, content, and footer
- **Input**: Form inputs with labels, errors, and icons
- **Badge**: Status indicators and labels
- **Avatar**: User profile pictures with fallback support

### Advanced Components

- **Dropdown**: Contextual menus with keyboard navigation
- **Modal**: Dialog overlays with backdrop and keyboard support
- **Tabs**: Navigation between related content
- **Alert**: Important messages and notifications
- **Table**: Responsive data tables
- **Tooltip**: Contextual help and information

### Design System

- **Colors**: Primary blue palette with 11 shades
- **Typography**: Inter font family with consistent scale
- **Spacing**: 4px base unit system
- **Animations**: Smooth transitions and micro-interactions

## 📚 Documentation

- [UI Kit Documentation](docs/UI_KIT.md) - Comprehensive component guide
- [Implementation Plan](docs/UI_IMPLEMENTATION_PLAN.md) - Development roadmap and decisions

## 🌙 Dark Mode

The application supports system-wide dark mode with:

- Automatic detection of system preference
- Manual toggle capability
- Smooth transitions between themes
- Consistent styling across all components

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Feature-specific components
├── layout/             # Layout components (Header, Sidebar, etc.)
├── pages/              # Page components
├── ui/                 # UI Kit components
│   ├── components/     # Reusable UI components
│   └── utils/          # UI utilities
├── hooks/              # Custom React hooks
├── context/            # React contexts
└── utils/              # General utilities
```

## 🎯 Features Overview

### Dashboard

- Balance overview with account details
- Currency converter with real-time rates
- Investment portfolio tracking
- Currency trends visualization

### Navigation

- Responsive sidebar navigation
- User profile dropdown
- Notification center
- Search functionality

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Accessible keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icon set
- [React](https://reactjs.org/) for the component-based architecture
- [Vite](https://vitejs.dev/) for the fast build tool
