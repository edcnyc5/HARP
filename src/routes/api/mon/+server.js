// import { createRequire } from 'module';
// import { createRequire } from "./module";
// const require = createRequire(import.meta.url);
// const csvtojson = window.require('csvtojson');
import csvtojson from csvtojson;


export async function GET(){
    try {
        let ps = encodeURIComponent('password');

        let dbConn;
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://"+import.meta.env.MON_USR+":"+import.meta.env.MON_PS+"@harp1.e2fhbtk.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://eldulcecantor:"+ps+"@harp1.e2fhbtk.mongodb.net/?retryWrites=true&w=majority";
// console.log('uri: ', uri);
// let enURI = encodeURIComponent(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const client = new MongoClient(enURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log('client:', client);

async function run() {
    try {
        const pause = await client.connect();

        const database = client.db('harp');
        console.log('database: ', database);
        const coll = database.collection('songs');
        console.log('coll:', coll);

        // CSV file name
        const fileName = "./static/mID-2023-0318.csv";
        console.log('fileName:', fileName);
        var arrayToInsert = [];
        csvtojson().fromFile(fileName).then(source => {
            // Fetching the all data from each row
            for (var i = 0; i < source.length; i++) {
                var oneRow = {
                    mid: source[i]['mid'],
                    etag: source[i]['etag'],
                    type: source[i]['type'],
                    church: source[i]['church'],
                    year: source[i]['year'],
                    title: source[i]['title'],
                    singer1: source[i]['singer1'],
                    singer2: source[i]['singer2'],
                    singer3: source[i]['singer3'],
                    singer4: source[i]['singer4'],
                    singer5: source[i]['singer5'],
                    poet1: source[i]['poet1'],
                    poet2: source[i]['poet2'],
                    poet3: source[i]['poet3']
                };
                arrayToInsert.push(oneRow);
            }
            console.log('arrayToInsert: ', arrayToInsert);
            //inserting into the table “employees”
            // var collectionName = 'songs';
            // var collection = dbConn.collection(collectionName);
            coll.insertMany(arrayToInsert, (err, result) => {
                if (err) console.log(err);
                if(result){
                    console.log('Import CSV into database successfully.');
                    return Response(JSON.stringify(result));
                }
            });
        });


    } finally {
        //await client.close();
    }
}

run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("harp").collection("songs");
//   console.log('collection:', collection);
//   // perform actions on the collection object
//     // CSV file name
//         const fileName = "%sveltekit.assets%/mID-2023-0318.csv";
//         console.log('fileName:', fileName);
//         var arrayToInsert = [];
//         csvtojson().fromFile(fileName).then(source => {
//             // Fetching the all data from each row
//             for (var i = 0; i < source.length; i++) {
//                 var oneRow = {
//                     mid: source[i]['mid'],
//                     etag: source[i]['etag'],
//                     type: source[i]['type'],
//                     church: source[i]['church'],
//                     year: source[i]['year'],
//                     title: source[i]['title'],
//                     singer1: source[i]['singer1'],
//                     singer2: source[i]['singer2'],
//                     singer3: source[i]['singer3'],
//                     singer4: source[i]['singer4'],
//                     singer5: source[i]['singer5'],
//                     poet1: source[i]['poet1'],
//                     poet2: source[i]['poet2'],
//                     poet3: source[i]['poet3']
//                 };
//                 arrayToInsert.push(oneRow);
//             }
//             console.log('arrayToInsert: ', arrayToInsert);
//             //inserting into the table “employees”
//             // var collectionName = 'songs';
//             // var collection = dbConn.collection(collectionName);
//             collection.insertMany(arrayToInsert, (err, result) => {
//                 if (err) console.log(err);
//                 if(result){
//                     console.log('Import CSV into database successfully.');
//                     return Response(JSON.stringify(result));
//                 }
//             });
//         });
//   client.close();
// });

    } catch (err) {
        console.log("Error", err);
      }

}