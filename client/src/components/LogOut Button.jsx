import { useNavigate } from "react-router-dom"

const LogOutButton = ()=>{

  const navigate = useNavigate();

  const handleLogOut = ()=>{
    navigate('/buyer/login')
  }

  return (
    <button onClick={handleLogOut}>Log-Out</button>
  );
  
}

export default LogOutButton