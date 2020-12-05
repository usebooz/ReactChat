import React from "react";

import { connect } from "react-redux";

import { ScrollPanel } from "primereact/scrollpanel";

import { getSelectedChat, deleteMessage } from "../../../actions";

import MessageItem from "../../MessageItem/MessageItem.jsx";
import { confirm } from "../../ConfirmDialog/ConfirmDialog.jsx";

class ChatMessages extends React.Component {
    state = {
        scrollMessage: null
    }
    scrollToBottom = () => {
        this.scrollMessage && this.scrollMessage.scrollIntoView({ behavior: "smooth" });
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate(props, state) {
        if (state.scrollMessage !== this.scrollMessage) {
            this.setState({ scrollMessage: this.scrollMessage })
        } else {
            this.scrollToBottom();
        }
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
                        ref={(el) => {
                            if (message.messageId === this.props.messageId)
                                this.scrollMessage = el;
                        }}>
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
    messageId: state.messagesReducer.messageId
})

export default connect(
    mapStateToProps,
    { deleteMessage }
)(ChatMessages);