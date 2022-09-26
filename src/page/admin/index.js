import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlockForm, SeatBlock } from '../../components';
import * as SeatBlockStore from '../../store';
import '../../App.css';

const Admin = () => {
  const navigate = useNavigate()
  const [seatBlock, setSeatBlock] = useState([])
  const [disableForm, setDisableForm] = useState(false)

  useEffect(() => {
    const renderSeatBlock = e => {
      setDisableForm(true)
      const temp = seatBlock
      let row = []
      let i = 0
      while (i < e.detail.row) {
        row.push(i)
        i += 1
      }

      let column = []
      i = 0
      while (i < e.detail.column) {
        column.push(i)
        i += 1
      }

      temp.push(<SeatBlock id={temp.length + 1} name={e.detail.blockName} row={row} column={column} noTransform={false} />)
      SeatBlockStore.addBlock({
        name: e.detail.blockName,
        row: e.detail.row,
        column: e.detail.column,
        ticketType: e.detail.ticketType,
        transform: null
      })
      setSeatBlock([...temp])
    }

    window.addEventListener('renderSeatBlock', renderSeatBlock)

    return () => {
      window.removeEventListener('renderSeatBlock', renderSeatBlock)
    }
  }, [])

  return (
    <div className="App">
      {!disableForm ? <div className='block-form'>
        <BlockForm />
        <button onClick={() => {
          console.log(SeatBlockStore.getBlock())
          navigate('/client')
        }}>Save</button>
      </div> : <button onClick={() => setDisableForm(false)}>+</button>}
      <div style={{ width: '100%', height: '100%' }}>
        {seatBlock}
      </div>
    </div>
  );
}

export default Admin;
