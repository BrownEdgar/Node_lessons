// /contacts - get -> select all
// / contacts / - post -> create
// / contacts / { id } - delete -> delete by id
// / contacts / { id } - get -> select by id
// / contacts / { id } - put -> update by id
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

mongoose.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => console.log(err)
);

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});
