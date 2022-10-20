import  express from "express"
import router from "./routes/index.js"
import db from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()
console.log(process.env.DB_HOST)

const app = express()

//CONECTAR BASE DE DATOS

db.authenticate()
    .then(()=> console.log("Base de datos conectada"))
    .catch(error=>console.log(error))

//DEFINO PUERTO

const port = process.env.PORT || 4000

//HABILITAR PUG
app.set("view engine", "pug")

//HABILITAR AÑO
app.use((req, res, next)=>{
    const year = new Date
    res.locals.actualYear = year.getFullYear()
    res.locals.nombreSitio = "Agencia de Viajes"
    next()
})

//PARSE DEL BODY FORM

app.use(express.urlencoded({extended: true}))
//AGREGAR ROUTER
app.use("/", router)

//AGREGAR EL PUBLIC STATIC

app.use(express.static("public"))





app.listen(port, ()=>{
    console.log(`el servidor esta en funcionamiento en el puerto ${port}`)
})

