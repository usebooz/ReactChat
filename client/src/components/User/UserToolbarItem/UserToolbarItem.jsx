import React from "react";

export default function UserToolbarItem(user, handleClick) {
    return (
        <div className="p-d-flex p-ai-center p-link p-h-100" onClick={handleClick}>
            <img
                alt={user.userName}
                src={user.userPhoto}
                className="p-mr-2 p-rounded-circle p-h-toolbar-icon"
            />
            <h5>{user.userName}</h5>
        </div>
    );
}