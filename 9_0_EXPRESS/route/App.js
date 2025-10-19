const express = require('express');

const app = express();

const artists = [
  {
    id: 1,
    name: 'Metalica',
  },
  {
    id: 2,
    name: 'Scorpion',
  },

  {
    id: 3,
    name: 'Forenger',
  },
  {
    id: 4,
    name: 'Forenger',
  },
  {
    id: 5,
    name: 'Forenger',
  },
];
/* -------------------4----------------------*/
/* Այս app-ն այժմ կկարողանա մշակել հարցումները,
հասցեագրված ՝/birds՝ և ՝/birds/about՝, ռեսուրսներին  և
նաև կանչել  միջանկյալ մշակման հատուկ ՝timeLog՝ ֆունկցիան. */
const birds = require('./birds');

app.use('/birds', birds);

app.get('/', (req, res) => {
  res.send('hello Api');
});

app.get('/artists', (req, res) => {
  res.json(artists);
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404);
  next(error);
});

app.listen(3003, () => {
  console.log('Example app listening on port 3003!');
});
