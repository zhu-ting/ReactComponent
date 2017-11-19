import * as React from 'react';
import * as PropTypes from 'prop-types';

interface Props {
  model: object;
  children: React.ReactNode;
  onChange?: (value: any, name:string) => void;
  onRemove?: (value: any) => void
}

interface State {
  model: object
}

class Form extends React.component<Props,State> {
  constructor(props:Props){
    super(props);

  }
  static childContextType = {
   model: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
   onChange: PropTypes.func,
   onRemove: PropTypes.func
  }

  getChildContext(){
    return{
      model: this.props.model,
      onChange: this.props.onChange,
      onRemove: this.props.onRemove
    }
  }

  render(){
    this.props.children
  }
}

export default Form
export { default as Multiple } from './Multiple'
