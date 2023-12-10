const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  }
});

const Article = model("Article", articleSchema);

module.exports = Article;
