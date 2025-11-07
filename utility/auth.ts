import { getCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  const token = getCookie("token");
  if (!token) return null;

  try {
    const user = jwtDecode(token as string);
    console.log("user", user);
    return user;
  } catch {
    return null;
  }
};

export const logout = () => {
  deleteCookie("token");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  return !!getCookie("token");
};

export const isAdmin = () => {
  const user = getUser();
  console.log("user", user);
  return (user as any).data?.role === "superAdmin";
};
