import { React } from 'react';
import { DateTime } from 'luxon';
import './Node.css';


export default function Node(props) {
  const { id, date, distance, editNode, deleteNode } = props;
  const onEditNode = () => editNode(id);
  const onDeleteNode = () => deleteNode(id);
  return (
    <li className='Node'>
      <div className='Node-Date'>{DateTime.fromMillis(date).setLocale('ru').toFormat('dd.MM.yyyy')}</div>
      <div className='Node-Distance'>{distance.toFixed(1)}</div>
      <div className='Node-Actions'>
        <div className='Node-Actions_edit' onClick={onEditNode}>✎</div>
        <div className='Node-Actions_delete' onClick={onDeleteNode}>X</div>
      </div>
    </li>
  )
}