import PropTypes from "prop-types"
import React from "react"
import { ComponentType } from "react"
import { Invalid } from "./index"

interface Model {
  [key: string]: any
}

interface Props {
  name: string
  value?: (value: any, model: any) => any
  required?: boolean
}

interface ConnectedProps {
  value?: any
  onChange?: (value: any, name: string) => void
  validMsg?: string
  static?: boolean
}

type ControlProps = ConnectedProps & {
  name?: string
  ctrlRef?: (ctrl: HTMLInputElement) => void
}

type Unregister = () => void

interface Context {
  model: Model
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  invalid: Array<Invalid<any>>
  editing: boolean
  register: (control: any) => Unregister
}

const connect = (changable: boolean = false) => {
  const injectProps = <P extends Props>(props: P, context: Context) =>
    Object.assign(
      {
        value: props.value ? props.value(context.model[props.name], context.model) : context.model[props.name],
      },
      changable
        ? {
            onChange: context.onChange,
            static: !context.editing,
          }
        : null,
    )
  const contextTypes = Object.assign(
    {
      model: PropTypes.object,
    },
    changable
      ? {
          onChange: PropTypes.func,
          editing: PropTypes.bool,
          register: PropTypes.func,
        }
      : null,
  )
  return <T extends ControlProps>(Control: ComponentType<T>) => {
    type P = Omit<T, keyof ConnectedProps> & Props
    interface State {
      validMsg: string
    }
    return class ConnectedControl extends React.Component<P, State> {
      static contextTypes = contextTypes
      context: Context
      unregister: () => void
      ctrl: HTMLInputElement
      constructor(props: P, context: Context) {
        super(props, context)
        this.state = {
          validMsg: null,
        }
      }
      componentDidMount() {
        this.unregister = this.context.register(this)
      }
      componentWillUnmount() {
        this.unregister()
      }
      validate() {
        const { model } = this.context
        const { value, name } = this.props
        let v = model[name]
        v = value ? value(v, model) : v
        if (this.props.required && (!v && v !== 0)) {
          this.ctrl.focus()
          this.setState({ validMsg: "Required" })
          return {
            name,
            message: "Required",
          }
        }

        if (this.state.validMsg !== null) {
          this.setState({ validMsg: null })
        }
      }
      render() {
        return (
          <Control
            {...this.props}
            {...injectProps(this.props, this.context)}
            validMsg={this.state.validMsg}
            ctrlRef={ctrl => (this.ctrl = ctrl)}
          />
        )
      }
    }
  }
}

export default connect
