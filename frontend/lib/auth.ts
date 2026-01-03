import {api} from "./api";

export async function loginUser(email: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
}


export async function registerUser(
  email: string,
  password: string,
  phone: string
) {
  const res = await api.post("/auth/register", {
    email,
    password,
    phone_number: phone,
  });

  return res.data;
}
