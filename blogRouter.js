const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models.js');

BlogPosts.create('here', 'more here', 'me', '1/2/3');
BlogPosts.create('there', 'more there', 'him', 'tomorrow');
BlogPosts.create('everywhere', 'most everywhere', 'them', 'future');

router.get('/', (req, res) => {
  console.log('here');
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  //check to make sure we have info
  const fields = ['title', 'content', 'author', 'publishDate'];
  for (let i=0; i<fields.length; i++) {
    const field = fields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});

router.put('/:id',  jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating Blog Entry \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).json(updatedItem);
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted Blog Entry \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;