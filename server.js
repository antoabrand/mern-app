//dependencies
const express = require('express');

//vars
const app = express();
const port = process.env.PORT || 5000;

//initial route
app.get('/', (req, res) => {
  res.send('You made it!')
});

//server start listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})