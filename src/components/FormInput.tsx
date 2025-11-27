import {FieldWrapper,} from '@progress/kendo-react-form';
import { Error, Label, Hint } from '@progress/kendo-react-labels';
import { TextBox, } from '@progress/kendo-react-inputs';


const FormInput = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, type, optional, colSpan, ...others } =
        fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return (
        <FieldWrapper colSpan={colSpan}>
            <Label
                editorId={id}
                editorValid={valid}
                editorDisabled={disabled}
                optional={optional}
                className="k-form-label"
            >
                {label}
            </Label>
            <div className={'k-form-field-wrap'}>
                <TextBox
                    valid={valid}
                    type={type}
                    id={id}
                    disabled={disabled}
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    {...others}
                />
                {showHint && <Hint id={hintId}>{hint}</Hint>}
                {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
            </div>
        </FieldWrapper>
    );
};

export default FormInput;