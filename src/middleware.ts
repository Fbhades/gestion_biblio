import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ['/','/api/books','/api/books/[id]','/api/auth'],
});
 
export const config = {
    api: {
        bodyParser: false, 
    },
};