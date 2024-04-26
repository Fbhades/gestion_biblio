
interface User {
    id_user: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
  }
  
  
  let users: User[] = []; 
  
  export default function handler(req: any, res: any) {
    if (req.method === 'POST') {
      // CREATE
      const newUser: User = req.body;
      users.push(newUser);
      res.status(201).json(newUser);
    } else if (req.method === 'GET') {
      // READ
      res.status(200).json(users);
    } else if (req.method === 'PUT') {
      // UPDATE
      const { id } = req.query;
      const updatedUser: User = req.body;
      const index = users.findIndex(user => user.id_user === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        res.status(200).json(users[index]);
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    } else if (req.method === 'DELETE') {
      // DELETE
      const { id } = req.query;
      users = users.filter(user => user.id_user !== id);
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } else {
      res.status(405).end(); 
    }
  }
  