const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});