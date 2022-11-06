const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//faking comments
let comments = [
    {
        username: 'todd',
        comment: 'lol lol lol',
        id: uuid()
    },
    {
        username: 'john',
        comment: 'lmao lmao lmao',
        id: uuid()
    },
    {
        username: 'mathew',
        comment: 'laughing',
        id: uuid()
    }
]

app.listen('3000', () => {
    console.log('Listening on port 3000');
});

//Show all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

//Form to create a new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

//Creating a new comment on page
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
});

//Get a comment by id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find (c => c.id === id);

    res.render('comments/show', { comment });
});

//Editing a comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find (c => c.id === id);

    const newCommentText = req.body.comment;
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});

//Form to edit a comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find (c => c.id === id);

    res.render('comments/edit', { comment });
});

//Deleting a comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});