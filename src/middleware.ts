import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/', '/api/books', '/api/books/:id(\\d+)', '/api/auth', '/api/categories', '/api/categories/:id(\\d+)', '/books'],
});

export const config = {
  api: {
    bodyParser: false,
  },
};