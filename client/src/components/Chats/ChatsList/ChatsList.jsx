import React from "react";

import { connect } from "react-redux";

import { ListBox } from "primereact/listbox";

import { selectChat, unselectChat, deleteChat, getUserChats } from "../../../actions";

import userListItem from "../../User/UserListItem/UserListItem.jsx";
import { confirm } from "../../ConfirmDialog/ConfirmDialog.jsx"

class ChatsList extends React.Component {

    handleChatChange = (event) => {
        if (event.value) {
            this.props.selectChat(event.value)
        } else {
            this.props.unselectChat()
        }
    }

    handleDeleteChat = async (user) => {
        await confirm(`Delete chat with "${user.userName}"?`) && this.props.deleteChat(user.userId);
    }

    render() {
        return (
            <ListBox
                value={this.props.chatId}
                options={this.props.chats}
                onChange={this.handleChatChange}
                filter
                filterPlaceholder="Search"
                optionLabel="userName"
                optionValue="userId"
                itemTemplate={(user) => userListItem(user, this.handleDeleteChat)}
                className="p-h-content-m p-rounded-0 p-border-top-0"
            />
        );
    }
}

const mapStateToProps = (state) => ({
    chats: getUserChats(state),
    chatId: state.chatsReducer.chatId
})

export default connect(
    mapStateToProps,
    { selectChat, unselectChat, deleteChat }
)(ChatsList);