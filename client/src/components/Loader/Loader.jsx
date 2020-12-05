import React from "react";

import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Loader({ visible }) {
    return (
        <Dialog
            visible={visible}
            showHeader={false}
            closable={false}
            closeOnEscape={false}
            className="p-border-0"
            contentStyle={{ "backgroundColor": "transparent" }}
            onHide={() => { }}
        >
            <ProgressSpinner className="p-overflow-hidden" />
        </Dialog>
    );
}