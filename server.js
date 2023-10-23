const app = require('./app');
require('dotenv').config();

app.listen(app.get(3000), () => {
    console.log(3000, '번 포트에서 대기중');
})