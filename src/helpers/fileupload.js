import * as axiosURLS from "./endpoints";
import api from "./api";
const fileapi= ()=> {
    async function getSignedURI(file) {
      try {
        const {data} = await api.get(`${axiosURLS.BASE_URL+axiosURLS.FILEUPLOAD}?name=${file.name}&type=${file.type}`);
      
        return data.signedRequest;
      } catch (error) {
        throw error;
      }
    }

    async function uploadToS3(url, file) {
      const requestOptions = {
        method: "PUT",
        body: file,
        redirect: "follow",
      };
      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          console.log({ response, url });
          throw new Error("unable to upload to s3");
        }
      } catch (error) {
        throw error;
      }
    }

    async function upload(file,headers) {
      try {
        const signedURI = await getSignedURI(file,headers);
        await uploadToS3(signedURI, file);
        const { origin, pathname } = new URL(signedURI);
        return `${origin}${pathname}`;
      } catch (error) {
        throw error;
      }
    }

    return {
      upload,
    };
  }
export default fileapi;