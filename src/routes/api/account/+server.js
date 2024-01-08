import { json, text } from "@sveltejs/kit";
// const bcrypt = require("bcrypt");
import { hash, compare } from "bcrypt";


var db = {
    "dataSource": "harp1",
    "database": "harp",
    "collection": "users",
    // "filter": {
    //     // "type": "Songs"
    // }
    // "projection": {
    //     "_id": 1
    // }
};
// var db = JSON.stringify({
//     "dataSource": "harp1",
//     "database": "harp",
//     "collection": "users",
//     "filter": {
//         // "type": "Songs"
//     }
//     // "projection": {
//     //     "_id": 1
//     // }
// });


// export async function GET(req){
//     console.log('GET req: ', req);
//     db.filter = {
//         "email": req.email,
//         "pass": req.pass
//     };
// //    try {
//         let url = import.meta.env.VITE_ATLAS_EP + '/action/find';
//         // console.log(url);
//         var config = {
//             method: 'POST',
//             // url: import.meta.env.VITE_ATLAS_EP + '/action/findOne',
//             headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Request-Headers': '*',
//             'api-key': import.meta.env.VITE_ATLAS_KEY,
//             'Accept': 'application/ejson'
//             },
//             // data: data
//             body: JSON.stringify(db)
//         };
//     try{
//         // const data = await axios(config);
//         const data = await fetch(url, config);
// //        console.log('data:', await data.json());
//         const response = await data.json();
//         // axios(config)
//         //     .then(function (response) {
//         //         console.log(JSON.stringify(response.data));
//         //     })
//         //     .catch(function (error) {
//         //         console.log(error);
//         //     });
//         // return new Response(JSON.stringify(response.data));
//         return new Response(JSON.stringify(response));
//     } catch (err) {
//         console.log("Error", err);
//     }
// };

// /** @type {import('./$types').RequestHandler}*/
export async function POST(req) {
    db = {
        "dataSource": "harp1",
        "database": "harp",
        "collection": "users",
        // "filter": {
        //     // "type": "Songs"
        // }
        // "projection": {
        //     "_id": 1
        // }
    };
    const data = await req.request.json();
    console.log('data: ', data);
    let existing = false;
    let passValid = false;
    let hashBrowns;

    let startUrl = import.meta.env.VITE_ATLAS_EP +  '/action/findOne';//TODO find the right EP
    var startConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': import.meta.env.VITE_ATLAS_KEY,
            'Accept': 'application/ejson'
        },
        body: JSON.stringify({
            "dataSource": "harp1",
            "database": "harp",
            "collection": "users",
            "filter": {
                "email": data.email
            }
            // "projection": {
            //     "_id": 1
            // }
        })
    }

    try {
        const firstData = await fetch(startUrl, startConfig);
        const firstResponse = await firstData.json();
        console.log('first response:', firstResponse);
        if(firstResponse.document != null && firstResponse.document._id){
            console.log('USER ALREADY EXISTS');
            existing = true;
            hashBrowns = firstResponse.document.pass;
        } else if(firstResponse.document == null) {
            console.log('USER DOES NOT EXIST YET');
            existing = false;  
            // return new Response(JSON.stringify({error: 'USER DOES NOT EXIST YET'}));
        } else if(firstResponse == null){
            return new Response(JSON.stringify({error: 'USER NOT FOUND'}));
        }
        // return new Response(JSON.stringify(response));
    } catch (error) {
        console.log('error: ', error);
        return new Response(JSON.stringify(error));
    }




    let action;


    console.log('data: ', data);

    if(data.email && !data.first && existing){
            db.filter = {
            "email": data.email
        };
        // compare(data.pass, hashBrowns, function(err, result){
        //     if (result){
        //         console.log('result: ', result);
        //         passValid = true;
        //     } else {
        //         console.log('err: ', err);
        //         passValid = false;
        //         return new Response(JSON.stringify({error: 'WRONG PASSWORD'}));
        //     }
        // }).then()
        // action = 'findOne';
        // const check = await wrapFunc();
        // console.log('check: ', check);
        // return new Response(JSON.stringify(await wrapFunc()));
        return new Response(JSON.stringify(await compare(data.pass, hashBrowns).then(result => {
            passValid = true;
            action = 'findOne';
        }).then(() => wrapFunc()).catch(err => {
            console.log('compare err:', err);
        })));
    }
    else if(data.email && data.first && existing){
        return new Response(JSON.stringify({error: 'User already exists!'}));
    }
    else if(data.email && !data.first && !existing){
        return new Response(JSON.stringify({error: 'User not found!'}));
    }
    else if(data.email && !existing){
        // hash(data.pass, 10, function(err, hash) {
        //     if(hash){
        //         hashBrowns = hash;
        //         console.log('hashBrowns:', hashBrowns);
        //         passValid = true;
        //         // data.pass = hashBrowns;
        //         db.document = data;
        //         db.document.pass = hashBrowns;
        //         action = 'insertOne';
        //         console.log('db: ', db);
        //     } else
        //         return new Response(JSON.stringify({error: 'ERROR WITH BROWNS:' + err}));
        // }).then
        return new Response(JSON.stringify(await hash(data.pass, 10).then(hash => {
                db.document = data;
                db.document.pass = hash;
                passValid = true;
                action = 'insertOne';
                console.log('db: ', db);
            }).then(() => wrapFunc())
            // .then(res => Promise.resolve({
            //     data: res.json(),
            //     status: res.status
            // }))
            .catch(err => {
                console.log('hash err:', err);
            }) ))
        // return new Response(JSON.stringify({document: {insertedId: true, email: data.email, first: data.first, last: data.last}}));
    }
    
    async function wrapFunc() {
        console.log('modified db: ', db);
        let url = import.meta.env.VITE_ATLAS_EP +  '/action/' + action;//TODO find the right EP
        var config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': import.meta.env.VITE_ATLAS_KEY,
                'Accept': 'application/ejson'
            },
            body: JSON.stringify(db)
        }
    
        console.log('url: ', url);
        console.log('config: ', config);
        try {
            const data = await fetch(url, config);
            const response = await data.json();
            if(passValid)
                return Promise.resolve(response);
                // return new Response(JSON.stringify(response));
            else
                return new Response(JSON.stringify({error: 'WRONG PASS'}));
        } catch (error) {
            console.log('error: ', error);
            return new Response(JSON.stringify(error));
        }
    }

}