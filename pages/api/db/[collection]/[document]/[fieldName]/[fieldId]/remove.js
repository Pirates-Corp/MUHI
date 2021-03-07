export default async (req, res) => {    
    console.log(req.query)
    res.statusCode = 200
    res.send("Sub Field - Remove")
}
