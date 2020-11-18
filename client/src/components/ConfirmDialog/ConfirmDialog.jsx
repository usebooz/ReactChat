import React from "react";

import { confirmable, createConfirmation } from "react-confirm";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

class ConfirmDialog extends React.Component {
    render() {
        const {
            confirmation,
            show,
            proceed,
        } = this.props;
        const footer =
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => proceed(false)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => proceed(true)} autoFocus />
            </div>;
        return (
            <Dialog header="Confirmation" visible={show} modal footer={footer} onHide={() => proceed(false)}>
                <div className="p-d-flex p-ai-center p-h-100">
                    <i className="pi pi-exclamation-triangle p-mr-2" />
                    <span>{confirmation}</span>
                </div>
            </Dialog>
        );
    }
}

export function confirm(
    confirmation,
    options = {}
) {
    return createConfirmation(confirmable(ConfirmDialog, 0))({
        confirmation,
        ...options
    });
}