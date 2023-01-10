// Step 1: Import the S3Client object and all necessary SDK commands.
import { ListObjectsCommand, PutObjectCommand, S3, S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';


// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
    endpoint: "https://fra1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
    region: "fra1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
      accessKeyId: "5OHC6PFHY4QN2QISB6IJ", // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: import.meta.env.VITE_SPACES_SECRET // Secret access key defined through an environment variable.
    }
});

export var singerData = [];
export var dataFinalETag = [];
export var dataFinalSinger = [];
let singerData2 = {};
export var helpString = '';



// const conf = new Config({
//   accessKeyId: "5OHC6PFHY4QN2QISB6IJ",
//   secretAccessKey: import.meta.env.VITE_SPACES_SECRET,
//   region: "fra1"
// });


// Step 3: Define the parameters for the object you want to upload.
// const params = {
  //   Bucket: "zaudio", // The path to the directory you want to upload the object to, starting with your Space name.
  //   Key: "Test/hello-world.txt", // Object key, referenced whenever you want to access this file later.
  //   Body: "Hello, World!", // The object's contents. This variable is an object, not a string.
  //   ACL: "private", // Defines ACL permissions, such as private or public.
  //   Metadata: { // Defines metadata tags.
  //     "x-amz-meta-name": "test-file for-my own purposes"
  //   }
  // };
  
  export const bucketParams = {
    Bucket: "zaudio"
  };
  
  // export const params = {
  //   Bucket: "zaudio",
  //   Key: "Songs/TZ/2020/Jehova-Shalom"
  // }

  export var params = {};
  export var eleLength = 0;

    
  const command = new HeadObjectCommand(params);
    

// Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
// export const uploadObject = async () => {
//   try {
//     const data = await s3Client.send(new PutObjectCommand(params));
//     console.log(
//       "Successfully uploaded object: " +
//         params.Bucket +
//         "/" +
//         params.Key
//     );
//     return data;
//   } catch (err) {
//     console.log("Error", err);
//   }
// };


// export const run = async () => {
//     try {
//       const res = await s3Client.send(new ListObjectsCommand(bucketParams));
//       // console.log("Success", res);
//       // const test = await data.json();
//       return {
//         body: JSON.stringify(res)
//       }
//     } catch (err) {
//       console.log("Error", err);
//     }
//   };

// const test = async () => await data.Contents.forEach(song => {
//   if(song.Key.includes('Songs') && song.Key.substring(song.Key.length-1, song.Key.length) != "/") {
//     params = {
//       Bucket: "zaudio",
//       Key: song.Key
//     }
    
//     const response = async () => await s3Client.send(command);
//     let mdata =  JSON.stringify(response);
//     console.log('mdata: ', mdata);
//   }
// });

const test = async (ind) => {
  try {
    if(ind < eleLength - 1){
      const response = await s3Client.send(command);
      let mdata = JSON.stringify(response);
      singerData.push(mdata);
      return response;
      // console.log('mdata: ', mdata);
    }
  } catch (error) {
    console.log('errorHomie: ', error);
  }
};

// async function test2() {
//   return new Promise((resolve, reject) => {
//     // if (singerData.length == eleLength - 1) {
//     if (singerData.length == eleLength - 1) {
//       console.log('singerData2: ', singerData2);
//       resolve(data)
//     } else {
//       reject('I told you it would not work')
//     }
//   })
// };

function addData(respo){
  const songETag = respo.ETag ? respo.ETag : null;
  return new Promise((resolve, reject) => {
    if (songETag) {
      dataFinalETag.push(songETag);
      // console.log(respo.Metadata);
      dataFinalSinger.push(respo.Metadata);
      resolve()
    } else {
      reject('no ETag for this one')
    }
  })
}

let didThisWork;

export async function get()
{
  try{
  const resp = await s3Client.send(new ListObjectsCommand(bucketParams));
  // const r = await resp.json();
  // let newObj = {};
  for (const Contents in resp) {
    if (Object.hasOwnProperty.call(resp, Contents)) {
      const element = resp[Contents];
      if (element && element.length > 0 && element[0].Key != null){
        eleLength = element.length;
        // element.forEach((e, index) => {
        //   // console.log('e.Key: ', e.Key);
        //   Object.assign(params, { Bucket: "zaudio", Key: e.Key });
        //   test(index)
        //   .then((r) => addData(r))
        //   // .then(() => console.log('dataFinalETag.length: ', dataFinalETag.length))
        //   // .then(() => console.log('dataFinalSinger.length: ', dataFinalSinger.length))
        //   .then(() => helpString = JSON.stringify(dataFinalETag) + JSON.stringify(dataFinalSinger))
        //   .then(() => assignresp1(resp))
        //   .then(() => assignresp2(dataFinalETag, dataFinalSinger))
        //   .then((stringySongs) => finalReturn(stringySongs))
        //   .catch((err) => console.log('err: ', err));
          // console.log('params: ', params);
          

          // const doodoo = s3Client.send(new HeadObjectCommand({Bucket: "zaudio", Key: element.Key}));
          // console.log('doo: ', doodoo);          
          
          // const indMetadata = async () => {
          //   try {
          //     const doodoo = await s3Client.send(new HeadObjectCommand({Bucket: "zaudio", Key: e.Key}));
          //     console.log('doo: ', doodoo);
          //     return {
          //       body: JSON.stringify(doodoo)
          //     }
          //   } catch (err) {
          //     console.log("error: ", err)
          //   }
          // } 
          
          
          // console.log('indMetadata: ', indMetadata);
          // Object.assign(newObj, { [e.Key]: indMetadata});
        // });

        // Object.assign(singerData2, {singerData : singerData});
        // test2()
        // .then(() => console.log('data', data))
        // .catch((err) => console.log(err));


        


      } 
      // if (element){
      //   console.log('elementK:');
      //   // console.log('indMetadata: ', indMetadata);
      //   Object.assign(newObj, { [element.Key]: indMetadata});
      // } else {
      //   continue
      // }
    }
  }

  // } catch (errro) {
  //     console.log('errro: ', errro);
  // }


  // // console.log('newObj: ', newObj);
  // // let data = JSON.stringify(newObj);
  // function assignresp1(resp1) {
  //   const songs = resp1;
  //   return new Promise((resolve, reject) => {
  //     if (songs) {
  //       Object.assign(singerData2, {test1: resp1});
  //       // console.log(singerData2);
  //       resolve()
  //     } else {
  //       reject('no songlist')
  //     }
  //   })
  // }
  // function assignresp2(resp2, resp3) {
  //   const songETags = resp2;
  //   const songMeta = resp3;
  //   return new Promise((resolve, reject) => {
  //     if (songETags.length > 822 && songMeta.length > 822) {
  //       Object.assign(singerData2, {test2: resp2});
  //       Object.assign(singerData2, {test3: resp3});
  //       // console.log(singerData2);
  //       resolve(JSON.stringify(singerData2))
  //     } else {
  //       reject('no meta')
  //     }
  //   })
  // }
  // console.log('singerData2:', singerData2);

  
  // function getfTData(sD2){
  //   const fTData = sD2;
  //   return new Promise((resolve, reject) => {
  //     if (fTData) {
  //       resolve(fTData)
  //     } else {
  //       reject('no fTData avail')
  //     }
  //   })
  // }
  
  // Object.assign(data, {test: res});

  // new Promise((res, rej) => {
  //   res([singerData, resp]);
  // }).then(([singerData, resp]) => {
  //   console.log(singerData, resp);
  // })

  



  // console.log('data: ', data);
  console.log('resp: ', resp);
  console.log('resp(object): ', new Response(resp.Contents));


  return new Response(resp.Contents);
  // return {
  //   body: resp
  // }

  // function finalReturn(returnString) {
  //   const responsi = returnString;
  //   return new Promise((resolve, reject) => {
  //     if (responsi) {
  //       // console.log(singerData2);
  //       return {body: resolve(returnString)};
  //     } else {
  //       reject('no responsi')
  //     }
  //   })
  // }

} catch (error) {
  console.log('error', error);
}}

// let data7;

// export async function finalReturn(returnString) {
//   // console.log('returnString', returnString);
//   try{
//     const responsi = returnString;
//     data7 = JSON.stringify(responsi);
//     if (responsi){
//       return {body: JSON.parse(returnString)}
//     }
//   } catch (poop){
//     console.log('poop: ', poop)
//   }
  
// }


// Step 5: Call the uploadObject function.
// uploadObject();

// run();