const mssql = require('mssql');

/**
 * Methode permettant de creer une connexion vers la DB
 * @returns {Promise<mssql.ConnectionPool} la connexion pool
 */
const createDbConnection = async () => {
    const db = await mssql.connect(process.env.DB_CONNECTIONSTRING);
    return db;
};

// Methode pour controler avant lancement de mon server si tout fonctionne parfaitement
const testDbConnection = async () => {
        try {
            const db = await createDbConnection();
            db.close();
            console.log('Connection DB ok ♥');
        }
        catch (error) {
            console.error('Connection DB Error');
           console.log(error.message);
        }
};

module.exports = {
    createDbConnection,
    testDbConnection
};