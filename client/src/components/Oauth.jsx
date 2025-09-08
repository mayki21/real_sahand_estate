import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
  const dispatch = useDispatch()
  const handleGoogleClick =  async () => {
  // const handleGoogleClick =  async () => {
    try {
      const provider = new GoogleAuthProvider();
      const navigate = useNavigate()
      const auth = new getAuth(app);
      const result = await signInWithPopup(auth,provider);
      console.log("line 16 from auth",result)
      const res = await fetch('/api/auth/google', {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          name:result.user.displayName,
          email : result.user.email,
          photo : result.user.photoURL
        })
      })
      const data = await res.json()
      console.log(data)
      dispatch(signInSuccess(data))
      navigate("/home")
    } catch (error) {
      console.log("could not login with google", error)
      
    }
  }
  return (
    <button className='bg-red-700 uppercase text-white p-3 rounded-lg hover:opacity-95 ' type="button" onClick={handleGoogleClick}>CONTINUE WITH GOOGLE</button>
  )
}
