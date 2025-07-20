require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);


const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB');

 
  const server = app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
  });


  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(` El puerto ${PORT} ya está en uso. Cambia el puerto en tu archivo .env.`);
    } else {
      console.error(' Error del servidor:', err);
    }
  });
})
.catch(err => {
  console.error('Error de conexión a MongoDB:', err.message);
});
