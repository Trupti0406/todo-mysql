var exp = require("express");
var app = exp();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());

/*This is a connection code of Database Connectivity,I am using MySQL as a database Through XAMPP server
 that's why My => user:root And password:"", I created "to_do" DATABASE in MySQL XAMPP server through phpMyAdmin.*/

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "to_do", //This Database is run on XAMPP server MySQL(phpMyAdmin)
});
app.use(exp.json());

connection.connect((err) => {
  if (err) {
    return console.log(err.message, "(Database not connected)");
  } else {
    console.log("Database connected Succesfully on XAMPP:[phpMyAdmin]", 3306);

    // Making POST request to server Database
    app.post("/db", (req, res) => {
      const { todo_name } = req.body;

      //todo_id is set as AUTO_INCREMENT PRIMARY KEY in MySQL Database.
      const sql = `INSERT INTO to_do_list (todo_name) VALUES (?)`;
      connection.query(sql, [todo_name], (err, results) => {
        if (err) {
          return res.status(500).send(`404 Server Error/No-Connection ${err}`);
        }
        console.log("Data Posted");
        res.json(results);
      });
    });

    //Making GET request from server database
    app.get("/db/get", (req, res) => {
      conn.query("SELECT * FROM to_do_list", (err, results, fields) => {
        res.json({ data: results });
        console.log("data received");
        return;
      });
    });

    //Performing DELETE request to server database
    app.delete("/db/:id", (req, res) => {
      const { id } = req.params;
      const del = `DELETE FROM to_do.to_do_list WHERE todo_id = ?`;
      conn.query(del, [id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        console.log(`Task Deleted Succesfully !`);
        res.json(results);
      });
    });
  }
});

app.listen(3200, () => {
  console.log("server is running on ", 3200);
});
