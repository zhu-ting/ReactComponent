import * as React from 'react'
import {connect} from 'utils'
import * as cs from 'className'

interface Props {
  name?: string;
  label?: string;
  onChange?: (value:boolean,name:string) => void;
  value?:boolean;
  disabled?:boolean;
  className?:string;
}

const styles = {
  label:{
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative'
  },
  indicator:{
    position: 'absolute',
    top: -1,
    left: 0,
    background: '#f5f8fa',
    backgroundImage: 'liner-gradient(-180deg,#fff 0%,rgba(255,255,255,0.00) 100%)',
    boxShadow: 'inset 0 -1px 1px 0 rgba(16,22,26,0.10), inset 0 0 0 1px rgba(16,22,26,0.20)',
    borderRadius:2,
    width:20,
    heigth:20,
    boxSizing: 'content-box',
    appearance: 'none',
    margin: 0,
    display: 'block',
    textAlign: 'center',
    "&:before":{
      content:'"\\2713"',
      color: '#fff'
    },
    "&.checked":{
      background: '#137cbd'
    }
  },
  lebelText:{
    display: 'inline',
    marginLeft: 15
  }
}

class Check extends React.Component<Props & WithStyles>{
  constructor(props: Props&WithStyles){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({target}:React.changeEvent<HTMLInputElement>){
    let {value} = this.props;
    this.props.onChange(target.checked,target.name);
  }

  render(){
     let {name, label, classes, disabled, value} = this.props;
     let input = [
	<input key="1" type="checkbox" name={name} disabled={disabled} onChange={this.handleClick} defaultChecked={value}/>,
	<span key="2" className={cs(classes.indicator,{checked:value})}/>
	];
    return label?(
      <label className={classes.label}>
        {input}
        <div className={classes.labelText}>{label}</div>
     </label>
   ):(
     <span className={classes.label}>{input}</span>
   )
  }
}

export default connect<Props>(Check,{styles})
