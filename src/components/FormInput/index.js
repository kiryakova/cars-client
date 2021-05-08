import {
    FormInputContainer,
    FormInputField,
    FormInputFieldImage,
    FormInputLabel
} from './styled.module.js';

const FormInput = ({ handleChange, label, ...props }) => {
    return (
        <FormInputContainer>
            {label ? (
                <FormInputLabel>
                    {label}
                </FormInputLabel>
            ) : null}

            {(label == "Email" || label == "Password" || label == "Confirm Password") ? (handleChange ? (<FormInputFieldImage onBlur={(e) => handleChange(e.target.name, e.target.value)} {...props} />)
            : <FormInputFieldImage {...props} />)
            : handleChange ? (<FormInputField onBlur={(e) => handleChange(e.target.name, e.target.value)} {...props} />)
            : <FormInputField {...props} />}

        </FormInputContainer>
    );
}
export default FormInput;

