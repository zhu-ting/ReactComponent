import PropTypes from "prop-types"
import React from "react"

export type MapModelToProps = (model: any, params?: any, editing?: boolean) => any

interface ChangeHandlers {
  [key: string]: (handler: any) => any
}

interface InjectedProp {
  editing: boolean
  onChange(value: any, name: string): void
}

function connectForm<C, T>(mapModelToProps: MapModelToProps, changeHandlers?: ChangeHandlers) {
  return (Comp: React.ComponentType<C & T & InjectedProp>) => {
    const ConnectView: React.SFC<C> = (props, { model, onChange, editing, params }) => {
      const nextModel = mapModelToProps(model, params, editing)
      let nextChangeHandlers = {}
      if (changeHandlers) {
        nextChangeHandlers = Object.keys(changeHandlers).reduce((c: { [key: string]: any }, key) => {
          c[key] = changeHandlers[key](onChange)
          return c
        }, {})
      }
      return <Comp {...props} {...nextChangeHandlers} {...nextModel} />
    }
    ConnectView.contextTypes = {
      model: PropTypes.object,
      onChange: PropTypes.func,
      editing: PropTypes.bool,
      params: PropTypes.object,
    }
    return ConnectView
  }
}

export default connectForm
