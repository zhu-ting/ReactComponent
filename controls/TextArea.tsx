// 多行文本框组件
import * as cs from "classnames"
import * as React from "react"
import { connect } from "utils"
import { label as labelStyle, ctrl as ctrlStyle, staticStyle } from "./styles"

const styles = {
  textarea: {
    ...ctrlStyle,
    padding: 10,
    height: 140,
    resize: "none",
  },
  label: labelStyle,
  disabled: {
    border: "none",
    backgroundColor: "#f7f7f7",
  },
  static: staticStyle,
}

interface Props {
  name: string
  value?: string
  placeholder: string
  onChange?: (value: string, name: string) => void
  classes?: Classes
  label?: string
  className?: string
  static?: boolean
  disabled?: boolean
}

function Textarea({name, value, onChange, classes, className, placeholder, label, static: isStatic, disabled}: Props) {
  const changeHandler = onChange ?
    ({target: {name, value}}: React.ChangeEvent<HTMLTextAreaElement>) => onChange(value, name) :
    null
  value = value === null || value === undefined ? "" : value
  const textarea =
  (<textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
        className={cs(
          classes.textarea,
          {
            [className]: !label,
            [classes.disabled]: disabled,
            [classes.static]: isStatic,
          },
        )}
        disabled={disabled || isStatic}
  />
 )
  return label ?
   <label className={cs(className)}>
     <div className={classes.label}>
       {label}
     </div>
       {textarea}
   </label>
  : textarea
}

export default connect(Textarea, {styles})
