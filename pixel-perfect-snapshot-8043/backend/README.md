# Nepal Election Portal - Backend API

This is the backend REST API for the Nepal Election Information Portal built with Express.js and MongoDB.

## 🚀 Features

- RESTful API for candidates and announcements
- MongoDB database integration
- CORS enabled for frontend integration
- Rate limiting for API protection
- Input validation and error handling
- Security headers with Helmet
- Request logging with Morgan
- Compression for responses
- Environment-based configuration

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/nepal-election-portal
CORS_ORIGIN=http://localhost:8080
```

## 🏃 Running the Server

### Development mode (with nodemon):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📡 API Endpoints

### Candidates

- `GET /api/candidates` - Get all candidates (with optional filters)
  - Query params: `search`, `constituency`, `party`
- `GET /api/candidates/:id` - Get single candidate
- `POST /api/candidates` - Create new candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `GET /api/candidates/meta/constituencies` - Get all unique constituencies
- `GET /api/candidates/meta/parties` - Get all unique parties

### Announcements

- `GET /api/announcements` - Get all announcements
  - Query params: `category`, `limit`
- `GET /api/announcements/:id` - Get single announcement
- `POST /api/announcements` - Create new announcement
- `PUT /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement

### Health Check

- `GET /health` - Server health check

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   ├── controllers/
│   │   ├── candidateController.js
│   │   └── announcementController.js
│   ├── middleware/
│   │   ├── errorHandler.js   # Error handling
│   │   └── rateLimiter.js    # Rate limiting
│   ├── models/
│   │   ├── Candidate.js      # Candidate schema
│   │   └── Announcement.js   # Announcement schema
│   ├── routes/
│   │   ├── candidateRoutes.js
│   │   └── announcementRoutes.js
│   └── server.js             # Main server file
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔗 Connecting to Frontend

Update your frontend's `.env` or configuration to point to the backend:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Input validation
- Error handling middleware
- Request size limits (10MB for base64 images)

## 📝 Sample Data

You can seed the database with sample candidates by making POST requests to `/api/candidates` with the candidate data from your frontend.

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your connection string is correct
- Check firewall settings if using MongoDB Atlas

### CORS Errors
- Verify `CORS_ORIGIN` in `.env` matches your frontend URL
- Check that the frontend is running on the specified port

### Rate Limiting
- If you're getting "Too many requests" errors during development, you can increase the limits in `src/middleware/rateLimiter.js`

## 📄 License

ISC
