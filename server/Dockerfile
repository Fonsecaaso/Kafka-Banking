# Imagem base
FROM node:14

# Diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar arquivos de package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código fonte para o contêiner
COPY . .

# Porta em que o servidor estará escutando
EXPOSE 9043

# Comando para iniciar o servidor
CMD ["npx", "nodemon", "./bin/server.js"]