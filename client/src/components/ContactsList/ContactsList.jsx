import React from "react";

import { connect } from "react-redux";

import { ListBox } from "primereact/listbox";

import { createChat, selectChat } from "../../actions";

import userListItem from "../User/UserListItem/UserListItem.jsx";

class ContactsList extends React.Component {

    handleContactChange = (event) => {
        this.props.createChat(event.value);
        this.props.onContactSelect();
    }

    render() {
        return (
            <ListBox
                options={this.props.contacts}
                onChange={this.handleContactChange}
                filter
                filterPlaceholder="Search"
                optionLabel="userName"
                optionValue="userId"
                itemTemplate={(contact) => userListItem({ ...contact, lastMessage: contact.bot ? "Bot" : "User" })}
                className="p-h-content-m p-border-top-0 p-rounded-0"
            />
        );
    }
}

const mapStateToProps = ({ contactsReducer }) => ({
    contacts: contactsReducer.contacts
})

export default connect(
    mapStateToProps,
    { createChat, selectChat }
)(ContactsList);