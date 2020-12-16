import express from 'express';

const app = express();
const port = 3000;

app.get('/*', (req, res) => {
  res.send('Hello World!');
})
app.post('/*', function (req, res) {
    res.send('Hello World!');
    //         console.log(req.body);
    //         //console.log(req);
    //         res.json('222');
    //     });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})