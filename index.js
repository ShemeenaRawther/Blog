import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//css
app.use(express.static("public"));

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//get all blogs
app.get("/blogs", (req, res) => {    
    res.json(blogs);
  });

  //get a specific blog
  app.get("/blogs/:id", (req, res) => {       
   var id = req.params.id;
   var specificBlog = blogs.find(blog=>blog.id == id);
  res.json(specificBlog);
  });

  //create a new blog
app.post("/new",(req,res) =>{
  console.log("req.body" + req.body);
  var newBlog = {
    id:blogs.length+1,
    title: req.body.title,
    content:req.body.content,
    author:req.body.author,
    createdDate:new Date()
  };

  blogs.push(newBlog);
  res.json(newBlog);
});

//update a blog partially
app.patch("/blogs/:id", (req,res) =>{
  console.log("inside backend update");
var id = req.params.id;
var specificBlog = blogs.find(blog=>blog.id == id);
if(req.body.title) specificBlog.title = req.body.title;
if(req.body.content) specificBlog.content = req.body.content;
if(req.body.author) specificBlog.author = req.body.author;
res.json(specificBlog);
});

//delete blog
app.delete("/blogs/:id",(req, res)=>{
var id = req.params.id;
var blogIndex = blogs.findIndex(blog=>blog.id == id);
blogs.splice(blogIndex, 1);
res.json({ message: "blog deleted" });
});

app.listen(port, () => {
  console.log(`Listening on backend port ${port}`);
});


  const blogs = [
    {
      id:1,
      title: "How to overcome Procrastination: Understanding and Overcoming the Habit",
      content:"Procrastination is a common challenge that affects people from all walks of life. But why do we procrastinate, and how can we break free from its grip? Let’s explore",
      author:"Steve",
      createdDate:"2023-08-01T10:00:00Z"
    },
    {
      id:2,
      title:"Personality Improvement: A Journey to Becoming Your Best Self",
      content:"Personality is a powerful and unique combination of traits, behaviors, attitudes, and emotional patterns that shape who we are.",
      author:"Neel",
      createdDate:"2023-08-01T10:00:00Z"
    },
    {
      id:3,
      title:"How to Be Proactive: A Guide to Taking Initiative in Life",
      content:"Being proactive means taking control of your life, anticipating challenges, and acting to shape your circumstances rather than simply reacting to them. Proactivity is a mindset that empowers you to focus on what you can influence, seize opportunities, and take responsibility for your actions. Here’s a step-by-step guide to help you become more proactive in your personal and professional life.",
      author:"Leon",
      createdDate:"2023-08-01T10:00:00Z"
    }  
     
  ];
