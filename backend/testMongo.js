const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/"; // MongoDB Atlas ou local

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connecté avec succès !");
  process.exit();
})
.catch(err => {
  console.error("❌ Erreur de connexion :", err);
  process.exit(1);
});
