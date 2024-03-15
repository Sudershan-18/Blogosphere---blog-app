const express = require('express');
const cors = require('cors');
const  mongoose = require('mongoose');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const dotenv = require("dotenv").config();

const salt = bcrypt.genSaltSync(10);
const secret = "alsdkjfkla34ljkllk1q2kjljl";

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","https://blogosphere-blog-app.vercel.app");
//     res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

app.use(cors({credentials:true, origin: 'https://blogosphere-blog-app.vercel.app'}));

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.CONNECTION_STRING);

app.post('/register', async (req, res) => {
    try{
        const {username, password} = req.body;
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch(err) {
        res.status(400).json(err);
    }
});

app.post('/login', async (req, res) => {
    try{
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    // res.json(userDoc);

    if(passOk){
        //user logged in and we should respont with jwt
        jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
            // res.json(token);
        });
    } else {
        res.status(400).json('wrong credentials');
    }
    } catch(e){
        res.status(400).json(e.message);
    }
});

app.get('/profile', (req, res)=> {
    try{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
    } catch(e){
        res.status(400).json(e.message);
    }
});

app.post('/logout', (req, res) => {
    try{
    res.cookie('token', '').json('ok');
    } catch(e){
        res.status(400).json(e.message);
    }
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://blogosphere-blog-app.vercel.app');
    try{
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];    //we have to grab the extension of the file from its original name and rename it to webp so export and use libraray 'fs'
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author: info.id,
        });
        res.json(postDoc);
    });
    } catch(e){
        res.status(400).json(e.message);
    }
});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://blogosphere-blog-app.vercel.app');
    try{
    let newPath = null;
    if(req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;

        const {id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if(!isAuthor) {
            return res.status(400).json('You are not the author !');
        }

        await postDoc.updateOne({
            title, 
            summary, 
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
        
        res.json(postDoc);
    });
    } catch(e){
        res.status(400).json(e.message);
    }
    
});

app.get('/post', async (req, res) =>{
    try{
    res.json(await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
    } catch(e){
        res.status(400).json(e.message);
    }
});

app.get('/post/:id', async (req, res) => {
    try{
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
    } catch(e){
        res.status(400).json(e.message);
    }
});

app.listen(4000);
