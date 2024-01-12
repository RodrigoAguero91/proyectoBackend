
import{promises as fs} from "fs"


export default class ProdcutManager{
    constructor(){
        this.patch = "./productos.json"
        this.product = []
    }

    static id = 0




    addProduct = async (title,description,price,imagen,code ,stock) => {
        
        ProdcutManager.id++
        
       let newProduct = {
        title,
        description,
        price,
        imagen,
        code,
        stock,
        id: ProdcutManager.id
       };

       this.product.push(newProduct)
   
        
        await fs.writeFile(this.patch, JSON.stringify(this.product));
    };

    readProducts = async () =>{
        let resp = await fs.readFile(this.patch, "utf-8")
        console.log(JSON.parse(resp))
    }

    getProducts = async () => {
        let res2 = await this.readProducts()
       return console.log(res2)
    }

    getProductById = async (id) =>{
        let res3 = await this.readProducts()
        if (!res3.find((product) => product.id === id)) {
            console.log("Producto no encontrado");
        } else {
            console.log(res3.find((product)=> product.id === id));
        }

       
    };

    deleteProductById = async (id) => {
        let res3 = await this.readProducts();
        let prodFilter = res3.filter(products => products.id !=id)
        await fs.writeFile(this.patch, JSON.stringify(prodFilter));
        console.log("Producto eliminado");
    };


    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductById(id);
        let productoId = await this.readProducts();
        let prodModificado = [{...producto, id}, ...productoId];
        await fs.writeFile(this.patch, JSON.stringify(prodModificado));

    };
}

//const prod = new ProdcutManager();


//prod.addProduct("Remera","azul",20000,"","as40",9)
//prod.addProduct("Gorra","blanca", 6000,"","as41",7)
//prod.addProduct("campera","Cuero", 60000,"","as42",5)
//prod.addProduct("Remera","blanca",20000,"","as43",7)
//prod.addProduct("Gorra","Roja", 6000,"","as41",7)
//prod.addProduct("campera","Jean", 50000,"","as44",5)
//prod.addProduct("Remera","Amarilla",20000,"","as45",6)
//prod.addProduct("Gorra","Violeta", 6000,"","as46",4)
//prod.addProduct("campera","modal", 60000,"","as47",5)
//prod.addProduct("campera","Polar", 40000,"","as48",10)



