const connection = require('../config/database');

exports.createDB = async (req,res)=>{
    let q = 'CREATE DATABASE tudolist';
    connection.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("DB created");
    })
}

exports.createTable = async(req,res)=>{
    let q = 'CREATE TABLE (id int AUTO_INCREMENT, Name VARCHAR(255), Date_added DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id))';
    connection.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("TABLE CREATED");
    });
}

exports.createEntry = async(req,res)=>{

    const q = "INSERT INTO crude_table SET ?";

    const { Name } = req.body;

    connection.query(q, { Name}, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({
            success:true,
            message:"Data Entry Added Successfully",
            result
        });
    });
}

exports.showAllEntries = (req, res) => {
    const q = "SELECT * FROM crude_table";

    connection.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
};

exports.getEntryById = (req, res) => {

    const {id} = req.params;
    const q = `SELECT * FROM crude_table WHERE ID=${id}`;

    connection.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
};

exports.deleteEntry = (req,res)=>{
    const {id} = req.params;

    const q = `DELETE FROM crude_table WHERE ID=${id}`

    connection.query(q,(err,result)=>{
        if(err){
            return res.json(err);
        }
        return res.status(200).json({
            success:true,
            result
        })

    });

}

exports.editEntry = (req,res)=>{
    const {id} = req.params;
    const {Name} = req.body;

    const q = `UPDATE crude_table SET ? WHERE ID=${id}`

    connection.query(q, { Name }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({
            success:true,
            message:"Entry updated successfully",
            result

        });
    });

}

exports.searchEntries = (req,res)=>{
    const {Name} = req.params;

    const q = `SELECT * FROM crude_table WHERE Name=?`

    connection.query(q, [ Name] , (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({
            success:true,
            message:"Entry updated successfully",
            result

        });
    });

}