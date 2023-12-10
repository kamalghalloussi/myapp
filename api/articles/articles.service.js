const Article = require('./articles.model');

const getUserArticles = async (userId) => {
    try {
        const articles = await Article.find({ user: userId }).populate({
            path: 'user',
            select: '-password' // Exclure le mot de passe de l'utilisateur
        });
        return articles;
    } catch (error) {
        throw error;
    }
};


