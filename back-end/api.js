import express from 'express';
import cors from 'cors';
import { getItems, getItemById, addItem, updateItem, deleteItem } from './database.js';

const app = express();

//middleware for cors and json headers
app.use(cors());
app.use(express.json());

//welcome
app.get('/', async (_, res) => {
    res.send({ message: 'Go to /items to see the list of items' })
})

//Read
app.get('/items', async (_, res) => {
    const items = await getItems();
    res.send(items);
});
app.get('/items/:id', async (req, res) => {
    const item = await getItemById(req.params.id);
    if (item) {
        res.send(item);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

//Create
app.post('/items', async (req, res) => {
    const item = await addItem(req.body);
    res.status(201).send(item);
});

//Update
app.put('/items/:id', async (req, res) => {
    const item =await  getItemById(req.params.id);
    if (item) {
        res.send(await updateItem(req.params.id, req.body));
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

//Delete
app.delete('/items/:id', async (req, res) => { 
    const item = await getItemById(req.params.id);
    if (item) {
        res.send(await deleteItem(req.params.id));
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ message: 'Internal Server Error' })
    next()
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});