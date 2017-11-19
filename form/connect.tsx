import * as React from 'react'
import { Component, SFC, ComponentType } from 'react'
import * as PropsType from 'prop_types'

type Diff<T extends string, U extends string> = (
  {[P in T]:P} & {[P in U]:never} & {[x: string]:never}
)[T];
type Omit<T, K extends keys of T> = Pick<T, Diff<keyof T, K>>;

interface Props {
  name?: String
}

interface ConnectedProps {
  value?: any;
  onChange?: (value:any, name:string) => void;
}

type ControlProps = Props & ConnectedProps;

interface Context {
  model:{[key: string]: string};
  onChange?: (event:React.ChangeEvent<HTMLInputElement>)=>void;
}

const connect = (changeable:boolean = false) => {
  const injectProps =<P extends Props>(props:p, context:Context) => Object.assign(
    {model: context.model[props.name]}, changeable?{onChange:context.onChange}:null
 );
  const contextType:SFC['contextType'] = Object.assign(
   {model: PropsTypes.object}, changeable?{onChange:PropsTypes.func}:null
 );
 return <T extends ControlProps>(control: ComponentType<T>) =>{
   const ConnectedControl: SFC<Omit<T, keyof ConnectedProps> & Props> = (props, context:Context) =>(
     <Control {...props} {...injectProps(props, context)} />
   )
   ConnectedControl.contextTypes = contextTypes
   return ConnectedControl
 }
}

export default connect
