const userRoutes = require('./users');
const exercisesRoutes = require('./exercises');
const routinesRoutes = require('./routines');

const constructorMethod = (app) => {
    app.use('/users', userRoutes);
    app.use('/exercises', exercisesRoutes);
    app.use('/routines', routinesRoutes)
    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;