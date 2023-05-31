//Citation for the follow code:
//Date: 5/24/2023
//Adapted from nodejs-starter-app steps 3-8 to fit project 
//https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js


var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 2123;
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

app.get('/', function(req, res)
    {
        res.render('index');
    });

app.get('/potions', function(req, res)
    {
        let query1 = "SELECT * FROM Potions;";

        db.pool.query(query1, function(error, rows, fields){
            res.render('potions', {data: rows});
        })
    });

// add potion

app.post('/add-potion-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Potions (potion_name, potion_effect, potion_color, potion_price) VALUES ('${data.potion_name}', '${data.potion_effect}', '${data.potion_color}', ${data.potion_price})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Potions;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

//delete potion
app.delete('/delete-potion-ajax/', function(req, res, next) {
    let data = req.body;
    let potion_ID = parseInt(data.potion_ID);
    let deletePotions = `DELETE FROM Potions WHERE potion_ID = ?`;
  
    // Run the 1st query
    db.pool.query(deletePotions, [potion_ID], function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  });
  
  app.put('/put-potion-ajax', function(req,res,next){
    let data = req.body;
    console.log('Data received:', data);
  
    let queryUpdatePotion = `UPDATE Potions SET potion_effect = ? , potion_color = ?, potion_price = ? WHERE potion_ID = ?`; 
    let selectPotion = `SELECT * FROM Potions WHERE potion_ID = ?`
          // Run the 1st query
          db.pool.query(queryUpdatePotion, [`${data.potion_effect}`, `${data.potion_color}`, `${data.potion_price}`, data.potion_name], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                db.pool.query(selectPotion, [data.potion_name], function(error,row,fields){
                    if (error){
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                }
                )
              }
  
  })});

  //READ for Spell books
  app.get('/books', function(req, res)
  {
      let query1 = "SELECT * FROM Spell_Books;";

      db.pool.query(query1, function(error, rows, fields){
          res.render('books', {data: rows});
      })
  });

  //CREATE for Spell books
  app.post('/add-book-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Spell_Books (book_title, book_price) VALUES ('${data.book_title}', '${data.book_price}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Spell_Books;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

//DELETE spell book
app.delete('/delete-book-ajax/', function(req, res, next) {
    let data = req.body;
    let book_ID = parseInt(data.book_ID);
    let deleteBook = `DELETE FROM Spell_Books WHERE book_ID = ?`;
  
    // Run the 1st query
    db.pool.query(deleteBook, [book_ID], function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  });

  //UPDATE for Spell Books
  app.put('/put-book-ajax', function(req,res,next){
    let data = req.body;
    console.log('Data received:', data);
  
    let queryUpdateBook = `UPDATE Spell_Books SET book_price = ? WHERE book_ID = ?`; 
    let selectBook = `SELECT * FROM Spell_Books WHERE book_ID = ?`
          // Run the 1st query
          db.pool.query(queryUpdateBook, [`${data.book_price}`, data.book_title], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                db.pool.query(selectBook, [data.book_title], function(error,row,fields){
                    if (error){
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                }
                )
              }
  
  })});


app.get('/transactions', function(req, res)
    {
        res.render('transactions');
    });

app.get('/customers', function(req, res)
    {
        res.render('customers');
    });

app.get('/recipes', function(req, res)
    {
        res.render('recipes');
    });

app.get('/ingredients', function(req, res)
    {
        res.render('ingredients');
    });

app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});