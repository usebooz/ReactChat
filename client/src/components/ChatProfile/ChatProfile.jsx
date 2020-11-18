import React from "react";

import { connect } from "react-redux";

import { getSelectedChat } from "../../actions";

import UserCard from "../User/UserCard/UserCard.jsx";

class ChatProfile extends React.Component {
    render() {
        return (
            UserCard(this.props.chat)
        );
    }
}

const mapStateToProps = (state) => ({
    chat: getSelectedChat(state),
})

export default connect(
    mapStateToProps,
)(ChatProfile);
