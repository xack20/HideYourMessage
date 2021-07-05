import { Avatar } from 'antd'
import { Menu, Dropdown } from 'antd'
import './HeaderRightPart.css'
// import SearchBar from '../../Components/Search/SearchBar.jsx';

import { useSelector,useDispatch } from 'react-redux'
import {changeAuth} from '../../Redux/CommonSlice'
import { Link } from 'react-router-dom'

export default function HeaderRightPart () {
  const full_name = useSelector(state => state.common.user_info.full_name)
  const dispatch = useDispatch();
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/login' onClick = {()=>{dispatch(changeAuth())}} >Logout</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className='header-extention'>
      {/* <SearchBar /> */}
      {/* <Avatar
          src="https://semicolonit.com/wp-content/uploads/2021/02/biprodas-roy.jpg"
          size={40}
        /> */}
      <Dropdown overlay={menu}>
        <Avatar className='avatar' size={50}>
          {full_name}
        </Avatar>
      </Dropdown>
    </div>
  )
}
