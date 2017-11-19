import * as React from 'react'
import Button, {Props} from 'components/controls/Button'
import * as PropTypes from 'prop-types'

type Diff <T extends string, U extends string> =(
  {[P in U]:P} & {[P in U]:never} & {[x:string]:never}
)[T];
type Omit<T,K extends keyof T> = Pick<T,Diff<keyof T,K>>;

interface Context {
  model: any;
  onRemove: (value:any) => void;
}

const RemoveButton: React.SFC<Omit<Props, 'onClick'>> = (props, {onRemove,model}:Context) => {
  return <Button {...props} onClick={()=>onRemove(model)}/>
}

RemoveButton.contextTypes = {
  model: PropTypes.object,
  onRemove: PropTypes.func,
}

export default RemoveButton
