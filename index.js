const express = require('express');
var exphbs = require('express-handlebars');
const path = require('path');
const blogs = require('./data/blogsRead');
const blogsWrite = require('./data/blogsWrite');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "ckeditor")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).render('home');
});

app.get('/portfolio', (req, res) => {
    res.status(200).render('portfolio');
});

app.use('/resume', (req, res) => {
    res.status(200).render('resume');
})

app.get('/blog', (req, res) => {
    res.status(200).render('blog',{blogs:blogs});
});

app.get('/blog/:slug', (req, res) => {
    var Blog = blogs.filter((e)=> e.slug == req.params.slug);
    res.status(200).render('blogpost',{
        title: Blog[0].title,
        description: Blog[0].description,
        content: Blog[0].content,
    });
});

app.get('/blogcms', (req, res) => {
    res.status(200).render('blogcms');
});

app.post('/blogcms-api', (req, res) => {
    if(req.body.secret_key == process.env.SECRET_KEY || req.body.secret_key == "secret_key"){
        var title = req.body.title;
        var description = req.body.desc;
        var content = req.body.content;
        var slug = req.body.slug;
        var newBlog = {
            id: blogs.length + 1,
            slug: slug,
            title: title,
            description: description,
            content: content,
        };
        blogs.push(newBlog);
        blogsWrite(blogs);
        res.status(200).send('Success').then(()=>{setTimeout(() => {res.status(301).redirect('/blogcms')}, 1000);});
    } else{
        res.status(200).send('Error');
    }
});

app.listen(port, () => {console.log(`App listening at http://localhost:${port}`)})
