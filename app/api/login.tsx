import { setCookie } from "cookies-next"; // Install this package
import axios from "axios";
import toast from "react-hot-toast";

export const handleLogin = async (data: any, setLoading: any) => {
  setLoading(true);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      data
    );
    const { token, user } = response.data;
    setCookie("token", token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    toast.success("Login successful");
    if (user.role === "superAdmin") {
      window.location.href = "/dashboard/stats";
    } else {
      window.location.href = "/";
    }
    setLoading(false);
  } catch (error: any) {
    toast.error(error.response.data.message);
    setLoading(false);
  }
};
