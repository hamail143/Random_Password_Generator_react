/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState , useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [length,setLength]= useState(8)
  const [numberAllowed,setnumberAllowed]= useState(false);
  const [charAllowed,setcharAllowed]= useState(false);
  const [password,setpassword]= useState("");

//using ref hook
const passwordref= useRef(null)

  const passGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@$%^&*(){}:";
    for (let i = 1; i < length; i++) {
      
      let char =Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      
    }
    setpassword(pass)

    


  },[length,numberAllowed,charAllowed ,])

  useEffect(()=>{
    passGenerator();

  },[length,numberAllowed,charAllowed,passGenerator])

  const copypasstoClipboard= useCallback(()=>{

    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);

  },[password])




  return (
    <>
    <div className='w-[1440px] h-[100%] flex flex-col items-center '>

      <div className='w-[700px] h-[150px] flex flex-col bg-gray-600 rounded-lg mt-8 items-center justify-center'>

        <p className='text-white font-bold'>Password Generator</p>
        <div className='flex flex-row items-center justify-center h-[40px] mt-4'>
        <input  type='text'value={password} ref={passwordref} placeholder=' Your password will be displayed here' className='w-[550px] h-[40px] rounded-lg  outline-none py-1 px-3 readOnly' ></input>
          <button

          onClick={copypasstoClipboard}
          
          
          
          className='hover:bg-sky-700 h-[40px] bg-orange-400 text-white rounded-full w-[60px] '> Copy!</button>
            
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            > </input>
            <label className='text-orange-400' > Length: {length }</label>
              
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox'defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setnumberAllowed((prev)=>!prev);
               
            }}
            > </input>
            <label className='text-orange-400' htmlFor='numberInput'> Numbers</label>
            <input type='checkbox'defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{
              setcharAllowed((prev)=>!prev);
               
            }}
            > </input>
            <label className='text-orange-400' htmlFor='charInput'> Characters</label>
              
          </div>
            
        </div>
        

        
          
      </div>
        
    </div>
      

        
          
      
      
    </>
  )
}

export default App
