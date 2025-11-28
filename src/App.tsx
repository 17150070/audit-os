import './App.css'
import {useState} from "react";
import {fetchAudit} from "./api/fetchAudit.ts";
import {
    Form,
    Field,
    FormElement,
    FormFieldSet,
} from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { Card, CardBody } from '@progress/kendo-react-layout';
import FormInput from "./components/FormInput.tsx";
import FormTextArea from "./components/FormTextArea.tsx";
import FormDropdown from "./components/FormDropdown.tsx";
import '@progress/kendo-theme-default/dist/all.css'
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Slide } from '@progress/kendo-react-animation';


const App = ()=>  {
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [notification, setNotification] = useState<any>({ success: false, error: false});


    const onToggleNotification = (flag: string) => {
        setNotification({...notification, [flag]: !notification[flag]});
        setTimeout(()=>{
            setNotification({...notification, [flag]: notification[flag]});
        },5000)
    }

    const parsePackagesData = (packagesText: string) => {
        if (!packagesText.trim()) return [];
        return packagesText.split('\n')
            .filter(line => line.trim())
            .map(line => {
                const parts = line.trim().split(/\s+/);
                return parts.slice(0, 3);
            })
            .filter(pkg => pkg.length === 3);
    };

    const sendAudit = (dataItem: any) => {
        setLoading(true)
        setResultData(null);
        setError(null);
        console.log("dataItem", dataItem);
        const request = {
            os: {
                name: dataItem.OSName?.value || '',
                version: dataItem.OSVersion || ''
            },
            packages: parsePackagesData(dataItem.packages || '')
        };
        fetchAudit(request)
            .then(response => {
                setResultData(response);
                onToggleNotification('success')
            })
            .catch(error => {
                console.log("error", error);
                setError(error)
                onToggleNotification('error')
            })
            .finally(()=>{
                setLoading(false)
            })
    }


  return (
    <div>
        <NotificationGroup
            style={{
                right: 0,
                top: 0,
                alignItems: 'flex-start',
                flexWrap: 'wrap-reverse'
            }}
        >
            <Slide direction={notification.success ? 'up' : 'down'}>
                {notification.success && <Notification
                    type={{ style: 'success', icon: true }}
                    closable={true}
                    onClose={() => setNotification({ ...notification, success: false })}
                >
                    <span>Данные успешно получены</span>
                </Notification>}
            </Slide>
            <Slide direction={notification.success ? 'up' : 'down'}>
                {notification.error && <Notification
                    type={{ style: 'error', icon: true }}
                    closable={true}
                    onClose={() => setNotification({ ...notification, error: false })}
                >
                    <span>Не удалось получить данные. Код {error?.status}</span>
                </Notification>}
            </Slide>
        </NotificationGroup>

        <Form
            onSubmit={sendAudit}
            render={(formRenderProps) => (
                <FormElement >
                    <FormFieldSet >
                        <Field
                            name={'OSName'}
                            component={FormDropdown}
                            label={'OS name'}
                            placeholder={'Select OS name'}
                        />

                        <Field
                            name={'OSVersion'}
                            component={FormInput}
                            label={'OS version'}
                            placeholder={'Enter your OS version'}
                        />

                        <Field
                            id={'packages'}
                            name={'packages'}
                            label={'Packages'}
                            rows={8}
                            component={FormTextArea}
                        />
                    </FormFieldSet>
                    <div className="k-form-buttons">
                        <Button
                            themeColor={'primary'}
                            type={'submit'}
                            disabled={!formRenderProps?.allowSubmit || loading}
                        >
                            {loading ? '...Loading' : 'Audit'}
                        </Button>
                    </div>
                </FormElement>
            )}
        />

        {(resultData || error) && (
            <div style={{ marginTop: '30px' }}>
                <Card>
                    <CardBody>
                        <h3 style={{ marginBottom: '15px', color: '#2e86ab' }}>
                            Audit result:
                        </h3>

                        {error && (
                            <PanelBar>
                                <PanelBarItem title="Ошибка:" expanded={true}>
                                    <div style={{backgroundColor: '#ec7d7d', padding: '15px 25px',}}>
                                        {JSON.stringify(error, null, 2)}
                                    </div>
                                </PanelBarItem>
                            </PanelBar>
                        )}

                        {resultData && (
                            <PanelBar>
                                <PanelBarItem title="Данные из Api:" expanded={true}>
                                    <div style={{padding: '15px 25px',}}>
                                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                                                {JSON.stringify(resultData, null, 2)}
                                            </pre>
                                    </div>
                                </PanelBarItem>
                            </PanelBar>
                        )}
                    </CardBody>
                </Card>
            </div>
        )}
    </div>
  )
}

export default App
