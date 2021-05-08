import {
    ErrorField,
} from './styled.module.js';

import {Fragment} from 'react';

const FormErrorField = ({ message }) => {
    return (
		<Fragment>
			{message ? (
				<ErrorField>
					{message}
				</ErrorField>
			) : null}
		</Fragment>
    );
}
export default FormErrorField;


