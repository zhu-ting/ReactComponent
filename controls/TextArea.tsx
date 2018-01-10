import * as cs from "classnames"
import * as React from "react"
import { connect } from "utils"
import { label as labelStyle, ctrl as ctrlStyle } from "./styles"

const styles = {
  textArea: {
    ...ctrlStyle,
    padding: 10,
    height: 140,
    resize: "none",
  },
  label: labelStyle,
}

interface Props {
  name: string
  placeholder: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  classes?: Classes
  label?: string
  className?: string
}

function TextArea({name, onChange, classes, className, placeholder, label}: Props) {
  const textArea =
  (<textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={classes.textArea}
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
