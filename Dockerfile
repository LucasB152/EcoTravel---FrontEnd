# Étape 1 : Construire l'application Angular
FROM node:20 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod

# Étape 2 : Utiliser un serveur HTTP statique pour servir les fichiers
FROM nginx:stable-alpine

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /app/dist/front-ecotravel /usr/share/nginx/html

# Exposer le port 80 pour Render
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
