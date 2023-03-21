# image docker de base
FROM node:18.3.0-alpine
# préciser l'environnement d'execution
ENV NODE_ENV development
# definir le répertoire de travail au sein du conteneur
WORKDIR /app
# copier les fichiers qui servent à installer les dépendances pour le fonctionnement du projet
COPY ["package.json", "package-lock.json*"]
# execution de la commande pour installer les dépendances

# copier l'ensemble du code source au sein du conteneur
COPY . .
RUN npm install --production

# commande pour démarrer l'execution du projet
CMD ["node", "server.js"]