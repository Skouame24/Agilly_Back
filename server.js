const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const usersRoutes = require('./routes/user');
const formRoutes = require('./routes/form');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const campagnesRoutes = require('./routes/Campagne')



const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Route for users

app.use('/api/users', usersRoutes);

//Route for form
app.use('/forms', formRoutes);

//
app.use('/questionnaires', questionnaireRoutes);

//
app.use('/campagne', campagnesRoutes )
// Start the server
const port = process.env.PORT || 5000;
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error(error);
  });
