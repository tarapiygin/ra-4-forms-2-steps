import { React } from 'react';
import FormErrors from '../FormErrors/FormErrors';
import './NodeAddForm.css';


export default function NodeAddForm(props) {
  const { changeField, submitForm, form } = props;

  const onChangeField = (e) => changeField({
    ...form,
    [e.target.name]: e.target.value,
  })

  const onSubmitForm = (e) => {
    e.preventDefault();
    submitForm();
  }

  return (
    <form className='NodeAddForm' onSubmit={onSubmitForm}>
      <FormErrors errorList={form.errorList} />
      <div className='NodeAddForm-Fields'>
        <div className='NodeAddForm-Container'>
          <label className='NodeAddForm-Label' htmlFor='date'>Дата (ДД.ММ.ГГГГ)</label>
          <input id='NodeAddForm-Date' name='date' className='NodeAddForm-Input' onChange={onChangeField} value={form.date} />
        </div>
        <div className='NodeAddForm-Container'>
          <label className='NodeAddForm-Label' htmlFor='distance'>Пройдено км</label>
          <input id='NodeAddForm-Distance' name='distance' className='NodeAddForm-Input' onChange={onChangeField} value={form.distance} />
        </div>
        <div className='NodeAddForm-Container'>
          <button type='submit' className='NodeAddForm-Button'>Ok</button>
        </div>
      </div>

    </form>
  )
}