import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/','/admin','/api/reservations/admin','/api/loans/admin', '/api/upload', '/api/reservations', '/api/reservations/:user_id(\\d+)', '/api/books', '/api/books/:id(\\d+)', '/api/auth', '/api/categories', '/api/categories/:id(\\d+)', '/api/books/:id(\\d+)/reserver', '/books', '/api/books/:id(\\d+)/available_copies','api/reviews/:id(\\d+)',],
});

export const config = {
  api: {
    bodyParser: false,
  },
};