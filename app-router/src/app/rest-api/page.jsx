import axios from "axios";
import { useEffect, useState } from "react";

export default async function Axios() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001");
        setUsers(res.data);
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
  });

  console.log(users);

  return (
    <>
      <h1>axios</h1>
      {users.map((user, id) => {
        return (
          <div key={id}>
            <h2>{user.id}</h2>
            <h2>{user.name}</h2>
            <h2>{user.title}</h2>
            <h2>{user.body}</h2>
          </div>
        );
      })}
    </>
  );
}
