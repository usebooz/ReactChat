import React from "react";

import { Sidebar } from "primereact/sidebar";

import ChatsHeader from "./ChatsHeader/ChatsHeader.jsx";
import ChatsList from "./ChatsList/ChatsList.jsx";
import ContactList from "../ContactsList/ContactsList.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";

export default class Chats extends React.Component {
    state = {
        visibleUserProfile: false,
        visibleContactList: false,
    }
    render() {
        return (
            <React.Fragment>
                <Sidebar
                    baseZIndex={1000000}
                    visible={this.state.visibleUserProfile}
                    onHide={() => this.setState({ visibleUserProfile: false })}
                    className="p-p-0 p-border-0 p-w-25"
                >
                    <UserProfile />
                </Sidebar>
                <Sidebar
                    baseZIndex={1000000}
                    visible={this.state.visibleContactList}
                    onHide={() => this.setState({ visibleContactList: false })}
                    className="p-p-0 p-border-0 p-w-25"
                >
                    <ContactList onContactSelect={() => this.setState({ visibleContactList: false })} />
                </Sidebar>
                <ChatsHeader
                    onShowUserProfile={() => this.setState({ visibleUserProfile: true })}
                    onShowContactList={() => this.setState({ visibleContactList: true })}
                />
                <ChatsList />
            </React.Fragment>
        );
    }
} 