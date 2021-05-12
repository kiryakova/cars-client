import {
    NotificationMessage,
} from './styled.module.js';

const Notification = ({ message }) => {
    return (
		<>
			{message ? (
				<NotificationMessage>
					{message}
				</NotificationMessage>
			) : null}
		</>
    );
}
export default Notification;
