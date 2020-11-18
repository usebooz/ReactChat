import React from "react";

import { connect } from "react-redux";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { logIn } from "../../actions";

class Login extends React.Component {
    state = {
        userId: "",
        password: "",
    }
    handleLogIn = () => {
        this.props.logIn({
            userId: this.state.userId,
            password: this.state.password,
        });
    }
    render() {
        const userHelp = this.props.error.userInvalid &&
            <small id="userid-help" className="p-invalid p-d-block">Username is not available.</small>;
        const passHelp = this.props.error.passInvalid &&
            <small id="password-help" className="p-invalid p-d-block">Password is incorrect.</small>;
        return (
            <div className="p-grid p-align-center p-justify-center p-vh-100 p-m-0">
                <Card title="Sign in">
                    <div className="p-fluid">
                        <div className="p-field p-pt-2">
                            <span className="p-float-label">
                                <InputText
                                    id="userid"
                                    value={this.state.userId}
                                    onChange={(e) => this.setState({ userId: e.target.value })}
                                    aria-describedby="userid-help"
                                    className={userHelp ? "p-invalid" : ""}
                                    onKeyPress={(e) => { if (e.key === 'Enter') this.handleLogIn() }}
                                />
                                <label htmlFor="userid">Username</label>
                            </span>
                            {userHelp}
                        </div>
                        <div className="p-field p-pt-2">
                            <span className="p-float-label">
                                <Password
                                    id="Password"
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    aria-describedby="password-help"
                                    className={passHelp ? "p-invalid" : ""}
                                    onKeyPress={(e) => { if (e.key === 'Enter') this.handleLogIn() }}
                                />
                                <label htmlFor="Password">Password</label>
                            </span>
                            {passHelp}
                        </div>
                        <Button
                            type="button"
                            label="Log In"
                            onClick={this.handleLogIn}
                        />
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = ({ usersReducer }) => ({
    error: usersReducer.error
})

export default connect(
    mapStateToProps,
    { logIn }
)(Login);