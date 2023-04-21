# Todo List App MySQL as a database.

## Working video of this application: [Click Here](https://drive.google.com/file/d/1k2eRw5i5JjfxuUrvxFl5Ak92iW6DNBhc/view?usp=share_link).

<hr>

## Features of this app:

- User can **add a task** in the given form.
- Once the user adds the tasks, all of them will be appended one below another in a form of unordered list.
- The database/ storage method used in the app is MySQL Database using **MySQL XAMPP server via phpMyAdmin**.
- User can **delete a particular task** by clicking on the delete/trash Icon next to every task in the todolist. Accordingly our database will also get updated.

<hr>

## How to run this project on your local system?

1. Go to the **"frontend"** folder, open the frontend folder in an integrated terminal and run command **`npm install`** to install all the dependencies.'

2. Now to run the fronted on your local system, run the command **`npm start`**. Your app will now be running on **localhost:3000** in your browser.

3. Now go to the **"backend"** folder and open it in another integrated terminal, and run the command **`npm install`** again to install the backend dependencies.

4. You'll need to create a MySQL database in your local system. Here if you don't want to disturb code you can create database like this:
   - Database Name: **todolist_database**
   - Table Name: **todolist_table**
   - Table should have two colums with name **todo_id** and **todo_name**.
5. And run **`node server.js`** in the same terminal.

<br>

Here's the code for creating the above database to run the app:

- First run this command to create a database:
  **`CREATE DATABASE todolist_database`**
- Then create table and columns with following commands:

```
  CREATE TABLE todolist_table(
  todo_id INT NOT NULL AUTO_INCREMENT,
  todo_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(todo_id)
  )
```
