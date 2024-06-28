const db = require('../config/database');

exports.createDB = async (req,res)=>{
    let q = 'CREATE DATABASE tudolist';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("DB created");
    })
}

exports.createTable = async(req,res)=>{
    let q = 'CREATE TABLE todolist1(id int AUTO_INCREMENT, Name VARCHAR(255), Date_added DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id))';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("TABLE CREATED");
    });
}

exports.createEntry = async(req,res)=>{

    const q = "INSERT INTO todolist1 SET ?";

    const { Name } = req.body;

    db.query(q, { Name, lastName }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
}