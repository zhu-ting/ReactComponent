import * as React from "react"
import { connect } from "utils"

const styles = {
  textArea: {
    backgroundColor: "#f7f7f7",
    border: "none",
    resize: "none",
  },
}

interface Props {
  name: string
  rows: number
  cols: number
  placeholder: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  classes?: Classes
}

function TextArea({name, rows, cols, onChange, classes, placeholder}: Props) {
  return (
    <textarea
      name={name}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      onChange={onChange}
      className={classes.textArea}
    />
  )
}

export default connect(TextArea, {styles})
