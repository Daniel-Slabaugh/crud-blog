const mongoose = require('mongoose');

//schema for blog post
const blogSchema = mongoose.Schema({

  title: {type: String, required: true},
  content: String, 
  author: {
    firstName: String, 
    lastName: String
  }
});

blogSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()});

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
blogSchema.methods.blogSimple = function() {

  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.authorString
  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Blog = mongoose.model('Blog', blogSchema);

module.exports = {Blog};