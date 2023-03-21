const { User } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const createUser = async (req, res) => {
  try {
    const { nom, lieu, contact, email, password } = req.body;

    // Verifier si l'email est existe deja dans la db 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'email deja utilise' });
    }
    
    // Hash le mot de passe 
    const hashedPassword = await bcrypt.hash(password, 10);

    //Créer un nouvel utilisateur si aucun doublon n'a été trouvé
    const user = await User.create({ nom, lieu, contact, email, password: hashedPassword });

    // Créer un jeton Web JSON
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    // Définir le cookie contenant le JWT
    res.cookie('jwt', token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // définir un indicateur sécurisé pour l'environnement de production
      sameSite: 'strict' // définit l'indicateur sameSite pour plus de sécurité
    });
  
    console.log('user', JSON.stringify(user, null, 2));
    console.log(token);
    // retourner les details de l'utilisateur
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur pas trouve' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateUserById = async (req, res) => {
  const id = req.params.id;
  const { nom,  contact, email, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur pas trouve' });
    }
    // mettre a jour un User
    user.nom = nom || user.nom;
    user.lieu = lieu || user.lieu;
    user.contact = contact || user.contact;
    // 
if (email && email !== user.email) {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  user.email = email;
}
    user.password = password || user.password;
    await user.update();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};






//supprimer user
const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur pas trouve' });
    }
    await user.destroy();
    res.status(204).json({ message: 'Utilisateur supprime avec succes' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
//login un User
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Vérifie si l'utilisateur existe dans la base de données
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe invalide' });
      }
  
      // Verifier si le mot de passe est correcte
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Email ou mot de passe invalide' });
      }
  
      // Générer un jeton JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
      });
  
     // Définir le jeton JWT en tant que cookie
      res.cookie('jwt', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // set secure flag for production environment
        sameSite: 'strict' // set sameSite flag for additional security
      });
  
      // retourner les details de l'utilisateur
      return res.status(200).json({ message: 'Connexion reussie', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = { createUser, getAllUsers, getUserById, updateUserById, deleteUserById ,login};
