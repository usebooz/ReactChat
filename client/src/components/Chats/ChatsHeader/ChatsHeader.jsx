import React from "react";

import { connect } from "react-redux";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

import { logOut } from "../../../actions";

import UserToolbarItem from "../../User/UserToolbarItem/UserToolbarItem.jsx";
import { confirm } from "../../ConfirmDialog/ConfirmDialog.jsx";

class ChatsHeader extends React.Component {

    menuUserItems = [
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-id-card',
            command: this.props.onShowUserProfile
        },
        {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
            disabled: true,
        },
        {
            separator: true
        },
        {
            label: 'Log out',
            icon: 'pi pi-fw pi-power-off',
            command: async () => {
                if (await confirm("Are you sure you want to log out?"))
                    this.props.logOut();
            },
        }
    ]

    render() {
        const leftContents = (
            <React.Fragment>
                {UserToolbarItem(this.props.user, this.props.onShowUserProfile)}
            </React.Fragment>
        );
        const rightContents = (
            <React.Fragment>
                <Button
                    icon="pi pi-comment"
                    tooltip="New chat"
                    onClick={this.props.onShowContactList}
                    className="p-button-rounded p-button-text"
                />
                <Button
                    icon="pi pi-ellipsis-v"
                    tooltip="Menu"
                    onClick={(e) => this.menuUser.toggle(e)}
                    className="p-button-rounded p-button-text"
                />
                <Menu
                    model={this.menuUserItems}
                    ref={el => this.menuUser = el}
                    popup
                />
            </React.Fragment>
        );
        return (
            <Toolbar
                left={leftContents}
                right={rightContents}
                className="p-h-header p-rounded-0"
            />
        );
    }
}

const mapStateToProps = ({ usersReducer }) => ({
    user: usersReducer.user
})

export default connect(
    mapStateToProps,
    { logOut }
)(ChatsHeader);