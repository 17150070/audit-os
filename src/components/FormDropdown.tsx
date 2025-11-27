import { FieldWrapper } from '@progress/kendo-react-form';
import { Error, Label, Hint } from '@progress/kendo-react-labels';
import { DropDownList } from '@progress/kendo-react-dropdowns';


const FormDropdown = (fieldRenderProps: any) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        optional,
        colSpan,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    const dropdownData = [
        { text: 'Debian', value: 'debian' },
        { text: 'Ubuntu', value: 'ubuntu' },
        { text: 'CentOS', value: 'centos' },
        { text: 'Redhat', value: 'redhat' }
    ];

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
                <DropDownList
                    data={dropdownData}
                    textField="text"
                    dataItemKey="value"
                    valid={valid}
                    id={id}
                    disabled={disabled}
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    {...others}
                />
            </div>
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export default FormDropdown;