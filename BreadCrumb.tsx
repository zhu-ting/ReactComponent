import * as React from 'react'

import { connect } from 'utils'
import * as cs from 'classnames'

interface Props {
  children: React.ReactNode;
}

const styles = {
  container: {
    paddingLeft:25,
    backgroundColor:"#fff",
    height:71,
    fontSize: 18,
    color: "#64727A",
    display: "flex",
    alignItems: 'center',
    '& > *:last-child': {
      color: '#4A90E2',
    }
  }
}

function* gen(children: React.ReactNode){
  let childrenArray = React.Children.toArray(children)
  yield childrenArray.shift()
  for ( let child of childrenArray){
    yield <div style={{margin: '0 5px'}}>/</div>
    yield child
  }
}

function BreadCrumb({classes, children}: Props&WithStyles) {
  let crumbs = []
  for ( let child of gen(children) ){
    crumbs.push(child)
  }
  return (
    <div className={classes.container}>{crumbs}</div>
  )
}

export default connect<Props>(BreadCrumb, {styles})
