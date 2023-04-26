import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// import {IoMdInformationCircleOutline} from 'react-icons/io';

function CompToolTip({comment,status}) {
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">{
                status
            }</Tooltip>}
        >
            {({ ref, ...triggerHandler }) => (
                <Button
                    variant="light"
                    {...triggerHandler}
                    className="d-inline-flex align-items-center"
                >
                    {/* <IoMdInformationCircleOutline/> */}
                    <span className="ms-1">{
                        comment
                    }</span>
                </Button>
            )}
        </OverlayTrigger>
    );
}

export default CompToolTip;