import {
    NotificationMessage,
} from './styled.module.js';

import {Fragment} from 'react';

const Notification = ({ message }) => {
    return (
		<Fragment>
			{message ? (
				<NotificationMessage>
					{message}
				</NotificationMessage>
			) : null}
		</Fragment>
    );
}
export default Notification;


