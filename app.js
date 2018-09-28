const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyparser.json());

//
var datalist = Array.apply(null, {length: 15})
  .map((val, index) => {
    index++;
    if (index % 15 == 0){return 'FizzBuzz';}
    if (index % 3 == 0){return 'Fizz';}
    if (index % 5 == 0){return 'Buzz';}
    return index;
  });

app.get('/', (req, res) => {
  res.render('index', { datalist: datalist, editing: false });
});

app.get('/edit', (req, res) => {
  res.render('index', { datalist: datalist, editing: true });
});

app.post('/', (req, res) => {
  if(req.body.value) {
    datalist.push(req.body.value);
    res.json({
      value: req.body.value,
      index: datalist.length-1
    });
  }
  else {
    res.json({ error: 'nothing sent' });
  }
});

app.post('/edit', (req, res) => {
  if(req.body.delete) {
    delete datalist[req.body.delete];
    //datalist.splice(req.body.delete, 1);
    res.json(Object.assign({}, req.body, { editing: true }));
  }
  else {
    res.json({ error: 'nothing sent' });
  }
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Listening 127.0.0.1:3000');
});
