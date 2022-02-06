var blogsJSON = require('./blogs.json');

var blogs = blogsJSON.blogs;
var sortedBlogs = blogs.slice().sort((a, b) => b.id - a.id);
blogs = sortedBlogs;

module.exports = blogs;