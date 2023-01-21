import mainRouter from './main-router.js';

export default (app) => {
    app.use('/mealtrain',mainRouter)
}

