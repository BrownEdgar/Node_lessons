const express = require('express');

const app = express(); // darnum e mer servery
const port = 3000;

app.get('/', (req) => {
  // res.send("sebo");
  console.log(`method: ${req.method}`);
  // query պահպանում է իր մեջ URL հարցումները օբյեկտի նման
  console.log(`query: ${req.query}`);
  // http կամ https մեր դեպքում http, որովհետև պաշտպանված չե
  console.log(`protocol: ${req.protocol}`);
  // պաշտպանված պռատակոլովա գնում հարցումը թե ոչ
  console.log(`secure: ${req.secure}`);
  // որոնման ամենահարմար կոնտենտը գտնում և վերադարձնում է,
  // եթե համընկնում չկա վերադարձնում է false
  console.log(`accepts: ${req.accepts(['text/html', 'application/json'])}`);
  // "Content-type" - վերնագրի անունն է, որը ուզում ենք ստանալ
  console.log(`type: ${req.get('Content-type')}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
