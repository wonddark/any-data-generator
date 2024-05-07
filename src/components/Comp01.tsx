import {Button, ConfigProvider, Input, Modal, Select} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faEye, faFileCsv, faPlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import {uid} from 'uid';
import {generator} from "../utils/generator.ts";
import {dataOptions} from "../types/data-type-map.ts";
import {json2csv} from 'json-2-csv';

function Comp01() {
    const [properties, setProperties] = useState<{ id: string, name: string, type: string }[]>([])
    const [previewObject, setPreviewObject] = useState<any>({})
    const [currentProperty, setCurrentProperty] = useState<{ name: string; type: string }>({name: '', type: ''})
    const [numberItems, setNumberItems] = useState(0)
    const [data, setData] = useState<Record<string, string | number | boolean>[]>([])
    const [showResult, setShowResult] = useState<boolean>(false)
    const csvLinkRef = useRef<HTMLAnchorElement>(null);
    const jsonLinkRef = useRef<HTMLAnchorElement>(null);

    return (
        <ConfigProvider theme={{
            token: {
                colorBgBase: '#212121',
                colorTextBase: '#ffffff',
                boxShadow: '',
                fontFamily: ['Menlo',
                    'Monaco',
                    'Lucida Console',
                    'Liberation Mono',
                    'DejaVu Sans Mono',
                    'Bitstream Vera Sans Mono',
                    'Courier New',
                    'monospace'].join(',')
            },
            components: {
                Button: {
                    primaryShadow: '',
                }
            }
        }}>
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-y-3">
                <div className="px-2.5">
                    <p className="text-lg font-bold text-white mb-2">Define</p>
                    <div className="flex flex-col gap-y-1.5">
                        <div className="grid grid-cols-[1fr_1fr_120px] gap-0.5">
                            <Input type="text" className="px-0.5" name="name" value={currentProperty.name}
                                   onChange={({currentTarget: {value}}) => setCurrentProperty(prevState => ({
                                       ...prevState,
                                       name: value
                                   }))}/>
                            <Select options={dataOptions} placeholder="Select value type" className="px-0.5"
                                    value={currentProperty.type}
                                    onChange={(value) => {
                                        setCurrentProperty(prevState => ({...prevState, type: value}))
                                    }}/>
                            <Button icon={<FontAwesomeIcon icon={faPlus}/>} onClick={() => {
                                setProperties(prevState => {
                                    return prevState.concat({...currentProperty, id: uid()})
                                })
                                setCurrentProperty({name: '', type: ''})
                            }}>Add</Button>
                        </div>
                        {properties.length > 0 && <div className="p-2 border border-gray-700 mt-3 rounded-md">
                            {properties.map((item) => (
                                <div key={item.id} className="grid grid-cols-[1fr_1fr_120px] space-y-1.5">
                                    <Input type="text" defaultValue={item.name} onChange={({target: {value}}) => {
                                        setProperties(prevState => {
                                            const copy = [...prevState]
                                            copy[copy.findIndex(token => token.id === item.id)].name = value
                                            return prevState
                                        })
                                    }} className="px-0.5"/>
                                    <Select defaultValue={item.type} options={dataOptions}
                                            placeholder="Select value type" onChange={(value) => {
                                        setProperties(prevState => {
                                            const copy = [...prevState]
                                            copy[copy.findIndex(token => token.id === item.id)].type = value
                                            return prevState
                                        })
                                    }} className="px-0.5"/>
                                    <Button icon={<FontAwesomeIcon icon={faTrashCan}/>} danger onClick={() => {
                                        setProperties(prevState => {
                                            return prevState.filter((token) => token.id !== item.id)
                                        })
                                    }}>Remove</Button>
                                </div>
                            ))}
                        </div>}
                    </div>
                    {properties.length > 0 &&
                        <Button icon={<FontAwesomeIcon icon={faEye}/>} type="primary" className="mt-3"
                                disabled={properties.length === 0} onClick={() => {
                            setPreviewObject(() => generator(properties))
                        }}>Preview</Button>}
                </div>
                <div className="px-2.5">
                    <p className="text-lg font-bold text-white mb-2">Preview</p>
                    <pre
                        className="bg-gray-800 text-white min-h-80 rounded p-3 text-lg font-extralight font-mono shadow-md border-2 border-gray-700 text-wrap max-h-[400px] overflow-y-auto">
                    {JSON.stringify(previewObject, null, 2)}
                </pre>
                    {properties.length > 0 && <div className="mt-3 flex">
                        <Input placeholder="How much items you want to generate?" type="number"
                               onChange={({target: {value}}) => setNumberItems(Number(value))}/>
                        <Button type="primary" icon={<FontAwesomeIcon icon={faPlus}/>} onClick={() => {
                            const result = []
                            for (let i = 0; i < numberItems; i++) {
                                result.push(generator(properties))
                            }
                            setData(result)
                            setShowResult(true)
                        }}>Generate</Button>
                    </div>}
                </div>
                <Modal title="Generated data" open={showResult} onCancel={() => setShowResult(false)} cancelText={null}
                       onOk={() => setShowResult(false)} okText="Close">
                    <div>
                        <div className="h-80 overflow-y-auto font-extralight font-mono">
                            <table>
                                <thead>
                                <tr className="border-t-2 border-b-2">
                                    {properties.map(item => <th key={item.id}
                                                                className="py-2 ps-0.5 pe-2.5 uppercase text-left">{item.name}</th>)}
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((item, index) => <tr key={index} className="border-b">
                                    {properties.map(token => <td key={token.id}
                                                                 className="py-2 ps-0.5 pe-2.5 text-nowrap">{item[token.name]}</td>)}</tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <a href="/" hidden ref={csvLinkRef} aria-hidden>Download csv</a>
                        <Button type="primary" icon={<FontAwesomeIcon icon={faFileCsv}/>} onClick={() => {
                            const csv = json2csv(data)
                            let csvContent = `data:text/csv;charset:utf-8,${csv}`
                            const encodedURL = encodeURI(csvContent)
                            if (csvLinkRef.current) {
                                csvLinkRef.current.setAttribute("href", encodedURL);
                                csvLinkRef.current.setAttribute("download", "data.csv");
                                csvLinkRef.current.click();
                            }
                        }} className="mt-3">Export CSV</Button>
                        <a href="/" hidden ref={jsonLinkRef} aria-hidden>Download json</a>
                        <Button type="primary" icon={<FontAwesomeIcon icon={faDownload}/>} onClick={() => {
                            const json = JSON.stringify(data, null, 2)
                            let jsonContent = `data:text/json;charset:utf-8,${json}`
                            const encodedURL = encodeURI(jsonContent)
                            if (jsonLinkRef.current) {
                                jsonLinkRef.current.setAttribute("href", encodedURL);
                                jsonLinkRef.current.setAttribute("download", "data.json");
                                jsonLinkRef.current.click();
                            }
                        }} className="mt-3">Export JSON</Button>
                    </div>
                </Modal>
            </div>
        </ConfigProvider>
    )
}

export default Comp01