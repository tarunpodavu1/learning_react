import React,{useRef} from 'react'

const UseRefExample1 = () => {

  const  inputRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input ref={inputRef} className="form-control mb-2" id='name' type='text' />
        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
    </>
  )
}

export default UseRefExample1