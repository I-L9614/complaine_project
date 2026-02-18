import { getMongoDbConnection } from "../db/connect.js"
const db = await getMongoDbConnection()
const collection = db.collection('complaints')

export async function insertComplaint(req, res) {
    try {
        console.log('body: ', req.body)
        const { category, message } = req.body

        await db.collection('complaints')
            .insertOne({
                category, message,
                createdAt: new Date(),
            });

        res.status(201).json("add succes");
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'cannot create complaint' });
        }
        res.status(500).json({ error: error.message });
    }

}



export async function getAllComplains(req, res) {
    const complains = await collection.find({}).toArray()
    console.log(complains)
    res.send(complains)

}