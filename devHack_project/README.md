Simple Blogging System Backend

This project is a Node.js + Express + MongoDB backend for a simple blogging system with user authentication, posts, nested comments, categories, tags, and like/dislike features.

Features
- User registration and login
- Profile update
- CRUD for posts (with categories and tags)
- Nested comments (reply to comments)
- Like/dislike posts
- Filtering posts by category and tag

Project Structure
server.js
models/
routes/
controllers/
middleware/
utils/
public/
.env

Setup
1. Install dependencies:
   bash
   npm install

2. Configure MongoDB:
   - Set your MongoDB URI in `.env` file (`MONGO_URI`)
3. Run the server:
   bash
   node server.js

API Endpoints
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `PUT /api/users/profile` — Update profile
- `POST /api/posts` — Create post
- `GET /api/posts` — List posts (filter by category/tag)
- `GET /api/posts/:id` — Get post detail
- `PUT /api/posts/:id` — Update post
- `DELETE /api/posts/:id` — Delete post
- `POST /api/posts/:id/like` — Like post
- `POST /api/posts/:id/dislike` — Dislike post
- `POST /api/comments/:postId` — Add comment (use `parent` for nested)
- `GET /api/comments/:postId` — Get comments (nested)

Frontend
A simple static HTML/CSS page is provided in `public/index.html`.