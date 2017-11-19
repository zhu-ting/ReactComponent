import * as React from 'react'
import * as PropTypes from 'prop-types'
import Form from './index'

interface Props {
  children: React.ReactNode;
  name: string;
}

interface Context {
  model:{[key:string]:Array<any>},
  onChange: (value:any, name:string) => void
}

class Multiple extends React.Component<Props> {
  constructor(props:Props, context:Context){
    super(props,context);
    this.handleRemove = this.handleRemove.bind(this);
  }

  static contextTypes = {
    model: PropTypes.object,
    onChange: PropTypes.func,
  }

  handleRemove(value: any){
    let {name} = this.props;
    let {model,onChange} = this.context;
    let nextValue = model[name].filter((v:object)=> v !== value)
    onChange(nextValue,name)
  }

  render(){
    let {name, children} = this.props;
    let {model} = this.context;
    return model[name]?model[name].map((d:any,id:number)=>{
      <Form key={idx} model={d} onRemove={this.handleRemove}>{children}</Form>
    }):null
  }
}

export default Multiple
