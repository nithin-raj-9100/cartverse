// // First, ensure you have initialized your Supabase client
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// const supabaseUrl =
//   "https://ccqcamfmjefdacrdjhxj.supabase.co/storage/v1/object/public/";
// const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "your-anon-key"; // Replace with your actual key
// const supabase = createClient(supabaseUrl, supabaseKey);

// async function getAllUrlsFromBucket(bucketName) {
//   const { data, error } = await supabase.storage.from(bucketName).list("", {
//     limit: 1000,
//     offset: 0,
//     sortBy: { column: "name", order: "asc" },
//   });

//   console.log(`Listing files in ${bucketName}...`);
//   console.log(`data is ${data}, error is ${error}`);

//   if (error) {
//     console.error("Error fetching files:", error);
//     return [];
//   }

//   // Map the data to get the public URLs
//   const urls = data.map((file) => {
//     return supabase.storage.from(bucketName).getPublicUrl(file.name).publicURL;
//   });

//   return urls;
// }

// // Usage
// getAllUrlsFromBucket("testing-bucket").then((urls) => {
//   console.log("All URLs:", urls);
// });

const checking = async () => {
  const supabaseUrl = "https://ccqcamfmjefdacrdjhxj.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "your-anon";
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Supabase Key:", process.env.SUPABASE_SERVICE_KEY);

  const { data, error } = await supabase.storage.listBuckets();

  console.log(JSON.stringify(data, null, 2));

  console.log(`Listing buckets...`);
  console.log(`data is ${data}, error is ${error}`);

  console.log("Checking Supabase...");

  // const { data, error } = await supabase.storage.getBucket("testing-bucket");

  console.log(`Listing files in ${data}...`);
  console.log(`data is ${data}, error is ${error}`);
};

checking();
