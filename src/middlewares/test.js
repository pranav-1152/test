
app.use(express.urlencoded({ extended : false }));

app.use((req, res, next)=>{
  console.log();
  req.myurlname = "this is gaurav"
  next();
});

app.use((req, res, next)=>{
  console.log(req.myurlname);
  next();
});


