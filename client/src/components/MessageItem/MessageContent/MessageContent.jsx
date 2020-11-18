import React from "react";

export default function MessageContent(message, onClickClose) {
    return (
        <div className="p-d-flex p-hover-visible">
            <span className="p-as-center p-mr-2 p-py-2">{message.messageText}</span>
            <div className="p-d-flex p-flex-column p-ai-end">
                {onClickClose ?
                    <i
                        className="pi pi-times p-invisible p-link p-mb-2"
                        onClick={(e) => { onClickClose(message) }}
                        style={{ fontSize: "0.75rem" }}></i>
                    :
                    null
                }
                {message.userId === message.senderId && message.status === "READ" ?
                    <i className="pi pi-check " style={{ fontSize: "0.75rem" }}></i> :
                    null
                }
                {message.userId === message.senderId && message.status === "SENT" ?
                    <i className="pi pi-clock " style={{ fontSize: "0.75rem" }}></i> :
                    null
                }
            </div>
        </div>
    );
}