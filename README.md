# Moms Lounge - Community Platform

A comprehensive community platform designed specifically for mothers to connect, share experiences, get AI-powered parenting advice, and buy/sell baby items.

## 🚀 Features

### Core Community Features
- **Community Forum**: Share and discover motherhood stories
- **User Authentication**: Secure login/signup with JWT tokens
- **Story Sharing**: Create, edit, and view personal stories with images
- **Responsive Design**: Mobile-friendly interface

### AI-Powered Features
- **Moms Helper Prompt Library**: Get instant answers to common parenting questions
- **AI Q&A Chat**: Ask any parenting question and get personalized advice
- **Post Idea Generator**: Generate creative post ideas for your stories

### Marketplace
- **Buy & Sell**: List and browse baby clothes, toys, furniture, and more
- **Category Filtering**: Filter by clothes, toys, furniture, books, or other
- **Condition Ratings**: New, Like New, Good, Fair, Poor
- **User Listings**: Manage your own marketplace listings

### User Management
- **My Posts**: View and manage your stories and marketplace listings
- **Profile Management**: Edit your profile and view activity

## 🛠 Tech Stack

### Frontend
- **React 17** with Hooks
- **Redux** for state management
- **React Bootstrap** for UI components
- **React Router** for navigation
- **Axios** for API calls
- **React Icons** for icons

### Backend
- **Node.js** with Express
- **PostgreSQL** database with Sequelize ORM
- **JWT** for authentication
- **OpenAI API** for AI features
- **bcrypt** for password hashing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- OpenAI API key

### Backend Setup
```bash
cd moms-lounge-server
npm install
```

Create a `.env` file in the server directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/moms_lounge
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=4000
```

Run database migrations:
```bash
npm run migrate
npm run seed
```

Start the server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd moms-Lounge-client
npm install
```

Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:4000
```

Start the development server:
```bash
npm start
```

## 🎯 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration

### Stories
- `GET /stories` - Get all stories
- `POST /stories` - Create new story
- `PUT /stories/:id` - Update story
- `GET /stories/:id` - Get story by ID

### AI Features
- `POST /ai/chat` - Get AI response to question
- `POST /ai/generate-post-idea` - Generate post idea
- `POST /ai/prompt-library` - Get prompt library response
- `GET /ai/history` - Get user's AI chat history

### Marketplace
- `GET /marketplace` - Get all listings
- `POST /marketplace` - Create new listing
- `PUT /marketplace/:id` - Update listing
- `DELETE /marketplace/:id` - Delete listing
- `GET /marketplace/user/listings` - Get user's listings

## 🎨 UI/UX Features

### Navigation
- Modern responsive navbar with icons
- Clear sections: Home, Forum, Prompt Library, Marketplace, My Posts, Ask AI
- Mobile-friendly hamburger menu

### Design System
- Bootstrap 5 components
- Consistent color scheme and typography
- Card-based layouts for content
- Loading states and error handling
- Modal forms for data entry

## 🔧 Development

### Project Structure
```
moms-Lounge-client/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── store/              # Redux store and actions
│   └── config/             # Configuration files

moms-lounge-server/
├── routers/                # API route handlers
├── models/                 # Database models
├── migrations/             # Database migrations
├── services/               # Business logic (AI, etc.)
└── auth/                   # Authentication middleware
```

### Key Features Implementation
- **AI Integration**: OpenAI API service with error handling
- **Marketplace**: Full CRUD operations with image support
- **Real-time Updates**: Redux state management for dynamic content
- **Responsive Design**: Mobile-first approach with Bootstrap

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set:
- Database connection string
- JWT secret
- OpenAI API key
- Frontend API URL

### Database Setup
Run migrations on production database:
```bash
npm run migrate
```

### Build & Deploy
```bash
# Frontend
npm run build

# Backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository.
