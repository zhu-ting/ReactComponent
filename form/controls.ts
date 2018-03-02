import {
  Check as _Check,
  CheckGroup as _CheckGroup,
  Input as _Input,
  Select as _Select,
  SelectInput as _SelectInput,
  TextArea as _TextArea,
} from "../controls"
import connect from "./connectControl"
import _TypedSelect from "components/controls/TypedSelect"

const changable = connect(true)
export const unchangable = connect(false)

export const Input = changable(_Input)
export const Select = changable(_Select)
export const Check = changable(_Check)
export const CheckGroup = changable(_CheckGroup)
export const SelectInput = changable(_SelectInput)
export const TextArea = changable(_TextArea)
export const TypedSelect = changable(_TypedSelect)
export { default as RemoveButton } from "./RemoveButton"
export { default as Tag } from "./Tag"
