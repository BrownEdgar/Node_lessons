import { renderData } from './helpers.js';

const table = document.querySelector('table');

fetch('./data.json')
  .then(res => res.json())
  .then((data) => renderData(data, table))






// https://mongoosejs.com/docs/api/aggregate.html
