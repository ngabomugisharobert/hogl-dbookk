import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { GrCircleInformation } from 'react-icons/gr';

function CompToolTipV2({comment, status, editor}) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <div ref={ref}>
            <Button size='sm' variant="outline-warning" onClick={handleClick}>
                <span> <GrCircleInformation />&nbsp;&nbsp;</span>{
                  status
            }</Button>

            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h3">Comment</Popover.Header>
                    <Popover.Body>

                        <strong>Comment : </strong> 
                        {
                            comment 
                        }
                        <br />
                        <br/>

                        <strong>Editor : </strong> 
                        {
                            editor
                        }
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}

export default CompToolTipV2;