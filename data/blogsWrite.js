const fs = require('fs');
const path = require('path');

const blogsWrite = (blogs) => {
    var blogsJSON = {
        blogs: blogs,
    }
    fs.writeFile(path.join(__dirname, 'blogs.json'), JSON.stringify(blogsJSON), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

module.exports = blogsWrite;