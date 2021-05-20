import React from 'react';

const TextContainer = ({ users }) => (
    <div className="users-container">
        {
            users
                ? (
                    <div>
                        <h3>Current users</h3>
                        <div className="active-users-container">
                            <div>
                                {users.map(({ name }) => (
                                    <div key={name} className="active-user">
                                        {name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
                : null
        }
    </div>
);

export default TextContainer;