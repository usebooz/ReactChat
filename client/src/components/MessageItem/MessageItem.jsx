import React from "react";
import { Message } from "primereact/message";
import MessageContent from "./MessageContent/MessageContent.jsx";

export default class MessageItem extends React.Component {
    render() {
        let classSeverity;
        switch (this.props.severity) {
            case "dark":
                classSeverity = "p-bg-dark p-color-light";
                break;
        }
        return (
            <div className={`p-px-3 p-py-2 p-d-flex p-jc-${this.props.justify} p-w-100`} >
                <Message
                    sticky={true}
                    content={MessageContent(this.props.message, this.props.onClickClose)}
                    severity={classSeverity ? "" : this.props.severity}
                    className={classSeverity + " p-mw-75"}
                />
            </div>
        );
    }
}