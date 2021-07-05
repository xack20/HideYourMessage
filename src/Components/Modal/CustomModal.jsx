import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, AutoComplete, message } from 'antd'

import moment from 'moment'
import { CloseCircleTwoTone } from '@ant-design/icons'

import { useSelector, useDispatch } from 'react-redux'
import {
  changeMenu,
  changeModalData,
  changeModalVis
} from '../../Redux/CommonSlice'

import firebaseDB from '../../firebase/firebase'
import Huffman from '../../Huffman/huffman'

const { TextArea } = Input

export default function CustomModal () {
  const visibility = useSelector(state => state.common.modal_vis)
  const data = useSelector(state => state.common.modal_data)
  const option = useSelector(state => state.common.menu)

  const me = useSelector(state => state.common.user_info)

  const [name_list, setList] = useState([])

  const [to, setTo] = useState('')
  const [msg, setMsg] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    message.config({ top: 60 })
    //console.log(props.type);
    firebaseDB
      .child(`users`)
      .get()
      .then(snapshot => {
        const list = []
        if (snapshot.exists()) {
          snapshot.forEach(item => {
            if (item.key != me.id)
              list.push({ value: item.val().user_info.full_name, id: item.key })
          })
          setList(list)
        } else {
          message.warning('No data available')
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }, [])

  const onClickHandle = () => {
    moment().format('MMMM Do YYYY, h:mm:ss a')

    let id
    name_list.forEach(item => {
      if (item.value === to) id = item.id
    })

    const { tree, coded_msg } = Huffman.encode(msg)

    console.log(tree.split('-'))

    firebaseDB
      .child(`users/${id}/messages/recieved`)
      .get()
      .then(snapshot => {
        if (snapshot.exists()) {
          let msg_list = snapshot.val()

          msg_list.push({
            from: me.full_name,
            id: me.id,
            tree: tree,
            content: coded_msg,
            recieved_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
            seen: false
          })

          // console.log(msg_list);

          firebaseDB
            .child(`users/${id}/messages/recieved`)
            .set(msg_list, err => {
              if (err) console.log(err)
            })
        } else {
          message.warning('No data available')
        }
      })
      .catch(error => {
        message.error(error.message)
      })

    firebaseDB
      .child(`users/${me.id}/messages/sent`)
      .get()
      .then(snapshot => {
        if (snapshot.exists()) {
          let msg_list = snapshot.val()

          msg_list.push({
            to: to,
            tree: tree,
            content: coded_msg,
            sent_at: moment().format('MMMM Do YYYY, h:mm:ss a')
          })

          // console.log(msg_list);

          firebaseDB
            .child(`users/${me.id}/messages/sent`)
            .set(msg_list, err => {
              if (err) console.log(err)
            })
        } else {
          message.warning('No data available')
        }
      })
      .catch(error => {
        message.error(error.message)
      })

    dispatch(changeModalVis())
  }

  const onDecryptClick = () => {
    dispatch(
      changeModalData({
        ...data,
        content: Huffman.decode({ tree: data.tree, coded_msg: data.content })
      })
    )
  }

  return (
    <Modal
      visible={visibility}
      onCancel={() => {
        dispatch(changeModalVis())
      }}
      centered={true}
      footer={null}
      closeIcon={
        <CloseCircleTwoTone
          twoToneColor='#bfbfbf'
          style={{ fontSize: '25px' }}
        />
      }
      style={{
        marginTop: '70px',
        overflowX: 'hidden',
        borderRadius: '5px'
      }}
      width={700}
      // zIndex={10}
      className='shadow-sm bg-body rounded'
    >
      {/* {console.log(modalVis)} */}
      <h5 style={{ textAlign: 'center', marginBottom: '30px' }}>Message</h5>

      {option === 'compose' ? (
        <AutoComplete
          className='m-2'
          style={{ width: '100%' }}
          placeholder='To'
          options={name_list}
          onChange={e => {
            setTo(e)
          }}
        />
      ) : (
        <Input
          addonBefore={option === 'recieved' ? 'From : ' : 'To : '}
          className='m-2'
          disabled={option === 'recieved' || option === 'sent'}
          value={data.from || data.to}
        />
      )}

      <TextArea
        rows={10}
        className='m-2'
        disabled={option === 'recieved' || option === 'sent'}
        value={data.content}
        placeholder='Message Body'
        onChange={e => {
          setMsg(e.target.value)
        }}
      />

      {(option === 'recieved' || option === 'sent') && (
        <Button
          block
          danger
          className='m-2'
          style={{ fontWeight: 'bold', fontSize: '15px' }}
          onClick={onDecryptClick}
        >
          Decrypt
        </Button>
      )}

      {option === 'compose' && (
        <Button
          block
          type='primary'
          className='m-2'
          style={{ fontWeight: 'bold', fontSize: '15px' }}
          onClick={onClickHandle}
        >
          Send
        </Button>
      )}

      {option === 'recieved' && (
        <Button
          block
          className='m-2'
          style={{
            fontWeight: 'bold',
            fontSize: '15px',
            color: 'grey',
            backgroundColor: '#e3eced46',
            borderColor: 'grey'
          }}
        >
          Reply
        </Button>
      )}
    </Modal>
  )
}


