import React,{useState,useEffect} from 'react'
import { Layout, Menu, Badge } from 'antd'
import {useSelector,useDispatch} from 'react-redux'

import HeaderMain from '../../Components/Header/HeaderMain'

import { RocketTwoTone, EditTwoTone, MessageTwoTone } from '@ant-design/icons'

import './MainPage.css'

// import TableCustom from "../../Components/Table/TableCustom";

import ListCustom from '../../Components/List/ListCustom'

import {changeMenu, changeModalData, changeModalVis} from '../../Redux/CommonSlice'
import CustomModal from '../../Components/Modal/CustomModal'


const { Content, Footer, Sider } = Layout

export default function MainPage () {
  const [state, setState] = useState({ count: 0 })


  const user_info = useSelector(state => state.common.user_info)
  
  const dispatch = useDispatch()
  
  const onClickHandle = (event) => {
    const key = event.key;
    dispatch(changeMenu(key))  
    if(key === 'compose'){
      dispatch(changeModalVis())
      dispatch(changeModalData({}))
    }
  }

  const menu = useSelector(state => state.common.menu)

  useEffect(() => {
    console.log('Updated!');
  }, [menu])

  return (
    <Layout>
      {/* {console.log(user_info)} */}
      <Sider theme='dark' className='sider'>
        {/* <div className="logo" /> */}

        <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']} onClick={onClickHandle}>
          <Menu.Item key='recieved' icon={<MessageTwoTone />}>
            {state.count !== 0 ? (
              <Badge count={state.count}>
                <p
                  style={{ margin: '1px', padding: '1px', fontWeight: 'bold' }}
                >
                  Recieved Message
                </p>
              </Badge>
            ) : (
              "Recieved Message"
            )}
          </Menu.Item>

          <Menu.Item key='sent' icon={<RocketTwoTone />}>
            Sent Messages
          </Menu.Item>

          <Menu.Item key='compose' icon={<EditTwoTone />}>
            Compose Message
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <HeaderMain></HeaderMain>
        <Content className='site-layout-background-uncollapsed'>
          {/* <TableCustom/> */}
          <ListCustom id={user_info.id} />
        </Content>
        <Footer style={{ textAlign: 'center',height : '5px',marginLeft: '100px',marginBottom : '10px'}}>
         <p style={{fontFamily : 'monospace',fontSize : '10px'}}>Hide Your Message @2021 Created By Team X&R</p>
        </Footer>
      </Layout>

      <CustomModal />
    </Layout>
  )
}
