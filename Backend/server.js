import config from './config/config.js';
import app from './api/app.js' ;


// starting the app
const {port} = config.API;
app.listen(port, () => console.log(`Server Connected at port ${port}`));

