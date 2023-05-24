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
  
    let potion_name = parseInt(data.potion_name);
    let potion_effect = parseInt(data.potion_effect);
    let potion_color = parseInt(data.potion_color);
    let potion_price = parseInt(data.potion_price);
  
    let queryUpdatePotion = `UPDATE Potions SET potion_effect = '${data.potion_effect}', potion_color = '${data.potion_color}', potion_price = ${data.potion_price} WHERE potion_ID = ?`; 
  
          // Run the 1st query
          db.pool.query(queryUpdatePotion, [potion_effect, potion_color, potion_price, potion_name], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.send(rows);
              }
  
  })});

app.get('/books', function(req, res)
    {
        res.render('books');
    });

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