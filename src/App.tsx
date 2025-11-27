import './App.css'
import {useEffect, useState} from "react";
import {fetchAudit} from "./api/fetchAudit.ts";
import {mockData} from "./api/mockData.ts";
import {
    Form,
    Field,
    FormElement,
    FormRenderProps,
    FormFieldSet,
    FormSeparator
} from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import FormInput from "./components/FormInput.tsx";
import FormTextArea from "./components/FormTextArea.tsx";


const App = ()=>  {
    const [loading, setLoading] = useState(false)

    const sendAudit = (dataItem: any) => {
        console.log("dataItem", dataItem)
        setLoading(true)
        fetchAudit(mockData)
            .then(response => {
                console.log("response", response)})
            .catch(error => {
                console.log(error)
            })
            .finally()
    }




  return (
    <div>
        <Form
            onSubmit={sendAudit}
            render={(formRenderProps: FormRenderProps) => (
                <FormElement cols={2} style={{ maxWidth: 850 }}>
                    <FormFieldSet legend="Personal Information" cols={2} colSpan={1}>
                        <Field
                            colSpan={1}
                            name={'OSName'}
                            component={FormInput}
                            label={'OS name'}
                            placeholder={'Enter your OS name'}
                        />

                        <Field
                            colSpan={1}
                            name={'OSVersion'}
                            component={FormInput}
                            label={'OS version'}
                            placeholder={'Enter your OS version'}
                        />
                    </FormFieldSet>
                    <FormSeparator colSpan={2} />
                    <Field
                        colSpan={2}
                        id={'packages'}
                        name={'packages'}
                        label={'Packages'}
                        optional={true}
                        component={FormTextArea}
                    />
                    <div className="k-form-buttons">
                        <Button
                            themeColor={'primary'}
                            type={'submit'}
                            disabled={!formRenderProps.allowSubmit}

                        >
                            Audit
                        </Button>
                    </div>
                </FormElement>
            )}
        />
    </div>
  )
}

export default App
