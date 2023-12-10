const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "no token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);

    // Plutôt que de stocker uniquement l'ID de l'utilisateur, on stocke toutes les informations
    // de l'utilisateur dans req.user.
    req.user = decoded;

    next();
  } catch (error) {
    // ont peut également passer l'erreur dans le middleware suivant s'il y en a une.
    next(new UnauthorizedError(error.message));
  }
};



