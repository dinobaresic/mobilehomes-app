import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
});

console.log("🔗 API URL:", process.env.NEXT_PUBLIC_API_URL);


export const registerUser = (data: {
  name: string; email: string; password: string; role: "CAMPER"|"OWNER";
}) => API.post("/users/register", data).then(r => r.data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post("/users/login", data).then(r => r.data);



export const uploadParcelImage = async (parcelId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await API.post(`/parcels/upload-image/${parcelId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  };
  