import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserSession } from '~/browserui/models/browser-session';
import { Container } from './style';

let currentSession: BrowserSession = null;

export const DangerPage = observer(({ visible }: { visible: boolean }) => {

    var pageStyle: any = {
        display: visible ? "block" : "none"
    }

    return (
        <div>
            <Container style={pageStyle}>
                Danger value reached 1000. <br />
                Throw your PC out of the nearest window immediately!!!! <br /><br />
                Thank you for your cooperation.
            </Container>
        </div>
    );
});