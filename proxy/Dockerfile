# Define a imagem base
FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de configuração do projeto
COPY package.json ./

# Instala as dependências do projeto
RUN npm install express --legacy-peer-deps
RUN npm install body-parser --legacy-peer-deps
RUN npm install kafkajs --legacy-peer-deps

# Copia o código-fonte do projeto
COPY . .

# Expõe a porta que o aplicativo vai utilizar
EXPOSE 9043

# Define o comando de execução do contêiner
CMD ["node", "proxy.js"]
