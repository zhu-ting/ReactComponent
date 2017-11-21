import { connect as reduxConnect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux'
import injectSheet from 'react-jss'
import { ComponentType } from 'react'
import i18nConnect from './i18nConnect'
import { match } from 'react-router'

import asyncLoadFn from './asyncLoad'

interface Properties {
  [name: string]: string | number | Properties;
}

interface Selectors {
  [selector: string]: Properties
}

interface JssParams {
  styles: Selectors
}

interface ReduxParams<TStateProps={}, TDispatchProps={}, TOwnProps={}> {
  mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps>,
  mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
}

interface Connect {
  <Props>(
    component: ComponentType<Props & WithStyles>, jss: JssParams
  ): ComponentType<Props>
    
  <Props, StateProps, DispatchProps={}>(
    component: ComponentType<Props & WithStyles & StateProps & DispatchProps>, jss: JssParams, redux: ReduxParams<StateProps, DispatchProps>
  ): ComponentType<Props>
  
  <Props, StateProps, DispatchProps={}>(
    component: ComponentType<Props & StateProps & DispatchProps>, jss: JssParams, redux: ReduxParams<StateProps, DispatchProps>
  ): ComponentType<Props>

  
  <Props>(
    component: ComponentType<Props & WithStyles & WithRes>, jss: JssParams, redux: null, resKey: string
  ): ComponentType<Props>

  
  <Props, StateProps, DispatchProps={}>(
    component: ComponentType<Props & WithStyles & StateProps & DispatchProps>,
    jss: JssParams,
    redux: ReduxParams<StateProps, DispatchProps>,
    resKey: string
  ): ComponentType<Props>
}

const connectWithJss: Connect = ( component: ComponentType<any>, jss?: JssParams, redux?: ReduxParams, resKey?: string ) => {
  if (redux){
    component = reduxConnect(redux.mapStateToProps, redux.mapDispatchToProps)(component)
  }
  if (jss){
    component = injectSheet(jss.styles)(component)
  }
  if (resKey){
    component = i18nConnect(resKey)(component)
  }
  return component
}

export const connect = connectWithJss

export const asyncLoad = asyncLoadFn

export const currentTimestamp = () => Math.floor(Date.now()/1000)

