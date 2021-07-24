const api = require('./Routes/api') ;
const express = require('express');
const cors = require('cors');



const server = express();
const PORT = process.env.PORT || 8000;

server.use(cors());
server.use(express.json());
//server.use(api);



server.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`⚡[server]: Server rodando na Porta: ${PORT}`);
});
server.get("/", (req, res)=>{
    return res.send({message: "Davi Fernando Rosa"});
});

server.get("/cliente", async (req, res)=>{
    let numberPage = req.query.page
    let qtdItens = req.query.rp
    try {
        const {data} = await api.post('/cliente',{

            qtype: 'cliente.razao',
            query: '0',
            oper: '>',
            page: numberPage,
            rp: qtdItens,
            sortname: 'cliente.razao',
            sortorder: 'asc'

        }, {headers: {ixcsoft: "listar"}})

                return res.json(data)({name: data.name });



    } catch (error){
        res.send({error: error.message});
    }

});





