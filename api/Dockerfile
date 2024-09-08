# Usar uma imagem base oficial do Node.js
FROM node:18

# Configurar o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o arquivo de dependências para instalar as dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto para o contêiner
COPY . .

# Expor a porta que o aplicativo vai usar
EXPOSE 3000

# Comando para iniciar o servidor
CMD [ "node", "src/app.js" ]
