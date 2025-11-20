/* eslint-disable no-unused-vars */
import {React,useState, useRef,useEffect} from 'react'

const input_count = 5

const App = () => {
  const [inputArray, setinputArray] = useState(new Array(input_count).fill(""));

  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0].focus();
  }, []);

  const handleKeyDown = (e,index) =>{
    if(e.key === "Backspace" && !e.target.value ){
      refArr.current[index-1]?.focus();
    }
  }

  const handleChange = (e,index) =>{
    console.log(e.target.value);
    const val = e.target.value.trim();
    if(isNaN(val)){
      return;
    }
    let newInputArray = [...inputArray];
    newInputArray[index]= val.slice(-1);
    setinputArray(newInputArray);
    if(val && index < input_count -1){
      refArr.current[index + 1]?.focus();
    }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center pt-20 bg-black text-white'>
      <h1 className='font-bold text-7xl mb-30'>OTP INPUT</h1>

      <div>
        {
          inputArray.map((value, index) => (
            <input 
              ref={(input)=>(refArr.current[index]=input)} // create ref for each input, its works like refArr.current[0], refArr.current[1]... and so on, =input means each input element is assigned to corresponding index in refArr.current array, in simple words we are storing reference of each input element in refArr.current array
              key={index}
              type="text" 
              className="border h-20 w-20 rounded m-3 text-6xl text-center p-1"  
              value={inputArray[index]}
              onChange= {(e)=>handleChange(e,index)}
              onKeyDown= {(e)=>handleKeyDown(e,index)}
              />
              
          ))
        }
        
      </div>
      
    </div>
  )
}

export default App
