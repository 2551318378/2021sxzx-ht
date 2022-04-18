import React, { useEffect, useState } from "react";
//全选之后有啥用，详情有啥用,。报警阈值不会做。处理按钮是用来修改的吗。删除没做。成功的提示没做。
//点击处理之后，要刷新一下界面才能变为“已处理”
//下一步，拿到表单信息
import {
  Space,
  Form,
  Input,
  Button,
  Table,
  Checkbox,
  Radio,Divider,Modal,Alert,Row,Col,Upload
} from "antd";
const { TextArea } = Input;
import { UploadOutlined } from "@ant-design/icons";
import api from "../../../../api/systemFailure";
import emitter from "./ev"
import FormItem from "antd/lib/form/FormItem";

const   tableColumns = [
  {
    title: "故障名称",
    dataIndex: "failure_name",
    key: "failure_name",
  },
  {
    title: "时间",
    dataIndex: "failure_time",
    key: "failure_time",
  },
  {
    title: "操作描述",
    dataIndex: "failure_des",
    key: "failure_des",
  },
  {
    title: "提交人",
    key: "user_name",
    dataIndex: "user_name",
  },
  {
    // title:"详情",
    key:"detail",
    dataIndex: "detail",
    render: (_,record,index) => (
      <Space size="middle">
      <HandleModal record={record}></HandleModal>
      </Space>)
  },{
    key:"handle",
    dataIndex: "handle",
    render: (_,record,index) => (//参数分别为当前行的值，当前行数据，行索引
      <>
      <Space size="middle">
        <Button style={{border:"1px solid blue"}} onClick={()=>{console.log(tableData1[index].content);tableData1[index].content='已处理'}}>
        处理
        </Button>
      </Space>
      {/* <HandleModal record={record}></HandleModal> */}
    </>
      )
  },{
    key:"delete",
    dataIndex: "delete",
    render: (_,record) => (
      <Space size="middle">
        <Button style={{border:"1px solid blue"}} onClick={()=>{deleteFuncElem(record)}}>删除</Button>
      </Space>)
  }
];
const tableData1=[
  {key:1,failure_name:"闪退",create_time:"2017-01-01",content:"闪选",user_name:"zyk"}
,  {key:2,failure_name:"重启",create_time:"2017-08-01",content:"dddd",user_name:"wlz"}
,  {key:3,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
,  {key:4,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
,  {key:5,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
,  {key:6,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
,  {key:7,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
,  {key:8,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
,  {key:9,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
,  {key:10,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
,  {key:11,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
,  {key:12,failure_name:"崩溃",create_time:"2017-10-01",content:"噢哟",user_name:"lyh"}
]
//详情的弹窗Modal
const HandleModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/* <Button type="link" style={{color:"yellow",textDecoration:"underline"}}>详情</Button>
      <button style={{textDecoration:"underline"}}>underline</button> */}
      <a style={{textDecoration:"underline"}} onClick={showModal}>详情</a>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="确定" cancelText="取消">
        <h2>故障名称：{props.record.failure_name}</h2>
        <p>故障描述：{props.record.failure_des}</p>
        <h6>{props.record.failure_time}</h6>
        {/* <p>{props.record}</p> */}
      </Modal>
    </>
  );
};

//删除操作
const deleteFuncElem=(aimedRowData)=>{
  console.log(aimedRowData);
  api.DeleteSystemFailure(aimedRowData);
  const totalFuncDataList = tableData1;
  // console.log(totalFuncDataList);
  let i;
  let indexOfFuncList;
  for(i = 0; i <totalFuncDataList.length;i++) {
    if(aimedRowData.index=== totalFuncDataList[i].index) {
      break;
    }
  }
  // console.log(totalFuncDataList[i]);
  totalFuncDataList.splice(i+1,1);
  console.log(totalFuncDataList);
  // this.setState({
  //   data:totalFuncDataList
  // });
  // this.showTable(this.state.data);
}

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {//点前面的checkbox拿到当行的数据和index
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({//选择框的默认属性配置,目前没啥用
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
/**
 * 消息弹框
 * @returns null
 */
var HandleAlertBox=(isShow,type,message)=>{
  emitter.emit("alert",isShow,type,message)
}
const AlertBox=()=>{//有四种样式 success、info、warning、error。
  const [show,setShow]=useState(false)
  const [type,setType]=useState(null)
  const [message,setMessage]=useState(null)
  useEffect(() => {
    var eventEmitter=emitter.addListener("alert",(isShow,type,message)=>{
      setShow(isShow)
      setType(type)
      setMessage(message)
      console.log(isShow)
      console.log(type)
    })
  })
  return(
    <div  style={{display:show?"block":"none"}}> 
          <Alert message={message} type={type} />
    </div>
  )
}

//提交故障的按钮以及弹窗
const SubmitFailure=(props)=>{
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); //用于之后取数据
  const formRef = React.createRef();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    // console.log(form.getFieldsValue(true))
    // console.log(form.getFieldValue('failureName'));
    // setIsModalVisible(false);
    let data=formRef.current?.getFieldsValue();
    data.user_name=localStorage.getItem('role_name');
    data.create_time=new Date();
    api.CreateSystemFailure(data);
    console.log('Success:', formRef.current?.getFieldsValue());
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/* <Button type="link" style={{color:"yellow",textDecoration:"underline"}}>详情</Button>
      <button style={{textDecoration:"underline"}}>underline</button> */}
      {/* <a style={{textDecoration:"underline"}} onClick={showModal}>详情</a> */}
      <Button type="primary" size="large" onClick={showModal}>
        故障提交
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
        okText="提交"
        cancelText="取消"
      >
        <Form ref={formRef} name="createSystemFailure" onFinish={onFinish}>
          <Form.Item label="故障名称" name="failureName">
            <Input placeholder="请输入名称" defaultValue="mysite"/>
          </Form.Item>
          <Form.Item label="故障描述" name="failureDescription">
            <TextArea rows={4} showCount maxLength={100} defaultValue="mysite"/>
          </Form.Item>
          <Form.Item label="故障截图" name="failurePicture">
            <Upload
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
              {localStorage.getItem('_id')}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
  return (
    <Button type="primary" size="large" onClick={()=>{HandleInputModal("true","error","Done")}}>故障提交</Button>
  )
}

const Demo = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [failureData, setFailureData] = useState([]);
  const getFailure = () => {
    api
        .GetSystemFailure()
        .then((response) => {
          setFailureData(response.data.data);
          console.log("response.data.data=", response.data.data);
        })
        .catch((error) => {});
  };
  useEffect(() => {
    getFailure();
  }, []);
  return (
    <div>
      <Row>
        <Col span={19}>
          <AlertBox></AlertBox>
        </Col>
        <Col span={2.5} offset={1}>
          <SubmitFailure></SubmitFailure>
        </Col>
      </Row>
      <Divider />
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={tableColumns}
        dataSource={failureData}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
          pageSizeOptions: [10, 20, 50],
          showSizeChanger: true,
        }} //,position:['bottomLeft']
      />
    </div>
  );
};
export default function SystemManageFailure() {
  const [tableData, setTableData] = useState([]);
  const getSearchLog = (data) => {
    console.log(data);
    api.SearchLog(data).then((response) => {
        console.log("searchData=", response.data.data);
        setTableData(response.data.data);
      }).catch((error) => {});
  };
  return (
    <>
      <Demo></Demo>
    </>
  );
}
