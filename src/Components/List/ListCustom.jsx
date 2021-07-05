import React,{useState,useEffect} from 'react'
import { List, message, Avatar, Spin} from 'antd'

import InfiniteScroll from 'react-infinite-scroller'
import './ListCustom.css'

import firebaseDB from '../../firebase/firebase'

import {useSelector,useDispatch} from 'react-redux'
import {changeModalData,changeModalVis} from '../../Redux/CommonSlice'


const ListCustom = (props) =>  {
  
  const menu = useSelector(state => state.common.menu)
  
  const dispatch = useDispatch();

  const [state, setState] = useState(
    {
      data: [],
      loading: false,
      hasMore: true
    }
  )


  useEffect(() => {

    setState({data : []})

    if(menu==='compose'){
      return
    };
    
    fetchData(res => {
      setState({
        data: res.results.reverse()
      })
    })
    
  }, [menu])

  
  
  
  const fetchData = callback => {

    message.config({ top: 60 })

    firebaseDB
      .child(`users/${props.id}/messages/${menu}`)
      .get()
      .then(snapshot => {
        if (snapshot.exists()) {
          callback({ results: snapshot.val() })
        } else {
          message.warning('No data available');
        }
      })
      .catch(error => {
        message.error(error.message);
      })
  }

  
  
  
  
  const handleInfiniteOnLoad = () => {
    
    message.config({ top: 60 })

    let { data } = state
    
    setState({
      ...state,
      loading: true
    })

    if (data.length > 50) {
      message.success('All Message Loaded :)')
      setState({
        ...state,
        hasMore: false,
        loading: false
      })
      return
    }

    fetchData(res => {
      data = res.results.reverse().concat(data)
      setState({
        data,
        loading: false
      })
    })
  }

  
    return (
      <div className='demo-infinite-container'>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!state.loading && state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={state.data}
            renderItem={item => (
              <List.Item
                key={item.id}
                onClick={() => {
                  dispatch(changeModalData(item))
                  dispatch(changeModalVis())
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src={menu === 'recieved' ? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' : 'https://cdn.pixabay.com/photo/2017/06/02/19/12/broken-link-2367103_960_720.png'} />
                  }
                  title={<a href='#'>{item.from || item.to}</a>}
                  description={item.content.coded_msg || item.content}
                />
                <div>{item.recieved_at || item.sent_at}</div>
              </List.Item>
            )}
          >
            {state.loading && state.hasMore && (
              <div className='demo-loading-container'>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>

      </div>
    )
}
export default ListCustom
