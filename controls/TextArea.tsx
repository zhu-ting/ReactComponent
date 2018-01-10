import * as cs from "classnames"
import * as React from "react"
import { connect } from "utils"
import { label as labelStyle, ctrl as ctrlStyle, staticStyle } from "./styles"

const styles = {
  textArea: {
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
  placeholder: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  classes?: Classes
  label?: string
  className?: string
  static?: boolean
  disabled?: boolean
}

function TextArea({name, onChange, classes, className, placeholder, label, static: isStatic, disabled}: Props) {
  const textArea =
  (<textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={cs(
          classes.textArea,
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
       {textArea}
   </label>
  : textArea
}

export default connect(TextArea, {styles})
