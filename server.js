const api = require('./Routes/api') ;
const api2 = require('./Routes/api2);
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
    let Nome = req.query.query
    let Cpf = req.query.qtype

    try {
        const {data} = await  Api.post('/cliente',{
            qtype: Cpf,
            query: Nome.replace(/ /g,'%'),
            oper: 'L',
            page: numberPage,
            rp: qtdItens,
            sortname: `cliente.razao`,
            sortorder: 'asc',

        }, {headers: {ixcsoft: "listar"}})

        const {data: data1} = await  Api2.post('/cliente',{
            qtype: Cpf,
            query: Nome,
            oper: 'L',
            page: numberPage,
            rp: qtdItens,
            sortname: 'cliente.razao',
            sortorder: 'asc',

        }, {headers: {ixcsoft: "listar"}})


        //somaTotal somando os dois total das api
        const somaTotal = data.total + data1.total;

        // condição para procurar resultado nos dois registros
        let Date1 = data.registros;
        let Date2 = data1.registros;

        if (Date1 === undefined) {
            Date1 = [];
        }else{
            //Loop inserindo indetificação aos clientes para separar a plataforma que o mesmo esta.
            for(let i = 0; i<data.registros.length; i++) {
                let Univ = data.registros[i].plataforma = 'U';
            }
        }
        if(Date2 === undefined) {
            Date2 = [];
        }else{
            //Loop inserindo indetificação aos clientes para separar a plataforma que o mesmo esta.
            for(let i = 0; i<data1.registros.length; i++) {
                let Clic = data1.registros[i].plataforma = 'C';
            }
        }

        // result está juntando as duas chaves registros das api
        const result = [...Date1, ...Date2];



        // result.sort mostra clientes na ordem do nome nao por plataforma.
        result.sort(function (a, b){
            if(a.razao > b.razao){
                return 1;
            }
            if(a.razao < b.razao){
                return -1;
            }
             return 0;
        })

          // resultado passando novo valor para suas devidas chaves
        const resultado = {total: somaTotal, registros:result};

        // res.json return final.
        return res.json(resultado)({name: resultado.name });

    }      catch (error){
           res.send({error: error.message});
    }

});
