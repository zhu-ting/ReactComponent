import connect from './connect';
import {
  Check as _Check,
  Input as _Input,
  Select as _Select,
} from '../controls';

const changeable = connect(true)
const unchangeable = connect(false)

export const Input  = changeable(_Input)
export const Select = changeable(_Select)
export const Check = changeable(_Check)
export { default as RemoveButton } from './RemoveButton'
export { default as Tag } from './Tag'
