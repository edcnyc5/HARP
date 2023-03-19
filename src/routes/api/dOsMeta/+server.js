// Imports your configured client and any necessary S3 commands.
import { ListObjectsCommand, S3 } from "@aws-sdk/client-s3";
// import { s3Client } from "./path/to/s3Client.js";


// import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://fra1.digitaloceanspaces.com",
    region: "fra1",
    credentials: {
    //   accessKeyId: Platform.env.VITE_SPACES_KEY,
    //   secretAccessKey: Platform.env.VITE_SPACES_SECRET
      accessKeyId: import.meta.env.VITE_SPACES_KEY,
      secretAccessKey: import.meta.env.VITE_SPACES_SECRET
    }
});

// export { s3Client };



// Specifies a path within your bucket, e.g. example-bucket-name/example-directory.
// export const bucketParams = { Bucket: "zaudio" };
const bucketParams = { Bucket: "zaudio" };

// Returns a list of objects in your specified path.
// export const run = async () => {
export async function POST(req){
    let body = await req.request.json();
    // console.log('called post body:', body);
    let metaData = [];

    // const firstFunc = (c) => {
    //     // body.Contents.forEach(c => {
    //         if(c.Key.includes('Song')){
    //             // console.log('c: ',c);
    //             s3Client.headObject({ Bucket: "zaudio", Key: c.Key }, function(err, data) {
    //                 if (err) console.log(err, err.stack);
    //                 else {
    //                     // console.log('data:', data);
    //                     // let testOne = test(data);
    //                     metaData.push(data);
    //                     if(metaData.length > 417){
    //                         console.log('size: ', metaData.length);
    //                         return new Promise(metaData);
    //                     }
    //                 }
    //             });
    //         }
            
    //     // });
    // };

    // const secondFunc = async () => {
    //     const result = await Promise.all(
    //     console.log('result?:', result);
    //     return new Response(await JSON.stringify(result));
    // }
    // secondFunc();

    for await (const i of body.Contents.filter(c => c.Key.includes('Song'))){
        let meta = await s3Client.headObject({ Bucket: "zaudio", Key: i.Key });
        // console.log('meta: ', meta);
        metaData.push(meta);
    }

    // console.log('metaData: ', metaData);
    return new Response(JSON.stringify(metaData));



    // try {
    //     data.Contents.forEach(e => {
    //         s3Client.headObject({ Bucket: "zaudio", Key: e.Key }, function(err, data) {
    //             if (err) console.log(err, err.stack);
    //             else {
    //                 // console.log('data:', data);
    //                 let testOne = test(data);
    //                 if (testOne != null){
    //                     return new Response(JSON.stringify(respData));
    //                 };
    //             }
    //         });
    //     });
        
    //     // return new Response(JSON.stringify(data));
    // } catch (err) {
    //     console.log("Error", err);
    // }
};


// run();
