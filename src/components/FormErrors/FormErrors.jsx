import { nanoid } from 'nanoid';
import { React } from 'react';
import './FormErrors.css';


export default function FormErrors(props) {
  const { errorList } = props;
  if (errorList.length === 0) {
    return null;
  }
  return (
    <div className='Form-Errors'>
      {errorList.map((e) => (
        <div className='Form-Error' key={nanoid()}>{e.message}</div>
      ))}
    </div>
  );
}