# Quick Start Guide

Follow these steps to get the backend server running:

## 1. Install MongoDB

### Windows:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run as a Windows service automatically

### macOS (with Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux:
Follow instructions at https://docs.mongodb.com/manual/administration/install-on-linux/

## 2. Install Dependencies

```bash
cd backend
npm install
```

## 3. Configure Environment

The `.env` file has been created with default values. If you need to change anything:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nepal-election-portal
CORS_ORIGIN=http://localhost:8080
```

## 4. Seed the Database (Optional)

To populate the database with sample data:

```bash
npm run seed
```

To delete all data:

```bash
npm run seed:delete
```

## 5. Start the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start at `http://localhost:5000`

## 6. Test the API

Open your browser or use a tool like Postman:

- Health check: `http://localhost:5000/health`
- Get candidates: `http://localhost:5000/api/candidates`
- Get announcements: `http://localhost:5000/api/announcements`

## 7. Connect to Frontend

Update your frontend to use the API URL:

In your frontend's environment configuration, set:
```
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: 
  - Windows: Check Services for "MongoDB"
  - Mac: `brew services list`
  - Linux: `sudo systemctl status mongod`

### Port Already in Use
- Change the PORT in `.env` file
- Or stop the process using port 5000

### CORS Errors
- Make sure CORS_ORIGIN matches your frontend URL
- Restart the server after changing .env

## API Documentation

See `README.md` for complete API endpoint documentation.
