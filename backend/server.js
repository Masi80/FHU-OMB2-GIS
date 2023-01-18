const http = require('http');
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Mit Datenbank verbinden
const mongodb = require('mongodb');
var url = "mongodb://127.0.0.1:27017/";
const mongoClient = new mongodb.MongoClient(url);

// Datenbank- & Collections-Informationen
const einLisDb = mongoClient.db('Einkaufslisten-Datenbank');
const speissCol = mongoClient.db('Speißen-Datenbank').collection('Speißen-Collection');
const wocPlaCol = mongoClient.db('Wochenplan-Datenbank').collection('Wochenplan-Collection');

var aktuelleDb;
var aktuelleCollection;

async function startServer() {
    await mongoClient.connect();  // Stellt Verbindung zur Datenbank her
    // listen for requests
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler
    const url = new URL(request.url || '', `http://${request.headers.host}`);
    const id = url.searchParams.get('id');
    const itemCollection = mongoClient.db('freezer').collection('item');
    switch (url.pathname) {

        case '/einkaufslisteErstellen':
            if(request.method === 'POST') {
                let jsonString = '';
                request.on('data', (data) => {
                    jsonString += data;
                });
                
                request.on('end', () => {
                    document = JSON.parse(jsonString);
                    einLisDb.createCollection(document.Einkaufslistenname);
                });

                console.log("Collection/Einkaufslisten erfolgreich erstellt!");
            }
        break;

        case '/einkaufslistenAnzeigen':
            var collections = await einLisDb.listCollections().toArray();
            response.write(JSON.stringify(collections));
        break;

        case '/einkaufslisteLoeschen':
            if(id){
                console.log(einLisDb.collection(id));
                await einLisDb.collection(id).drop(function(err, delOK) {
                    if (err) throw err;
                    if (delOK) console.log("Collection gelöscht")
                })
            }
        break;

        
        // Einkauflisten-Einträge

        case '/einkaufslistenEintragErstellen':
            console.log(id);
            if(request.method === 'POST') {
                let jsonString = '';
                request.on('data', (data) => {
                    jsonString += data;
                });
                console.log(jsonString);
                
                request.on('end', () => {
                    document = JSON.parse(jsonString);
                    einLisDb.collection(id).insertOne(document);
                });
            }
        break; 

        case '/einkaufslistenEintraegeHolen':
            if(id){
                // Gibt alles zurück, was sich in dieser Collection befindet
                var einLisEintraege = await einLisDb.collection(id).find({}).toArray();
                //console.log("getItems", items)
                response.write(JSON.stringify(einLisEintraege));
            }
        break;

        case '/einkaufslisteEintragLoeschen':
            if(request.method === 'POST') {
                let jsonString = '';
                request.on('data', (data) => {
                    jsonString += data;
                });
                request.on('end', () => {
                    document = JSON.parse(jsonString);
                    console.log("Dokument-ID: " + document.ID);
                    if(document.ID){ // update
                        einLisDb.collection(document.KategorieCollection).deleteOne({
                            _id: new mongodb.ObjectId(document.ID),
                        })
                    }
                });
            }

          //console.log("deleteItem", id);
          /*if(id){
            console.log("/n ID: " + id + "/n")
              result = await itemCollection.deleteOne({
                  _id: new mongodb.ObjectId(id), // von Zahl zu MongoDB ID Objekt konvertieren
              });
          }*/
        break;


      case '/setItem':
          if(request.method === 'POST') {
              let jsonString = '';
              request.on('data', (data) => {
                  jsonString += data;
              });
              request.on('end', () => {
                  document = JSON.parse(jsonString);
                  if(document._id){ // update
                      //console.log("update", newItem);
                      document._id = mongodb.ObjectId(document._id); // von Zahl zu MongoDB ID Objekt konvertieren
                      aktuelleCollection.replaceOne({
                          _id: document._id,
                      },
                      document);
                  }
                  else{ // add
                      //console.log("insert", newItem);
                      // 
                      aktuelleCollection.insertOne(document);
                  }
              });
            }
          break;

    case '/getItems':
    // Gibt alles zurück, was sich in dieser Collection befindet
        let items = await itemCollection.find({}).toArray();
        //console.log("getItems", items)
        response.write(JSON.stringify(items));
        break;

    case '/getItem':
        if(id){
            let items = await itemCollection.find({
                _id: new mongodb.ObjectId(id), // von Zahl zu MongoDB ID Objekt konvertieren
            }).toArray();
            //console.log("getItem", items[0]);
            response.write(JSON.stringify(items[0]));
        }
        break;

      case '/removeItem':
          //console.log("deleteItem", id);
          if(id){
              result = await itemCollection.deleteOne({
                  _id: new mongodb.ObjectId(id), // von Zahl zu MongoDB ID Objekt konvertieren
              });
          }
          break;
      default:
          response.statusCode = 404;
    }
    response.end();
  });

startServer();