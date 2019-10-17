import React, { useState, Component } from 'react';
import { Collapse,Card,CardBody} from 'reactstrap';


class MoreInfo extends Component{
    let [collapse, setCollapse] = useState(false);
    let toggle = () => setCollapse(!collapse);
    render(){

        return (
            <div>
                <Button color="info" size="sm" onClick={toggleMoreInfo.bind(this)}>More Info</Button>
                <Collapse isOpen={collapse}>
                <Card>
                    <CardBody>
                    nooo
                    </CardBody>
                </Card>
                </Collapse>
            </div>
        )
    }
}

export default MoreInfo;