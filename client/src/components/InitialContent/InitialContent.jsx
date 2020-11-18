import React from "react";
import MessageItem from "../MessageItem/MessageItem.jsx";

export default function InitialContent() {
    return (
        <div className="p-d-flex p-ai-center p-h-100" >
            <MessageItem
                message={{ messageText: "Please select a chat to start messaging" }}
                severity="dark"
                justify="center"
            />
        </div>
    )
}