const userRoutes = require('./users');
const exercisesRoutes = require('./exercises');

const constructorMethod = (app) => {
    app.use('/users', userRoutes);
    app.use('/exercises', exercisesRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;