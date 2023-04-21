var express = require("express");
var app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3200;

app.use(cors());
//  Creating my app with MySQL using MySQL XAMPP server via phpMyAdmin
// to run this application on your system you'll need to create a similar database in your local system
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist_database", //Name of my database.
});
app.use(express.json());

connection.connect((err) => {
  if (err) {
    return console.log(err.message, "(Database not connected)");
  } else {
    console.log("Database connected Succesfully!");

    // Making POST request to server Database
    app.post("/db", (req, res) => {
      const { todo_name } = req.body;

      //todo_id is set as AUTO_INCREMENT PRIMARY KEY in MySQL Database.
      //So that ID will keep on incrementing.
      const sql = `INSERT INTO todolist_table (todo_name) VALUES (?)`; //my table name is "todolist_name"
      connection.query(sql, [todo_name], (err, results) => {
        if (err) {
          return res.status(500).send(`404 Server Error ${err}`);
        }
        // console.log("Data sent Succesfully!");
        res.json(results);
      });
    });

    //Making GET request from server database
    app.get("/db/get", (req, res) => {
      connection.query(
        "SELECT * FROM todolist_table",
        (err, results, fields) => {
          res.json({ data: results });
          // console.log("Data recieved Succesfully!");
          return;
        }
      );
    });

    //Performing DELETE request to server database
    app.delete("/db/:id", (req, res) => {
      const { id } = req.params;
      const del = `DELETE FROM todolist_database.todolist_table WHERE todo_id = ?`;
      connection.query(del, [id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        // console.log(`Todo item Deleted Succesfully !`);
        res.json(results);
      });
    });
  }
});

app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
