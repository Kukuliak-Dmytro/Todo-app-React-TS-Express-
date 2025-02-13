import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// a pool of connections instead of a connection each time a request is made
const dbPool= mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // async version
}).promise()

async function getItems(){
    // the response comes as a giant array of rows
    // the result is the first element of the array
    //destructuring is used
    const [rows]= await dbPool.query(`select * from todoItems`)
    return rows
}

async function getItemById(id){
    // prevent SQL injection
    const [rows]= await dbPool.query(`select * from todoItems where id=?`, [id])
    return rows[0]
}

async function addItem(item){
    //prevent SQL injection
    const [result]= await dbPool.query(`insert into todoItems (title, content)
         values (?,?)`, [item.title, item.content])
    // upon creation, you dont get the item back, just the id,
    // so you need to query the item back
    return (await getItemById (result.insertId))
}

async function updateItem(id, item){
    const oldItem= await getItemById(id)
    const newItem={
        title: item.title || oldItem.title,
        content: item.content || oldItem.content,
        isCompleted: item.isCompleted || oldItem.isCompleted,
        isFailed: item.isFailed || oldItem.isFailed,
    }
    //prevent SQL injection
    await dbPool.query(`update 
        todoItems set title=?, content=?, isCompleted=?, isFailed=? 
        where id=?`, 
        [newItem.title, newItem.content, newItem.isCompleted, newItem.isFailed, id])

    return (await getItemById(id))
}

async function deleteItem(id){
    const item= await getItemById(id)
    //prevent SQL injection
    await dbPool.query(`delete from todoItems where id=?`, [id])
    return item
}


export {getItems, getItemById, addItem, updateItem, deleteItem}