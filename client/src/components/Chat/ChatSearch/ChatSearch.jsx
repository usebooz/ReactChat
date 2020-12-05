import React from "react";

import { connect } from "react-redux";

import { ListBox } from "primereact/listbox";

import { getSelectedChat, scrollToMessage } from "../../../actions";

class ChatSearch extends React.Component {
    render() {
        const messageItem = (message) => (
            <div className={`p-d-flex p-jc-${message.senderId === message.userId ? 'end' : 'start'}`}>
                <div className="p-mw-75 p-break-all">{message.messageText}</div>
            </div>
        );
        return (
            <ListBox
                options={this.props.chat.messages}
                onChange={(e) => {
                    this.props.onMessageSelect();
                    this.props.scrollToMessage(e.value);
                }}
                filter
                filterPlaceholder="Search"
                optionLabel="messageText"
                optionValue="messageId"
                itemTemplate={messageItem}
                className="p-h-content-m p-rounded-0 p-border-top-0"
                listClassName="p-p-0"
            />
        );
    }
}

const mapStateToProps = (state) => ({
    chat: getSelectedChat(state),
})

export default connect(
    mapStateToProps,
    { scrollToMessage }
)(ChatSearch);