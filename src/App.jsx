import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  //use state hook used for the updates of states.
  const [length, setLength] = useState(8)
  
  //just checking if want nos or chars in the password, so default true or false in usestate.
  const [noallowed,setnoallowed] =useState(false)
  const [charallowed,setcharallowed]=useState(false)

  //password bhi to state update hoga input field me
  //default empty, we will generate password, some method or api is going to run and password is going to be updated
  const [password,setPassword] = useState("")

  //useref hook
  //when we have to take reference of anything, then useref hook is used, we need a variable here.
  const passwordref= useRef(null)

  //usecallback(fn,dependencies) lets us cache a function defn. between re-renders. here dependencies(in array format) are nos and characters
  //helps in memoization.
const passwordgenerator=useCallback(() => {
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(noallowed)
    str+="1234567890"

  if(charallowed)
    str+="~!@#$%^&*_+/*-+`,.\|"

  //length governs how many times to loop.
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1)

    pass +=str.charAt(char);
  }

  setPassword(pass);


},[length,noallowed,charallowed,setPassword])//setpassword is also a dependency. we do optimisation here. this is all for optimization.


const copyPasswordToClipboard =useCallback(() => {
  //window object is available in native react environment
  passwordref.current?.select() //to give the effect of copying
  
  //gives range of how many to copy
  passwordref.current?.setSelectionRange(0,100)

  window.navigator.clipboard.writeText(password)
},[password])


  //lets us synchronize a component with an external system.
useEffect(() => {
  passwordgenerator()
}, [length,noallowed,charallowed,passwordgenerator])//whenever there is any changes to any of the components it will run, we run from here.

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mt-4">

          <input
            type='text'
            value={password}//the one in usestate
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordref}  
              />

            <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>

            <input
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={noallowed}
            id='numberInput'
            onChange={() =>{
              setnoallowed((prev) => !prev);
            }} />

            <label htmlFor='numberInput'>Numbers</label>
          </div>


            <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={charallowed}
            id='characterInput'
            onChange={() =>{
              setcharallowed((prev) => !prev);
            }} />

            <label htmlFor='characterInput'>characters</label>
          </div>


        </div>

      </div>
    </>
  )
}

export default App
