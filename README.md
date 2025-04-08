# Restaurant Point of Sale (POS) System

A modern, sleek, and responsive Point of Sale system for restaurants built with Next.js and Shadcn UI.

## Features

- **Menu Management**: Display and manage menu items with categories
- **Order Processing**: Create, modify, and track orders
- **Customer Management**: Manage customer information and orders
- **Table Management**: Track table status and assignments
- **Payment Processing**: Handle different payment methods
- **Offline Support**: Continue operations when internet connection is unavailable

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **UI Components**: Shadcn UI
- **Styling**: CSS Modules with custom styling
- **State Management**: React Hooks
- **API Integration**: Next.js API Routes as a proxy to backend services

## Project Structure

\`\`\`
restaurant-pos/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (proxy to backend)
│   │   ├── auth/           # Authentication endpoints
│   │   ├── categories/     # Category management endpoints
│   │   ├── menu-items/     # Menu item management endpoints
│   │   ├── orders/         # Order management endpoints
│   │   ├── tables/         # Table management endpoints
│   │   └── users/          # User management endpoints
│   ├── pos/                # POS routes
│   │   ├── customers/      # Customer management
│   │   ├── tables/         # Table management
│   │   ├── orders/         # Order management
│   │   ├── offline/        # Offline orders
│   │   ├── payment/        # Payment processing
│   │   └── layout.tsx      # POS layout
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # UI components from Shadcn
│   ├── menu-page.tsx       # Menu page component
│   ├── customers-page.tsx  # Customers page component
│   ├── tables-page.tsx     # Tables page component
│   ├── orders-page.tsx     # Orders page component
│   ├── offline-orders-page.tsx # Offline orders page component
│   ├── payment-page.tsx    # Payment page component
│   ├── order-sidebar.tsx   # Order sidebar component
│   ├── main-nav.tsx        # Main navigation component
│   └── user-nav.tsx        # User navigation component
├── lib/                    # Utility functions and types
│   ├── mock-data.ts        # Mock data for development
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
└── README.md               # Project documentation
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/restaurant-pos.git
   cd restaurant-pos
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Routes as Proxy

This project uses Next.js API routes as a proxy to the backend services. This approach provides several benefits:

1. **Security**: API keys and sensitive information are kept on the server
2. **CORS**: Avoids cross-origin resource sharing issues
3. **Caching**: Enables server-side caching of API responses
4. **Transformation**: Allows for data transformation before sending to the client
5. **Unified API**: Provides a consistent API interface even if the backend changes

The API routes are located in the `app/api` directory and follow the Next.js App Router conventions.

## Design Principles

This project follows these design principles:

- **DRY (Don't Repeat Yourself)**: Code reuse through components and utility functions
- **SOLID Principles**:
  - Single Responsibility: Each component has a single responsibility
  - Open/Closed: Components are open for extension but closed for modification
  - Liskov Substitution: Components can be replaced with their subtypes
  - Interface Segregation: Small, specific interfaces
  - Dependency Inversion: High-level modules don't depend on low-level modules
- **Component-Based Architecture**: UI built from reusable components
- **Responsive Design**: Works on all device sizes
- **Progressive Enhancement**: Core functionality works without JavaScript

## Customization

### Modifying the Theme

The theme is defined in `app/globals.css`. You can modify the color variables to match your brand:

\`\`\`css
:root {
  --primary: 24 95% 53%;
  --primary-foreground: 210 40% 98%;
  /* Other color variables */
}
\`\`\`

### Adding New Components

1. Create a new component in the `components` directory
2. Import and use it in your pages

### Extending API Functionality

1. Add new types in `lib/types.ts`
2. Create a new API route in the `app/api` directory
3. Use the new API route in your components

## Backend Integration

To connect to a real backend API:

1. Set the `BACKEND_API_URL` environment variable to your backend API URL
2. Uncomment the fetch calls in the API routes
3. Update the API routes to match your backend API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
