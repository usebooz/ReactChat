import React from "react";

import { Sidebar } from "primereact/sidebar";

import ChatHeader from "./ChatHeader/ChatHeader.jsx";
import ChatMessages from "./ChatMessages/ChatMessages.jsx";
import ChatControl from "./ChatControl/ChatControl.jsx";
import ChatProfile from "../ChatProfile/ChatProfile.jsx";

export default class Chat extends React.Component {

    state = {
        visibleChatProfile: false,
    }

    render() {
        return (
            <React.Fragment>
                <ChatHeader onShowChatProfile={() => this.setState({ visibleChatProfile: true })} />
                <ChatMessages />
                <ChatControl />
                <Sidebar
                    baseZIndex={1000000}
                    position="right"
                    visible={this.state.visibleChatProfile}
                    onHide={() => this.setState({ visibleChatProfile: false })}
                    className="p-p-0 p-border-0 p-w-25"
                >
                    <ChatProfile />
                </Sidebar>
            </React.Fragment>
        );
    }

}    