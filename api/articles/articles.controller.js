const Article = require('../api/articles/articles.model.js');

// Méthode pour créer un article
const createArticle = async (articleData, userId) => {
    articleData.userId = userId;

    const article = new Article(articleData);
    await article.save();
    return article;
};

module.exports = {
    createArticle,
};

// Méthode pour mettre à jour un article
const updateArticle = async (articleId, articleData, user) => {
    const article = await Article.findById(articleId);
    if (!article) {
        throw new Error('Article not found');
    }

    // Vérifier si l'utilisateur est un administrateur
    if (user.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can update articles');
    }

    Object.assign(article, articleData);
    await article.save();
    return article;
};

// Méthode pour supprimer un article
const deleteArticle = async (articleId, user) => {
    const article = await Article.findById(articleId);
    if (!article) {
        throw new Error('Article not found');
    }

    // Vérifier si l'utilisateur est un administrateur
    if (user.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can delete articles');
    }

    await article.remove();
    return article;
};

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle
};

//Explication du Code :
//createArticle : Cette méthode crée un nouvel article en utilisant les données fournies (articleData) et enregistre l'article dans la base de données.
//updateArticle : Cette méthode recherche d'abord un article par son ID. Si l'article est trouvé, il est mis à jour avec les nouvelles données (articleData) et sauvegardé.
//deleteArticle : Cette méthode recherche également un article par son ID et, si trouvé, le supprime de la base de données.

