# POD Store - Print-on-Demand E-commerce Platform

A full-stack e-commerce web application built with Next.js, featuring print-on-demand T-shirts with clean and minimalistic design.

## 🚀 Features

### Core Features
- **Authentication**: Email/password and Google OAuth integration
- **Product Catalog**: Browse and search T-shirts with filters
- **Shopping Cart**: Add, remove, and manage cart items
- **Checkout**: Secure payment processing with Razorpay
- **Order Management**: Track orders and order history
- **User Profiles**: Account management and address book
- **Admin Panel**: Product and order management (Admin users)
- **Responsive Design**: Mobile-first, clean UI

### Technical Features
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js with JWT sessions
- **State Management**: Zustand for client-side state
- **Form Validation**: React Hook Form with Zod schemas
- **Styling**: Tailwind CSS with custom components
- **Image Optimization**: Next.js Image component
- **API Routes**: RESTful API with Next.js App Router

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Payment**: Razorpay
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pod
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/pod-ecommerce?retryWrites=true&w=majority"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-key-here"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Razorpay
   RAZORPAY_KEY_ID="your-razorpay-key-id"
   RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

   # Cloudinary (optional)
   CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
   CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Generate Prisma client**
   ```bash
   npm run db:generate
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 🗂️ Project Structure

```
pod/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Homepage
│   ├── components/            # React components
│   │   ├── ui/                # UI components
│   │   ├── layout/            # Layout components
│   │   └── cart/              # Cart components
│   ├── lib/                   # Utilities and configs
│   │   ├── auth.js            # NextAuth config
│   │   ├── db.js              # Database client
│   │   ├── utils.js           # Utility functions
│   │   └── validations.js     # Zod schemas
│   └── store/                 # Zustand state stores
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
└── package.json
```

## 🔧 Configuration

### Database Setup
1. Create a MongoDB Atlas account or use local MongoDB
2. Create a new database cluster
3. Get the connection string and add it to `DATABASE_URL`

### Authentication Setup
1. **Google OAuth**: Go to Google Cloud Console, create a project, enable Google+ API, and get credentials
2. **NextAuth Secret**: Generate a random string for `NEXTAUTH_SECRET`

### Payment Setup
1. Create a Razorpay account
2. Get your Key ID and Key Secret from the dashboard
3. Add them to your environment variables

## 📚 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Products
- `GET /api/products` - Get all products (with pagination and filters)
- `POST /api/products` - Create product (Admin only)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (Admin only)
- `DELETE /api/products/[id]` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Remove item from cart

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

## 🎨 Design System

The application uses a clean, minimalistic design with:
- **Typography**: Inter font family
- **Colors**: Grayscale palette with black accents
- **Components**: Consistent spacing, shadows, and interactions
- **Layout**: Container-based layouts with responsive grid systems

## 🔐 Security Features

Current security measures:
- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Zod
- CSRF protection via NextAuth
- Secure payment processing

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (recommended)
   - Connect your repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Other platforms**
   - The app can be deployed to any platform that supports Next.js
   - Ensure all environment variables are set

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Prisma team for the excellent ORM
- All open-source contributors

## 📞 Support

For support, email support@podstore.com or create an issue in the repository.

---

**Note**: This is a demo application. For production use, ensure you implement additional security measures, monitoring, and testing.
