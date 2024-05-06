import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var lastId = 3;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 

app.get("/", (req, res) => {    
    res.render("index.ejs", { posts: posts });
});

app.get("/back", (req, res) => {    
    res.render("index.ejs", { posts: posts });
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/edit/:id", (req, res) => {
    var postId = req.params["id"];
    var filteredResult = posts.find((e) => e.id == postId);

    res.render("edit.ejs", { id: filteredResult.id, title: filteredResult.title, content: filteredResult.text, author: filteredResult.author});
});

app.post("/submit", (req, res) => {
    const today = new Date();
    const date = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    posts.push({ id: lastId + 1, author: req.body["postAuthor"], date: date, title: req.body["postTitle"], text: req.body["postContent"] });
    
    lastId = lastId + 1;
    res.render("index.ejs", { posts: posts });
});

app.post("/save", (req, res) => {
    var index = posts.findIndex((e) => e.id == req.body["postId"]);
    posts[index].title = req.body["postTitle"];
    posts[index].text = req.body["postContent"];
    posts[index].author = req.body["postAuthor"];

    res.render("index.ejs", { posts: posts });
});

app.get("/delete/:id", (req, res) => {
    var postId = req.params["id"];
    var index = posts.findIndex((e) => e.id == postId);

    if (index > -1) { // only splice array when item is found
        posts.splice(index, 1); // 2nd parameter means remove one item only
      }

    res.render("index.ejs", { posts: posts });
});

app.get("/viewPost/:id", (req, res) => {
    var postId = req.params["id"];
    var filteredResult = posts.find((e) => e.id == postId);

    res.render("viewPost.ejs", { title: filteredResult.title, content: filteredResult.text, author: filteredResult.author, date: filteredResult.date});
});

app.listen(port, () => { 
    console.log(`Server running on port ${port}`);
});


var posts = [
    { id: 1, author: 'Priscila Acosta', date: '03/18/2024', title: 'Mercury Facts', text: 'The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth\'s Moon. From the surface of Mercury, the Sun would appear more than three times as large as it does when viewed from Earth, and the sunlight would be as much as seven times brighter.' },
    { id: 2, author: 'Priscila Acosta', date: '03/15/2024', title: 'Earth Facts', text: 'Earth – our home planet – is the third planet from the Sun, and the fifth largest planet. It\'s the only place we know of inhabited by living things.' },
    { id: 3, author: 'Priscila Acosta', date: '02/05/2024', title: 'Jupiter Facts', text: 'Jupiter is the largest planet in our solar system – if it were a hollow shell, 1,000 Earths could fit inside. It\'s also the oldest planet, forming from the dust and gases left over from the Sun\'s formation 4.5 billion years ago. ' }
];