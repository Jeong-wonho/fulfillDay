const app = require('./app');
require('dotenv').config();

app.listen(app.get(process.env.PORT), () => {
    console.log(process.env.PORT, '번 포트에서 대기중');
})