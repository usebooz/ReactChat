import React from "react";

export default function UserListItem(user, onClickClose) {
    return (
        <div
            className="p-d-flex p-h-100 p-w-100 p-hover-visible">
            <img
                alt={user.userName}
                src={user.userPhoto}
                className="p-mr-2 p-rounded-circle p-h-list-icon"
            />
            <div className="p-py-2 p-mw-75">
                <h4 className="p-mt-0 p-mb-2">{user.userName}</h4>
                <p className="p-my-0 p-text-ellipsis p-white-space-wrap p-overflow-hidden">{user.lastMessage}</p>
            </div>
            <div className="p-ml-auto p-py-2 p-text-center">
                {onClickClose ?
                    <i
                        className="pi pi-times p-invisible p-link p-ml-auto p-mb-2"
                        onClick={(e) => { e.stopPropagation(); onClickClose(user) }}
                    ></i> :
                    null
                }
                {user.unreadCount ? <span className="p-badge p-d-block">{user.unreadCount}</span> : null}
            </div>
        </div>
    );
}