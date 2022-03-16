const mssql = require('mssql');
const { createDbConnection } = require('../utils/db-utilis')

const messageModel = {
    getAll: async () => {
        const db = await createDbConnection();
        const result = await db.query('SELECT * FROM Message');
        db.close();
        console.log(result.recordset);
         return result.recordset;
    },

    insert: async ({ pseudo,content}) => {
        let db;
        try {
            db = await createDbConnection();
            const querySQL = 'INSERT INTO Message (Pseudo, Content)'
                            +' OUTPUT inserted.MessageId'  //pour recupere un id par exemple
                            + ' VALUES (@pseudo, @content)';
    
            const request = new mssql.Request();
            request.input('pseudo',mssql.NVarChar, pseudo)
            request.input('content', mssql.NVarChar, content) //Pour avoir un code bien structurer ou on specifie le type de variable a renvoyer
                                        
            const result = await request.query(querySQL)
            db.close();
    
            return result.recordset[0].MessageId;
        } 
        finally {
            db?.close();  //if(db) {db.close()}
        }

    }   

}    

module.exports = messageModel;