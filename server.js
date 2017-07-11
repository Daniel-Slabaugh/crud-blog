const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const blogRouter = require('./blogRouter');

app.use('/blog-posts', blogRouter);

app.listen(8080, () => {
  console.log(`Your app is listening on port 8080`);
});