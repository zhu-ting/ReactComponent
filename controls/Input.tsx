import * as React from 'react'
import { connect, Classes } from 'utils'

const styles = {
  input: {
    outline: 'none',
    border: 'none',
    borderRadius: 3,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,0.15), inset 0 1px 1px 0 rgba(16,22,26,0.20);',
    background: '#fff',
    height: 40,
    padding: '0 10px',
    verticalAlign: 'middle',
    lineHeight: 40,
    color: '#182026',
    fontSize: 16,
    fontWeight: 400,
    transition: 'box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9)',
    appearance: 'none',
    "&::placeholder": {
      color: 'rgba(92,113,128,0.5)'
    }
  }
}

interface Props {
  type: string;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void;
  classes: Classes;
}

function Input({type, name, onChange, classes, placeholder}: Props){
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={classes.input}
    />
  )
}

export default connect(Input, {styles})
