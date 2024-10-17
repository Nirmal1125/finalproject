const { getConnectedClient } = require("../database"); // Corrected the path

const getCollecttion = () => {
    const client = getConnectedClient(); // Get the connected client
const collection =client.db("vibezdb").collection("vibez");
return collection;
};

module.exports ={getCollecttion};