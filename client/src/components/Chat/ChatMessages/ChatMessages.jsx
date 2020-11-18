import React from "react";

import { connect } from "react-redux";

import { ScrollPanel } from "primereact/scrollpanel";

import { getSelectedChat, deleteMessage } from "../../../actions";

import MessageItem from "../../MessageItem/MessageItem.jsx";
import { confirm } from "../../ConfirmDialog/ConfirmDialog.jsx";

class ChatMessages extends React.Component {
    scrollToBottom = () => {
        this.lastMessage && this.lastMessage.scrollIntoView({ behavior: "smooth" });
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate(props) {
        this.scrollToBottom();
    }
    render() {
        const messages = [];
        if (this.props.chat.messages.length) {
            this.props.chat.messages.forEach(message => {
                let justify = "end";
                let severity = "info";
                if (message.senderId === this.props.chat.userId) {
                    justify = "start";
                    severity = "dark";
                }
                messages.push(
                    <div
                        key={message.messageId}
                        ref={(el) => this.lastMessage = el}>
                        <MessageItem
                            message={message}
                            justify={justify}
                            severity={severity}
                            onClickClose={async (message) => {
                                if (await confirm("Delete message?"))
                                    this.props.deleteMessage(message);
                            }}
                        />
                    </div >
                );
            });
        }
        return (
            <ScrollPanel className="p-h-content-s">
                {messages}
            </ScrollPanel>
        );
    }
}

const mapStateToProps = (state) => ({
    chat: getSelectedChat(state),
})

export default connect(
    mapStateToProps,
    { deleteMessage }
)(ChatMessages);