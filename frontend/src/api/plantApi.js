import axios from "axios";

const API_URL = "http://localhost:8082/api/plants";

export const analyzePlant = async (imageFile) => {

  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await axios.post(
    `${API_URL}/analyze`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};