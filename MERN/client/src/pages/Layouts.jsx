
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Layouts({ user }) {

  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  )
}
