const express = require('express');
const app = express();
var cors = require('cors')
const mysql = require('mysql');

//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    port: '3308',
    user: 'root',
    password: '',
    database: 'supermarket'
});


app.listen('5000', () => {
    console.log(" Server started on port 5000");
})

db.connect((err) => {
    if (err) {
        console.log("error is", err)
    }
    console.log("MYSQL Connected")
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.get('/all', (req, res)=>{

    db.query("SELECT * FROM users", function (err, result) {

        if(err) {
            console.log("error: ", err);
            res.send(null, err);
        }
        else{
          console.log('all users : ', result);  

         res.send(result)
        }
    });   
});

app.get('/all/:id', (req,res)=>{
    db.query('SELECT * FROM users WHERE id = ?', req.params.id, function(err, result){
        if(err) throw err;
        console.log(result)
        res.send(result)
    } )
});



app.post('/addUser', (req,res)=>{
    console.log(req.body)
    const {
        id ,
        username,
        password,
        email,
        contact_number
    } = req.body;
   // new_user = { id: 2,username: "Nimni", contact_number: 0718989564, password: "Foiuy" }
    new_user = req.params;
    db.query(`INSERT INTO users (id,username,email,contact_number,password)  VALUES ('${id}','${username}', '${email}', '${contact_number}','${password}');`,
    new_user, function(err, result){
         if(err) throw err;
         console.log(result);
         res.send("successfully created")
     } ) 
 });

 app.put('/edit/:id', (req,res)=>{
     console.log(req.body)
    var {
        id ,
        username,
        password,
        email,
        contact_number
    } = req.body;

     update_user = req.params;
     id = req.params.id;
    db.query(`UPDATE users SET username='${username}',email='${email}', password='${password}', contact_number='${contact_number}' WHERE id='${id}'`, update_user, function(err,result){
        if(err) throw err;
        console.log(result)
        res.send("successfully updated")
    })
 });


 app.delete('/delete/:id', (req,res)=>{
    db.query('DELETE FROM users WHERE id = ? ', req.params.id, function(err, result){
        if (err) throw err;
        console.log(result)
        res.send("successfully deleted")
    })
})

