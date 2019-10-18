import React, { Component } from 'react'
import {UncontrolledPopover, PopoverHeader, PopoverBody, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

export default class MoreDescription extends Component {
    render() {
        return (
            <td>
            <Button id="PopoverLegacy" type="button">
                 More Description
            </Button>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                <PopoverHeader>Legacy Trigger</PopoverHeader>
                    <PopoverBody>
                        Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.</PopoverBody>
            </UncontrolledPopover>
            </td>
        )
    }
}
