import React, { useEffect, useState } from 'react';
import '../detailedUser.css';
import DefaultPage from '../DefaultPage';
import { useParams } from 'react-router-dom';

function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://ryaninspires.pythonanywhere.com/api/vendor/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading user profile...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No user found.</p>;

    return (
        <DefaultPage>
                <h1 className="profile-header">View {user.username}'s User Profile</h1>
            <div className="profile-container">
                <div className="profile-image-wrapper">
                    {user.profile_picture ? (
                        <img
                            src={user.profile_picture}
                            alt={`${user.username} profile`}
                            className="profile-picture"
                        />
                    ) : (
                        <div className="profile-placeholder">
                            {user.username}
                        </div>
                    )}
                </div>

                <div className="profile-info">
                    <h1 className="username">{user.username}</h1>
                    <p className="email">
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p className="description">
                        {user.description || 'No description provided.'}
                    </p>
                </div>
            </div>
        </DefaultPage>

    );
}

export default UserProfile;
