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
export async function GET(){
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    // console.log("Success", data);
    // console.log('data from DO: ', data);
    // let songsDO = JSON.parse(body);
    // return data;
    // return new Response(JSON.stringify(body));
    return new Response(JSON.stringify(data));
  } catch (err) {
    console.log("Error", err);
  }
};

// run();
