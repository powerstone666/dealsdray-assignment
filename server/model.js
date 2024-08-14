import mysql from 'mysql2'
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
    host :process.env.DB_HOST,
    port :process.env.DB_PORT,
    user :process.env.DB_USER,
   password : process.env.DB_PASSWORD,  // Replace with the actual password
   database : process.env.DB_NAME
}).promise();

export async function  getEmail(email)
{
    try{
        const [row]=await pool.query("SELECT * FROM t_login WHERE s_username=?",[email])
        return row[0];
    }
    catch(err)
    {
     
    }
}

export async function  getad(id)
{
    try{
        const [row]=await pool.query("SELECT * FROM t_no WHERE id=?",[id])
        return row;
    }
    catch(err)
    {
       
    }
}


export async function getUser()
{
    try{
        const [row] = await pool.query("SELECT * FROM t_employee")
        console.log(row
        )
return row;
    }
    catch(err)
    {
        
    }
}

export async function addUser(name,email,no,designation,course,gender)
{
    try{
const [row]=await pool.query("INSERT INTO t_employee (f_name,f_email,f_mobile,f_designation,f_course,f_gender) VALUES(?,?,?,?,?,?)",[name,email,no,designation,course,gender])
return row;
    }
    catch(err)
    {
        console.log(err)
    }
}

export async function  getEmail2(email)
{
    try{
        const [row]=await pool.query("SELECT * FROM t_employee WHERE f_email=?",[email])
        return row[0];
    }
    catch(err)
    {
     
    }
}
export async function  getid(id)
{
    try{
        const [row]=await pool.query("SELECT * FROM t_login WHERE s_id=?",[id])
        return row;
    }
    catch(err)
    {
       
    }
}
export async function deleteUser(id) {
    try {
        const [row] = await pool.query("DELETE FROM t_employee WHERE f_id=?", [id])
        return row;
    }
    catch (err) {

    }
}
export async function viewUser(id) {
    try {
        const [row] = await pool.query("SELECT * FROM t_employee WHERE f_id=?", [id])
        
        return row;
    }
    catch (err) {

    }
}
export async function edit(id, name, email, no, designation, course, gender) {
    try {
        const [row] = await pool.query(
            "UPDATE t_employee SET f_name=?, f_email=?, f_mobile=?, f_designation=?, f_course=?, f_gender=? WHERE f_id=?",
            [name, email, no, designation, course, gender, id]
        );
        return row;
    } catch (err) {
        console.error("Error updating employee:", err);
        throw err; // Re-throw the error so it can be handled by the caller
    }
}
export async function getName() {
    try {
        const [row] = await pool.query("SELECT s_username FROM t_login")
        return row[0];
    }
    catch (err) {

    }
}