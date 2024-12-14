import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;
const backendURL = "http://localhost:3000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//get all posts
app.get("/", async (req, res)=>{
    try{
        var response = await axios.get(`${backendURL}/blogs`);        
        res.render("index.ejs", {blogs: response.data});
    }catch(error){
        res.status(500).json({message:"error fetching blogs"});
    }
});

//edit a post
app.get("/edit/:id", async (req, res)=>{
    try{       
        var response = await axios.get(`${backendURL}/blogs/${req.params.id}`);        
        res.render("edit.ejs", 
            {blog: response.data,
            heading: "Edit Post", 
            submit: "Update"
            });
    }catch(error){
        res.status(500).json({message:"error fetching blogs"});
    }
});

//create a post
app.get("/new", (req,res) =>{
    console.log("inside new");
    res.render("edit.ejs", {heading: "Create a Post", submit:"Submit"});
});

app.post("/new/blogs", async(req,res) =>{
    try{ 
    console.log("inside new blog" + req.body.title);
    var response = await axios.post(`${backendURL}/new`,req.body);        
    console.log(response.data);
    res.redirect("/");
    }catch(error){
        res.status(500).json({message:"error creating blog"});
    }
});

app.post("/blogs/:id", async(req,res) =>{
    try{
        console.log("inside update server");
        var response = await axios.patch(`${backendURL}/blogs/${req.params.id}`,req.body);
        res.redirect("/");
    }catch(error){
        res.status(500).json({message:"error updating blog"});
    }
});

// delete a post
app.get("/delete/:id", async (req, res)=>{
    try{       
        var response = await axios.delete(`${backendURL}/blogs/${req.params.id}`);        
        res.redirect("/");
    }catch(error){
        res.status(500).json({message:"error fetching blogs"});
    }
});

app.listen(port, () => {
    console.log(`Listening on server port ${port}`);
  });