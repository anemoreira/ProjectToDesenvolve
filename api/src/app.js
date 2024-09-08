const express = require('express');
const path = require('path');
const promClient = require('prom-client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do coletor de métricas
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

// Roteamento para métricas
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

// Importar e usar as rotas
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/submit-form', weatherRoutes);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
