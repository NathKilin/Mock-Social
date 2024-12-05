import axios from "axios";

const getAuthTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("jwt"));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};
const token = getAuthTokenFromCookie();

const usersCliant = axios.create({
  baseURL: "http://localhost:3000/api/user",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const postsCliant = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const commentsCliant = axios.create({
  baseURL: "http://localhost:3000/api/comments",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const likesCliant = axios.create({
  baseURL: "http://localhost:3000/api/likes",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export { usersCliant, postsCliant, commentsCliant, likesCliant };
