/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'toggle-switch-component',
    templateUrl: './mat-checkbox.component.html',
    // styleUrls: ['./mat-checkbox.component.css']
})
export class ToggleSwitchRenderer implements ICellRendererAngularComp {
    public params: any;

    public checked = false;

    agInit(params: any): void {

        this.params = params;
        this.checked = this.params.value;
    }

    // demonstrates how you can do "inline" editing of a cell
    onChange(checked: boolean) {
        this.checked = checked;
        const oldValueVisible = this.params.node.data.visibility;
        const oldValueEnableRowGroup = this.params.node.data.enableRowGroup;

        this.params.node.setDataValue(this.params.colDef, this.checked ? true : false);
        //if column visible, enable enableRowGroup and enablePivot by default, if they change it disable it
        if (!oldValueVisible && this.params.node.data.visibility) {
            if ((this.params.node.data.enableRowGroup == null) || (!oldValueEnableRowGroup && !this.params.node.data.enableRowGroup)) {
                this.params.node.data.enableRowGroup = true;
            }
            else if (oldValueEnableRowGroup == null && !this.params.node.data.enableRowGroup) {
                this.params.node.data.enableRowGroup = false;
            }


            this.params.node.setData(this.params.node.data);
        }
    }

    refresh(params: any): boolean {
        return false;
    }

}
