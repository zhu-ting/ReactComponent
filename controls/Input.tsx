// 输入框组件，验证规则为必填，否则红框
import * as cs from "classnames"
import * as React from "react"
import { connect } from "utils"
import { label as labelStyle, ctrl as ctrlStyle, staticStyle } from "./styles"

const styles = {
  wrapper: {
    width: "100%",
    position: "relative",
  },
  validMsg: {
    position: "absolute",
    top: "100%",
    color: "red",
    fontSize: 12,
    paddingTop: 3,
  },
  input: {
    ...ctrlStyle,
    padding: 10,
  },
  invalid: {
    "border": "1px solid #e24a5b",
    "color": "#e24a5b",
    "&:focus": {
      outlineColor: "#e24a5b",
    },
  },
  label: labelStyle,
  disabled: {
    border: "none",
    backgroundColor: "#f7f7f7",
  },
  static: staticStyle,
  required: {
    color: "red",
  },
}

interface Props {
  type?: string
  name?: string
  value?: string
  placeholder?: string
  onChange?: (value: string, name: string) => void
  className?: string
  disabled?: boolean
  label?: string
  validMsg?: string
  static?: boolean
  ctrlRef?: ( input: HTMLInputElement ) => void;
  required?: boolean
}

const Input: React.SFC<Props&WithStyles> = (
  {
    type,
    name,
    onChange,
    classes, placeholder, className, disabled, label, value, validMsg, static: isStatic, ctrlRef, required},
) => {
  const changeHandler = onChange ?
    ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => onChange(value, name) :
    null
  value = value === null || value === undefined ? "" : value
  const input = (
    <div className={classes.wrapper}>
      <input
        ref={ctrlRef}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={changeHandler}
        className={cs(
          classes.input,
          {
            [className]: !label,
            [classes.invalid]: !!validMsg,
            [classes.disabled]: disabled,
            [classes.static]: isStatic,
          },
        )}
        disabled={disabled || isStatic}
      />
      <div className={classes.validMsg}>{validMsg}</div>
    </div>
  )
  return label ? (
    <label className={cs(className)}>
      <div className={classes.label}>
        {label}
        {required && <span className={classes.required}>*</span>}
      </div>
      {input}
    </label>
  ) : input
}

Input.defaultProps = {
  type: "text",
}

export default connect<Props>(Input, { styles })
