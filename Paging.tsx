import * as React from 'react'
import * as cs from 'classnames'

import { connect } from 'utils'

interface ChangeHandler {
  (page: number): void
}

interface Props {
  current: number;
  total: number;
  onChange: ChangeHandler;
}

const border = '1px solid #DBDBDB'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  paging: {
    borderTop: border,
    borderLeft: border,
    borderRadius: 4,
    display: 'flex',
    background: '#fff',
    '& > div': {
      width: 40,
      height: 43,
      borderRight: border,
      borderBottom: border,
      lineHeight: '43px',
      textAlign: 'center',
      cursor: 'pointer',
      '&.current': {
        backgroundColor: '#4A90E2',
        color: '#fff',
      },
      '&.disabled': {
        cursor: 'not-allowed'
      }
    }
  }
}

const RADIUS = 3
const MAX_WINDOW_SIZE = RADIUS * 2 + 1

function* gen(current: number, total: number, onChange: ChangeHandler ){
  let windowSize = total < MAX_WINDOW_SIZE?total:MAX_WINDOW_SIZE
  let min = Math.max(current-3, 1)
  let max = Math.min(current+3, total)
  if (max - min + 1 < windowSize){
    if (min === 1){
      max = windowSize
    } else {
      min = max - windowSize + 1
    }
  }
  for (let i = min; i <= max; i++){
    yield <div key={i} className={cs({current: i === current})} onClick={()=>onChange(i)}>{i}</div>
  }
  if (total > max){
    if(total > max + 2){
      yield <div key="e">...</div>
    }else if (total === max + 2) {
      let i = total-1
      yield <div key={i} className={cs({current: i === current})} onClick={()=>onChange(i)}>{i}</div>
    }
    yield <div key={total} className={cs({current: total === current})} onClick={()=>onChange(total)}>{total}</div>
  }
}

function Paging({current, total, classes, onChange}: Props&WithStyles) {
  let elems = []
  for ( let elem of gen(current, total, onChange)){
    elems.push(elem)
  }
  return (
    <div className={classes.container}>
      <div className={classes.paging}>
        <div key="f" className={cs({disabled: current === 1})} onClick={()=>onChange(1)}>&laquo;</div>
        <div key="p" className={cs({disabled: current === 1})} onClick={()=>onChange(current-1)}>&lsaquo;</div>
        {elems}
        <div key="n" className={cs({disabled: current === total})} onClick={()=>onChange(current+1)}>&rsaquo;</div>
        <div key="l" className={cs({disabled: current === total})} onClick={()=>onChange(total)}>&raquo;</div>
      </div>
    </div>
  )
}

export default connect<Props>(Paging, {styles})
