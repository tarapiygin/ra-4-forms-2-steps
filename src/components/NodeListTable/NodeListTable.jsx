import { React } from 'react';
import './NodeListTable.css';
import Node from '../Node/Node';

export default function NodeListTable(props) {
  const { nodeList, editNode, deleteNode } = props;
  return (
    <div className='NodeListTable'>
      <div className='NodeListTable-Title'>
        <div className='NodeListTable-Title_item'>Дата (ДД.ММ.ГГГГ)</div>
        <div className='NodeListTable-Title_item'>Пройдено км</div>
        <div className='NodeListTable-Title_item'>Действия</div>
      </div>
      <ul className='NodeListTable-List'>
        {nodeList.map((n) => <Node
          key={n.id}
          id={n.id}
          date={n.date}
          distance={n.distance}
          editNode={editNode}
          deleteNode={deleteNode}
        />)}
      </ul>
    </div>
  )
}