const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Mit Datenbank verbinden
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017'; // Zuweisung eines Ports zur Datenbank 
mongoClient.connect(); // Stellt Verbindung zur Datenbank her

