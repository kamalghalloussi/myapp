module.exports = {
  apps : [{
    name: 'app',
    script: './www/app.js',
    instances: 3, // Exécution de 3 instances
    autorestart: true,
    watch: false,
    max_memory_restart: '200M', // Limite de mémoire à 200 Mo
    log_file: '/logs/err.log', // Fichier de log pour les erreurs
    out_file: '/logs/out.log', // Optionnel: Fichier de log pour la sortie standard
    error_file: '/logs/err.log', // Fichier de log pour les erreurs standard
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
