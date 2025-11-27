import {FieldWrapper,} from '@progress/kendo-react-form';
import { Error, Label, Hint } from '@progress/kendo-react-labels';
import { TextArea } from '@progress/kendo-react-inputs';


const FormTextArea = (fieldRenderProps: any) => {
    const { validationMessage, touched, label, id, valid, hint, disabled, optional, colSpan, ...others } =
        fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';


    return (
        <FieldWrapper colSpan={colSpan}>
            <Label editorId={id} editorValid={valid} optional={optional} className="k-form-label">
                {label}
            </Label>
            <div className={'k-form-field-wrap'}>
                <TextArea
                    valid={valid}
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

export default FormTextArea;