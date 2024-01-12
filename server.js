import express from "express"
import ProdcutManager from "./components/ProdcutManager.js"
import { error } from "console";
import { read } from "fs";

const app = express()

app.use(express.urlencoded({extended :true}));

const prod = new ProdcutManager();
const readProducts = prod.readProducts();

app.get("/products", async (req, res)=> {
  let limit = parseInt(req.query.limit);
  if(!limit) return res.send(await readProducts)
  let allProduct = await readProducts
  let productLimit =  allProduct.slice(0,limit)
  res.send(productLimit)
});

app.get("/products/:id", async (req, res)=>{
    let id = parseInt(req.params.id);
    let allProduct = await readProducts;
    let productById = allProduct.find(product => product.id === id)
    res.send(productById)
});

const port = 8080;
const server = app.listen(port,()=>{
    console.log(`Express por Local Host ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error del servidor ${error}`))