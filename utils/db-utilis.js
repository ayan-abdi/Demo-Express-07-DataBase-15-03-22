const mssql = require('mssql');

const connectionString = process.env.DB_CONNECTIONSTRING;


/**
 * Methode permettant de creer une connexion vers la DB
 * @returns {Promise<mssql.ConnectionPool} la connexion pool
 */
const createDbConnection = async () => {
    const db = await mssql.connect(process.env.DB_CONNECTIONSTRING);
    return db;
};

// Methode pour controler si avant lancement de mon server si tout fonctionne parfaitement
const testDbConnection = async () => {
        try {
            const dbtest = await createDbConnection();
            dbtest.close();
            console.log('COUCOU ♥');
        }
        catch (error) {
            console.error(error);
            process.exit();
        }
};

module.exports = {
    createDbConnection,
    testDbConnection
};