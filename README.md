# CartVerse - Modern E-Commerce Platform

CartVerse is a full-stack e-commerce application built with modern web technologies. It provides a seamless shopping experience with features like product browsing, cart management, user authentication, and secure checkout with Stripe integration.

## Screenshots

![CartVerse Homepage](./images/image.png)

![Product Listing](./images/image1.png)

![Product Detail](./images/image2.png)

![Shopping Cart](./images/image3.png)

![Checkout Process](./images/image4.png)

## Features

- 🛍️ **Product Catalog**: Browse products by category with search and filtering
- 🔐 **User Authentication**: Secure login/signup with email 
- 🛒 **Shopping Cart**: Add, update, and remove items from your cart
- 💳 **Stripe Checkout**: Secure payment processing with Stripe
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔍 **Search Functionality**: Find products quickly with search
- 📦 **Order Management**: View and track your orders
- 👤 **User Profiles**: Manage your account information

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Zustand** for state management
- **React Query** for data fetching
- **Tailwind CSS** with Shadcn UI components
- **Stripe.js** for payment integration

### Backend
- **Fastify** for high-performance API
- **Prisma** for database ORM
- **PostgreSQL** database
- **Stripe API** for payment processing
- **Supabase** for storage and authentication
- **Zod** for schema validation

### Infrastructure
- **Turborepo** for monorepo management
- **Vercel** for deployment
- **TypeScript** throughout the codebase
- **PNPM** for package management

## Getting Started

### Prerequisites

- Node.js 22.x
- PNPM 8.x
- PostgreSQL database

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cartverse.git
   cd cartverse
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create `.env` files:

   For backend (`apps/backend/.env`):
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/cartverse
   DIRECT_URL=postgresql://username:password@localhost:5432/cartverse
   PORT=3000
   COOKIE_SECRET=your_cookie_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   CLIENT_URL=http://localhost:5173
   SUPABASE_SERVICE_KEY=your_supabase_key
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

   For client (`apps/client/.env`):
   ```
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

### Database Setup

1. Set up your PostgreSQL database
2. Run Prisma migrations:
   ```bash
   cd apps/backend
   pnpm prisma migrate dev
   ```

3. Seed the database:
   ```bash
   pnpm seed
   ```

### Running the Application

1. Start the development servers:
   ```bash
   pnpm dev
   ```

   This will start both the client (http://localhost:5173) and backend (http://localhost:3000) servers.

2. Alternatively, you can run each separately:
   ```bash
   cd apps/backend
   pnpm dev

   pnpm dev
   ```

## Development

### Project Structure

```
cartverse/
├── apps/
│   ├── backend/         # Fastify API server
│   │   ├── prisma/      # Database schema and migrations
│   │   └── src/         # Backend source code
│   └── client/          # React frontend
│       └── src/         # Frontend source code
├── packages/            # Shared packages
├── api/                 # Vercel serverless functions
└── package.json         # Root package.json
```

### Database Management

- View your database with Prisma Studio:
  ```bash
  cd apps/backend
  pnpm studio
  ```

### Deployment

The application is configured for deployment on Vercel:

```bash
pnpm deploy

```

## Payment Processing

CartVerse uses Stripe for payment processing. The checkout flow redirects users to Stripe's hosted checkout page for secure payment processing.

For development, you can enable mock checkout by setting `USE_MOCK_CHECKOUT=true` in your backend environment variables.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Turborepo](https://turbo.build/) for the monorepo setup
- [Shadcn UI](https://ui.shadcn.com/) for the component library
- [Stripe](https://stripe.com/) for payment processing
- [Vercel](https://vercel.com/) for hosting
