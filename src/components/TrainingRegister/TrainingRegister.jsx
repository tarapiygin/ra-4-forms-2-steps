import { React, useState } from 'react';
import { DateTime } from 'luxon';
import NodeAddForm from '../NodeAddForm/NodeAddForm';
import NodeListTable from '../NodeListTable/NodeListTable';
import Node from './models/Node';
import './TrainingRegister.css'

export default function TrainingRegister() {
  const [state, setState] = useState(
    {
      form: {
        date: '',
        distance: '',
        errorList: [],
      },
      editableNodeId: null,
      nodeList: [],
    }
  );

  const validateForm = (date, distance) => {
    const errorList = [];
    if ((/^[0-3][0-9]\.[0-1][0-9]\.[0-9]{4}$/).test(date)) {
      const [d, m, y] = date.split('.');
      if (d < 1 || m < 1 || y < 1 || d > 31 || m > 12) {
        errorList.push({ message: 'Неправильный формат даты' });
      }
    } else {
      errorList.push({ message: 'Неправильный формат даты' });
    }
    if (Number.isNaN(Number.parseFloat(distance))) {
      errorList.push({ message: 'Неправильно указано расстояние' });
    }
    return errorList;
  }

  const changeFormField = ({ date, distance, errorList }) => {
    setState((state) => ({
      ...state,
      form: {
        date,
        distance,
        errorList,
      },
    }))
  };

  const submitForm = () => {
    const errorList = validateForm(state.form.date, state.form.distance);
    if (errorList.length > 0) {
      setState((state) => ({
        ...state,
        form: {
          ...state.form,
          errorList
        },
      }));
      return;
    };
    const [d, m, y] = state.form.date.split('.');
    const date = new Date(y, m - 1, d).getTime();
    const { distance } = state.form;
    setState((state) => {
      const newNodeList = [];
      state.nodeList.forEach((n) => newNodeList.push({ ...n }));
      const node = newNodeList.find((n) => n.id === state.editableNodeId || n.date === date);
      if (node) {
        node.date = date;
        if (state.editableNodeId !== null) {
          node.distance = Number.parseFloat(distance);
        } else {
          node.distance += Number.parseFloat(distance);
        }
      } else {
        newNodeList.push(new Node(date, distance));
        newNodeList.sort((a, b) => b.date - a.date);
      }
      return {
        ...state,
        form: {
          date: '',
          distance: '',
          errorList: [],
        },
        editableNode: null,
        nodeList: newNodeList,
      }
    })
  }

  const editNode = (id) => {
    setState((state) => {
      const newNodeList = [];
      state.nodeList.forEach((n) => newNodeList.push({ ...n }));
      const node = newNodeList.find((n) => n.id === id);
      return {
        ...state,
        form: {
          ...state.form,
          date: DateTime.fromMillis(node.date).setLocale('ru').toFormat('dd.MM.yyyy'),
          distance: node.distance,
        },
        editableNodeId: id,
        nodeList: newNodeList,
      };
    });
  }

  const deleteNode = (id) => {
    setState((state) => {
      const newNodeList = [];
      state.nodeList.forEach((n) => newNodeList.push({ ...n }));
      const index = newNodeList.findIndex((n) => n.id === id);
      if (index !== -1) {
        newNodeList.splice(index, 1);
      }
      return {
        ...state,
        form: {
          ...state.form
        },
        nodeList: newNodeList,
      };
    });
  }


  return (
    <div className='TrainingRegister'>
      <NodeAddForm changeField={changeFormField} submitForm={submitForm} form={state.form} />
      <NodeListTable editNode={editNode} deleteNode={deleteNode} nodeList={state.nodeList} />
    </div>
  );
}