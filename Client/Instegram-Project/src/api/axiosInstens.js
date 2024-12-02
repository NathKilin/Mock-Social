import axios from "axios";

const cookies = document.cookie.split("; ");
const tokenCookie = cookies.find((cookie) => cookie.startsWith("jwt"));
const token = tokenCookie?.split("=")[1];

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
