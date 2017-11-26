//index.ts
import * as express from 'express';
import * as hal from 'hal';

let app = express();
let indent = 2;

app.get('/', function(req, res) {
    const form = hal.Link('form',{href:'/events/form'})
    const r = hal.Resource({}, '/').link(form)
    res.json(r.toJSON(indent));
});

app.get('/events/form', function(req, res) {
    const postLink = hal.Link('submit', {href: '/events'});
    const r = hal.Resource({fields: [
        {name: 'timestamp', type:'long', description: 'Event timestamp'},
        {name: 'type', type: 'string', description: 'Event type'}
    ]}, '/events/form').link(postLink);
    res.json(r.toJSON(indent));
});

app.post('/events', function(req, res) {
    res.status(202).type('json').send();
});

app.listen(3000);
