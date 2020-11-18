import React from "react";

import { connect } from "react-redux";

import UserCard from "../User/UserCard/UserCard.jsx";

class UserProfile extends React.Component {
    render() {
        return (
            UserCard(this.props.user)
        );
    }
}

const mapStateToProps = ({ usersReducer }) => ({
    user: usersReducer.user
})

export default connect(mapStateToProps)(UserProfile);