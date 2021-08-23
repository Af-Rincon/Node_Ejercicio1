const fs = require("fs");

const axios = require("axios");

const http = require("http");

const path = require('path');

module.exports = {
    buildPathHtml: path.resolve('./build.html'),
    buildPathPdf: path.resolve('./build.pdf')
 };
 
 http.createServer((req,respuesta)=>
 {
     if(req.url==="/api/proveedores")
     {
        fs.readFile("proveedor.html","utf-8", (err,data)=>
        {
            if(err){
                console.log(err);
            }          
            axios.get("https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json").then((res) =>
            { 
                let x = "";

                res.data.forEach(element => {     
                    x += datosProveedores(element);
                });
               
               let index = data.indexOf("</tbody>");

               let final = data.substr(0,index)+x+data.substr(index);
               
               respuesta.write(final);
             
           }).catch(err => console.error(err));
        });
    }
    if(req.url==="/api/clientes")
     {
         fs.readFile("cliente.html","utf-8", (err,data)=>{
             if(err){
                 console.log(err);
             }
             
             axios.get("https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json").then((res) =>{ 
                 let x = "";

                 res.data.forEach(element => {
                    x += datosClientes(element);                  
                });
                 
                let index = data.indexOf("</tbody>");
                let final = data.substr(0,index)+x+data.substr(index);
           

                respuesta.write(final);
                
            });
        });
    }
 }).listen(8081);


 const datosClientes = (info) => `  
        <tr>
            <td> <b>${info.idCliente}</b></td>
            <td>${info.NombreCompania}</td>
            <td>${info.NombreContacto}</td>
        </tr>   
`;

const datosProveedores = (info) => ` 
        <tr>
            <td><b>${info.idproveedor}</b></td>
            <td>${info.nombrecompania}</td>
            <td>${info.nombrecontacto}</td>
        </tr>
`;
 
     
