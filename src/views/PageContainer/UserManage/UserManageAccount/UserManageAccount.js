/**
 * 用户管理/后台账号管理页面
 */

import React, { useEffect, useState } from 'react'

import { message, Space } from 'antd';

import api from "../../../../api/user";
import UserTableFunctionalZone from "./components/UserTableFunctionalZone";
import UserTable from "./components/UserTable";

//  修改页面 UI 样式
export default function UserManageAccount() {
    const [tableData, setTableData] = useState([])
    const [loading,setLoading] = useState(true)

    // 从服务器获取用户表格的数据，保存到 tableData 中
    const getUser = (data) => {
        setLoading(true)

        api.GetUser(data).then(response => {
            setTableData(response.data.data)
            console.log('getUser response.data.data=', response.data.data)
            setLoading(false)
        }).catch(error => {
            console.log("error = ", error)
        })
    }

    // 从服务器中获取搜索结果，保存到 tableData 中
    const getSearchUser = (data) => {
        setLoading(true)

        api.SearchUser(data).then(response => {
            console.log('SearchValue =', response.data)
            setTableData(response.data.data)
            message.success('搜索用户信息成功')
            setLoading(false)
        }).catch(error => {
            console.log("error = ", error)
            message.error('搜索用户信息发生错误')
        })
    }

    // 获取所有评论表格的数据，仅在第一次渲染时执行。
    useEffect(() => {
        getUser({})
    }, [])

    return (
        <div>
            <Space direction="vertical" size={12} style={{width:100+'%'}}>
                {/* 功能区 */}
                <UserTableFunctionalZone getSearch={getSearchUser} refreshTableData={getUser} />
                {/* 用户评价的表格 */}
                <UserTable tableData={tableData} refreshTableData={getUser} loading={loading} />
            </Space>,
        </div>
    )
}
