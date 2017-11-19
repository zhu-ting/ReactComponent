import * as React from 'react'
import * as PropTypes from 'prop-types'
import { connect } from 'utils'

interface D {
  id: number;
  name: string;
}

interface Props {
  options: Array<D>;
}

interface Context {
  model: number;
  onRemove: (value:number) => void;
}

const styles = {

}

const Tag: React.SFC<Props&WithStyles> = ({options,classes}, {onRemove,model}: Context) =>{
  let option = options.find(({id}) => id === model)
  return (
    <div className={classes.tag}>
      {options?option.name:null}
      <div onClick={()=>onRemove(model)}>{classes.remove}</div>
    </div>
  )
}

Tag.contextTypes = {
  model: PropTypes.number,
  onRemove: PropTypes.func,
}

export default connect<Props>(Tag,{styles})
