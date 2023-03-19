// import { createRequire } from 'module';
// import { createRequire } from './module';
// const require = createRequire(import.meta.url);
import axios from "axios";
import  nodeFetch  from "node-fetch";
// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "<COLLECTION_NAME>",
//     "database": "<DATABASE_NAME>",
//     "dataSource": "harp1",
//     "projection": {
//         "_id": 1
//     }
// });
            
// var config = {
//     method: 'post',
//     url: 'https://data.mongodb-api.com/app/data-ztkrx/endpoint/data/v1/action/findOne',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//     //   'api-key': 'YiYfRxFFV2EUmyEYVkWNddi75LjDfIJsCW0S5tgIvRGQjkkJlbKO4pEe0cihqp87',
//       'api-key': import.meta.env.VITE_ATLAS_KEY,
//       'Accept': 'application/ejson'
//     },
//     data: data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });


// // W I T H  D B  D E F I N E D

// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "<COLLECTION_NAME>",
//     "database": "harp",
//     "dataSource": "harp1",
//     "projection": {
//         "_id": 1
//     }
// });
            
// var config = {
//     method: 'post',
//     url: 'https://data.mongodb-api.com/app/data-ztkrx/endpoint/data/v1/action/findOne',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//     //   'api-key': 'YiYfRxFFV2EUmyEYVkWNddi75LjDfIJsCW0S5tgIvRGQjkkJlbKO4pEe0cihqp87',
//       'api-key': import.meta.env.VITE_ATLAS_KEY,
//       'Accept': 'application/ejson'
//     },
//     data: data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });


// W I T H  D B  &  C O L L  D E F I N E D

// var axios = window.require('axios');
var data = JSON.stringify({
    "dataSource": "harp1",
    "database": "harp",
    "collection": "songs",
    "filter": {
        "type": "Songs"
    }
    // "projection": {
    //     "_id": 1
    // }
});

export async function GET(){
//    try {
        let url = import.meta.env.VITE_ATLAS_EP + '/action/find';
        // console.log(url);
        var config = {
            method: 'POST',
            // url: 'https://data.mongodb-api.com/app/data-ztkrx/endpoint/data/v1/action/findOne',
            // url: import.meta.env.VITE_ATLAS_EP + '/action/findOne',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            //   'api-key': 'YiYfRxFFV2EUmyEYVkWNddi75LjDfIJsCW0S5tgIvRGQjkkJlbKO4pEe0cihqp87',
            'api-key': import.meta.env.VITE_ATLAS_KEY,
            'Accept': 'application/ejson'
            },
            // data: data
            body: data
        };
    try{
        // const data = await axios(config);
        const data = await nodeFetch(url, config);
//        console.log('data:', await data.json());
        const response = await data.json();
        // axios(config)
        //     .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // return new Response(JSON.stringify(response.data));
        return new Response(JSON.stringify(response));
    } catch (err) {
        console.log("Error", err);
    }
};