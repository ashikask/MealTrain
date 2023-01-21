//params (input file imageInput.files[0])
//returns the image URL that the image is saved at

export const imageUpload = async (file) => {
  // get secure url from our server
  const { url } = await fetch(
    "http://localhost:3000/mealtrain/util/s3Url"
  ).then((res) => res.json());
  console.log("url to be uploaded at: " + url);

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });

  const imageUrl = url.split("?")[0];
  console.log("check image upload complete at : " + imageUrl);

  // post requst to my server to store any extra data
  return imageUrl;
};
