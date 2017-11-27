//index.ts
import * as express from 'express';
import * as hal from 'hal';
import * as redis from 'redis';
import { RedisClient } from 'redis';

const Timeseries = require('redis-timeseries');
const client:RedisClient = redis.createClient();
const rts = new Timeseries(client, "stats", {
    '1hour' : {ttl: 24*60*60, duration:60*60}
});
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
    rts.recordHit('hits').exec();
    res.status(202).type('json').send();
});

app.get('/events', function(req, res) {
    rts.getHits('hits', '1hour', 1, function(err:object, data:object) {
        res.json(data);
    });
});
app.listen(3000);
