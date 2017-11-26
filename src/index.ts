//index.ts

import * as express from 'express';
let app = express();

app.get('/', function(req, res) {
    res.json({
        message: 'Hello World!'
    });
});

app.listen(3000);
