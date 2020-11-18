import React from "react";
import { Card } from "primereact/card"

export default function UserCard(user) {
    const header = (
        <img
            alt={user.userName}
            src={user.userPhoto}
            className="p-p-4"
        />
    );
    const footer = (
        <span>
        </span>
    );
    return (
        <Card
            title={user.userName}
            subTitle={user.bot ? "Bot" : "User"}
            footer={footer}
            header={header}
            className="p-h-content-m p-rounded-0 p-border-top-0 p-border-right p-border-left p-border-bottom"
        >
            <p className="p-m-0">{user.userAbout}</p>
        </Card>
    );
}