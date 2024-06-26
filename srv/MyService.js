const cds = require("@sap/cds");
const { employees } = cds.entities("anubhav.db.master");

module.exports = (srv) => {
 
    //implementation of service - DPC extension
    srv.on('hello', (req,res) => {
        return "Hello " + req.data.name + " welcome to cap";
    });

    //replcaing standard behaviour of cap
    srv.on("READ","ReadEmployeeSrv", async (req,res) => {

        const tx = cds.tx(req);
        let data = await tx.run(SELECT.from(employees).limit(5).where({

            "bankName" : "My Bank of Antioch"
        }));

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            element.nameMiddle = element.nameFirst + " " + element.nameLast;             
        }
        return data;
        // return{
        //     "ID":"dummmy",
        //     "nameFirst":"Saurabh",
        //     "nameLast":"Goel"
        // };
    });
 
}