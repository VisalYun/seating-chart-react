import React, { useEffect, useState, useRef } from 'react';
import Seat from './seat';
import ScalePoint from './ScalePoint';
import Rotator from './Rotator';
import * as SeatBlockStore from '../../store';
import { scale, rotate, translate, styler } from 'free-transform'
import './style.css';

const alphabet = "abcdefghijklmnopqrstuvwxyz"

const SeatBlock = ({ id, name, row, column, styleValue = null, noTransform = true }) => {
    const [seats, setSeats] = useState([])
    const [transformStyle, setTransformStyle] = useState(null)
    const [defaultValue, setDefaultValue] = useState(null)
    const [disableControls, setDisableControls] = useState(false)

    const generateSeatBlock = () => {
        const temp = []
        for (let i of row) {
            const rows = []
            rows.push(<p>{alphabet[i]}</p>)
            for (let j of column) {
                rows.push(<Seat id={`${alphabet[i]} ${j}`} number={j + 1} row={alphabet[i]} name={name} />)
            }
            temp.push(rows)
        }
        setSeats(temp)
    }

    const getScalePoint = (payload = null) => {
        setDisableControls(false)
        const block = document.getElementById(`blockRef${id}`)
        const temp = {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            width: block.clientWidth,
            height: block.clientHeight,
            angle: 0,
            disableScale: false
        }

        if (!defaultValue) {
            setDefaultValue(temp)
            setTransformStyle(styler(temp))
            SeatBlockStore.setBlockTransform(id - 1, temp)
            return
        }

        if (payload) {
            const style = { ...defaultValue, ...payload }
            setTransformStyle(styler(style))
            setDefaultValue(style)
            SeatBlockStore.setBlockTransform(id - 1, style)
            return
        }

        SeatBlockStore.setBlockTransform(id - 1, defaultValue)
        setTransformStyle(styler(defaultValue))
    }

    const handleTranslation = (event) => {
        if (noTransform) {
            return
        }
        event.stopPropagation();
        //getScalePoint()

        const drag = translate({
            x: defaultValue.x,
            y: defaultValue.y,
            startX: event.pageX,
            startY: event.pageY
        }, getScalePoint);

        const up = () => {
            //setDisableControls(true)
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', up);
        };

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', up);
    }

    const handleRotation = (event) => {
        if (noTransform) {
            return
        }
        event.stopPropagation();
        console.log(defaultValue, event)
        //getScalePoint()

        const drag = rotate({
            startX: event.pageX,
            startY: event.pageY,
            x: defaultValue.x,
            y: defaultValue.y,
            scaleX: defaultValue.scaleX,
            scaleY: defaultValue.scaleY,
            width: defaultValue.width,
            height: defaultValue.height,
            angle: defaultValue.angle,
            offsetX: 0,
            offsetY: 0
        }, getScalePoint);

        const up = () => {
            //setDisableControls(true)
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', up);
        };

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', up);
    }

    useEffect(() => {
        if (seats.length > 0) {
            getScalePoint()
            setDisableControls(true)
        }
    }, [seats])

    useEffect(() => {
        generateSeatBlock()
        console.log(name)

        if (styleValue) {
            setDefaultValue(styleValue)
        }
    }, [])

    return (transformStyle ? <div id={`blockRef${id}`} className={`block`}>
        <div className={`tr-transform`} onMouseDown={handleTranslation}>
            <div className={`tr-transform__content`} style={transformStyle?.element ?? {}}>
                <p>{name}</p>
                {seats.map(row => {
                    return <div className='row'>
                        {row}
                    </div>
                })}
            </div>
            {!disableControls ? <div className={`tr-transform__controls`} style={transformStyle?.controls ?? {}}>
                <ScalePoint position="tl" onMouseDown={(event) => console.log(event)} />
                <ScalePoint position="ml" onMouseDown={(event) => console.log(event)} />
                <ScalePoint position="tr" onMouseDown={(event) => console.log(event)} />
                <ScalePoint position="tm" onMouseDown={(event) => console.log(event)} />
                <ScalePoint position="mr" onMouseDown={(event) => console.log(event)} />
                <ScalePoint position="bl" onMouseDown={(event) => console.log(event)} />
                <ScalePoint position="bm" onMouseDown={(event) => console.log(event)} />
                <ScalePoint position="br" onMouseDown={(event) => console.log(event)} />
                <Rotator onMouseDown={handleRotation} />
            </div> : null}
        </div>
    </div> : <div id={`blockRef${id}`} className={`block`} onClick={getScalePoint}>
        {seats.map(row => {
            return <div className='row'>{row}</div>
        })}
    </div>)
}

export default SeatBlock;