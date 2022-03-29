const mssql = require('mssql');
const { createDbConnection } = require('../utils/db-utilis');
const{ messageMapper} = require('./mappers/message-mapper');

const messageModel = {
    getAll: async () => {
        const db = await createDbConnection();
        const result = await db.query('SELECT * FROM Message ORDER BY CreateDate DESC');
        // .query permet d'envoyer des requetes sur le serveur/injection de sql.
        // Requete simple auquel on interagit avec l'utilisateur on utilisera .query
        db.close();
        // console.log(result.recordset);
         return result.recordset.map(row => messageMapper(row));
    },

    getById: async () => {
        let db; 
        //  Requete SQL parametre
        try {
            const querySQL = 'SELECT * FROM MessageId WHERE MessageId = @id;';
            const request = new mssql.Request(db);
            request.input('Id', mssql.BigInt, id);
    
            // Execution de la requete
            const result= await request.query(querySQL)
       
            // dans le cas ou le model recoit un infos qui n'existe pas  il return null
            if(result.recordset.length !== 1) {
                return null;
            }
            return messageMapper(result.recordset[0]);
        }
        finally {
            db?.close();
        }

    },

    insert: async ({ pseudo,content }) => {
        let db;
        try {
            db = await createDbConnection();
            const querySQL = 'INSERT INTO Message (Pseudo, Content, CreateDate)'
                            + ' OUTPUT inserted.MessageId'  //pour recupere un id par exemple
                            + ' VALUES (@pseudo, @content, createDate)'; //
            // On inclu des infos dans ma table sql à savoir pseudo et content qui proviennent de mon formulaire
            const request = new mssql.Request(db);
            request.input('pseudo',mssql.NVarChar, pseudo)
            request.input('content', mssql.NVarChar, content) //Pour avoir un code bien structurer ou on specifie le type de variable a renvoyer
            request.output('createDate', mssql.DateTime2, new Date());  

            const result = await request.query(querySQL)
            return result.recordset[0]['MessageId'];
        } 
        finally {
            db?.close();  //if(db) {db.close()} dB? EXISTE
        }

    }   

}   
 

module.exports = messageModel;