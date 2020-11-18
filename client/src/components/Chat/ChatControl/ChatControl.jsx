import React from "react";

import { connect } from "react-redux";

import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { getSelectedChat, inputMessage, sendMessage } from "../../../actions";

class ChatControl extends React.Component {
    handleSendMessage = () => {
        this.props.sendMessage();
    }
    componentDidUpdate() {
        this.inputMessage.element.focus();
    }
    render() {
        const chat = this.props.chat;
        let leftContents =
            <React.Fragment>
                <div className="p-inputgroup">
                    <InputText
                        ref={(input) => { this.inputMessage = input; }}
                        value={chat.message}
                        placeholder="Write a message..."
                        onChange={(e) => this.props.inputMessage(e.target.value)}
                        onKeyPress={(e) => { chat.message && e.key === 'Enter' && this.handleSendMessage() }}
                    />
                    <Button
                        icon="pi pi-reply"
                        onClick={(e) => this.handleSendMessage()}
                        disabled={chat.message ? false : true}
                    />
                </div>
            </React.Fragment>;
        return (
            <Toolbar
                left={leftContents}
                className="p-h-footer p-rounded-0 p-border-left-0"
            />
        );
    }
}

const mapStateToProps = (state) => ({
    chat: getSelectedChat(state)
})

export default connect(
    mapStateToProps,
    { inputMessage, sendMessage }
)(ChatControl);