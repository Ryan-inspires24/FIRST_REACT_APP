import React from 'react';
import DefaultPage from './DefaultPage';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import './Users.css';
import { useEffect } from 'react';

async function fetchUsers() {
    const response = await fetch('https://RyanInspires.pythonanywhere.com/api/vendors');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}
function Users() {
  const navigate = useNavigate();
  const loggedInUsername = localStorage.getItem("username");

  useEffect(() => {
    if (!loggedInUsername) {
      navigate("/login");
    }
    else {
        navigate("/users");
    }
  }, [loggedInUsername, navigate]);

  const { data = [], error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: !!loggedInUsername,
  });

  const filteredUsers = data.filter(user => user.username !== loggedInUsername);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <DefaultPage>
      <h1>View other user profiles</h1>
      <ul className="user-list">
        {filteredUsers.map(user => (
          <li
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
            className="user-item"
          >
            <img
              src={user.profile_picture || "https://placekitten.com/60/60"}
              alt={`${user.username}'s profile`}
              className="user-avatar"
            />
            <div className="user-info">
              <h3>{user.username}</h3>
              <p>{user.description || "No description available"}</p>
            </div>
          </li>
        ))}
      </ul>
    </DefaultPage>
  );
}

export default Users;
