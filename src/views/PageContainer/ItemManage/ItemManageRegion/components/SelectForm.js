import React, { useState } from 'react'
import { DatePicker, Form, Input, Button, Modal } from 'antd'
import { getTimeStamp } from "../../../../../utils/TimeStamp"
const { RangePicker } = DatePicker

export default function SelectForm(props){
    const [form] = Form.useForm()
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [time, setTime] = useState([null, null])
    const [region_code, setRegionCode] = useState('')
    const [region_name, setRegionName] = useState('')
    const [department, setDepartment] = useState('')
    const [creator, setCreator] = useState('')

    const handleTaskCodeChange = (e)=>{
        setRegionCode(e.target.value)
    }
    const handleTaskregionChange = (e)=>{
        setRegionName(e.target.value)
    }
    const handleDepartmentChange = (e)=>{
        setDepartment(e.target.value)
    }
    const handleCreatorChange = (e)=>{
        setCreator(e.target.value)
    }

    const splitIds = (id)=>{
        let ids = []
        let noEmpty = id.replace(/\s*/g, '').replace('，', ',')
        ids = noEmpty.split(',')
        return ids
    }

    const inj_judge = (str)=>{
        let inj_str = ['delete', 'and', 'exec', 'insert', 'update', 'count', 'master', 'select',
            'char', 'declare', 'or', '|', 'delete', 'not', '/*', '*/', 'find']
        for (let i = 0; i < inj_str.length; i++){
            if (str.indexOf(inj_str[i]) >= 0){
                return true
            }
        }
        return false
    }

    const Search = ()=>{
        const data = {}
        if (inj_judge(region_code) || inj_judge(region_name) || inj_judge(creator) || inj_judge(department)){
            Modal.warning({
                centered: true,
                title: '非法输入',
                content: '输入信息中有非法输入内容，请检查输入！'
            })
        }
        else{
            if (start_time !== '') data['start_time'] = start_time
            if (end_time !== '') data['end_time'] = end_time
            if (region_code !== '') data['region_code'] = splitIds(region_code)
            if (region_name !== '') data['region_name'] = region_name
            if (department !== '') data['department_name'] = department
            if (creator !== '') data['creator_name'] = creator
            props.getSearch(data)
        }  
    }

    const handleDateChange = (value, dataString)=>{
        if (value){
            setStartTime(getTimeStamp(dataString[0]))
            setEndTime(getTimeStamp(dataString[1]))
            setTime(value)
        }
        else{
            setEndTime('')
            setStartTime('')
            setTime([null, null])
        }
    }

    const clear = ()=>{
        setRegionCode('')
        setRegionName('')
        setDepartment('')
        setCreator('')
        setStartTime('')
        setEndTime('')
        setTime([null, null])
    }

    const reset = ()=>{
        clear()
        props.reset()
    }

    return (
        <>
            <Form
                layout='inline'
                form={form}
                initialValues={{
                    layout: 'inline'
                }}
            >
                <Form.Item label='规则编码' style={{width: '25%'}}>
                    <Input value={region_code}
                        placeholder='请输入编码' size='middle' onChange={handleTaskCodeChange}></Input>
                </Form.Item>
                <Form.Item label='规则名称' style={{width: '25%'}}>
                    <Input value={region_name}
                        placeholder='请输入名称' size='middle' onChange={handleTaskregionChange}></Input>
                </Form.Item>
                <Form.Item label='业务部门' style={{width: '22%'}}>
                    <Input value={department}
                        placeholder='请输入部门' size='middle' onChange={handleDepartmentChange}></Input>
                </Form.Item>
                <Form.Item label='创建人' style={{width: '22%'}}>
                    <Input value={creator}
                        placeholder='请输入创建人' size='middle' onChange={handleCreatorChange}></Input>
                </Form.Item>

                <Form.Item label='起始时间' style={{marginTop: 10, width: '35%'}}>
                    <RangePicker value={time} style={{width: '100%'}} 
                        onChange={handleDateChange}/>      
                </Form.Item>
                <Form.Item style={{marginLeft: '50%', marginTop: 10, width: '5%', minWidth: 62}}>
                    <Button type='default' onClick={reset} style={{width: '100%'}}>重置</Button>
                </Form.Item>
                <Form.Item style={{marginTop: 10, width: '5%', minWidth: 62}}>
                    <Button type='primary' onClick={Search} style={{width: '100%'}}>查询</Button>
                </Form.Item>
            </Form>
        </>
    )
}