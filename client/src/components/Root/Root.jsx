import React from "react";

import { Switch, Route, Redirect } from "react-router";

import { connect } from "react-redux";

import App from "../App/App.jsx";
import Login from "../Login/Login.jsx";

class Root extends React.Component {

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path='/'
                    render={
                        (props) => this.props.user
                            ? <Redirect to={`/${this.props.user.userId}/`} />
                            : <Redirect to="/login" />
                    }
                />
                <Route
                    exact
                    path='/login'
                    component={Login}
                />
                <Route
                    exact
                    path='/:userId/'
                    component={App}
                    render={
                        (props) => !this.props.user
                            ? <Redirect to="/login" />
                            : <App {...props} />
                    }
                />
                <Route
                    exact
                    path='/:userId/chat/:chatId'
                    render={
                        (props) => !this.props.user
                            ? <Redirect to="/login" />
                            : <App {...props} />
                    }
                />
            </Switch>
        )
    }

}

const mapStateToProps = ({ usersReducer, chatsReducer }) => ({
    user: usersReducer.user,
    chats: chatsReducer.chat
})

export default connect(mapStateToProps)(Root);