import { Store } from "bindo-api-client"
import * as React from "react"

import {Intent, PopOver} from "components"
import {Button} from "components/controls"
import { Location, LocationDescriptor } from "history"
import { push } from "react-router-redux"
import { AppState } from "reducers"
import {connect} from "utils"
import Item from "./Item"

interface Props {
  selected: Array<Store["id"]>
  toggle: () => void
  stores: Store[]
}

interface StateProps {
  location: Location
}

interface DispatchProps {
  push: (location: LocationDescriptor) => void
}

interface State {
  selected: Set<Store["id"]>
}

interface Group {
  store: Store
  children: Store[]
}

const borderStyle = "1px solid #E2E2E6"
const styles = {
  list: {
    maxHeight: 333,
    overflowY: "scroll",
    userSelect: "none",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "transparent",
    borderBottom: borderStyle,
  },
  headerText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    paddingTop: 5,
    color: "#627584",
  },
  buttonGroup: {
    "@global > *": {
      marginLeft: 20,
    },
  },
  container: {
    backgroundColor: "#f6f9fc",
    width: 500,
  },
}

class Selector extends React.Component<Props&WithStyles&StateProps&DispatchProps, State> {
  constructor(props: Props&WithStyles&StateProps&DispatchProps) {
    super(props)
    this.toggleSelectAll = this.toggleSelectAll.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleApply = this.handleApply.bind(this)
    const selected = new Set(this.props.selected)
    this.state = {
      selected,
    }
  }
  toggleSelectAll(isSelelct: boolean) {
    let selected
    if (isSelelct) {
      selected = new Set(this.props.stores.map(({id}) => id))
    } else {
      selected = this.state.selected
      selected.clear()
    }
    this.setState({selected})
  }
  handleApply() {
    const {selected} = this.state
    let {pathname} = this.props.location
    const ids: number[] = []
    selected.forEach((id) => ids.push(id))
    const secendSlashIdx = pathname.indexOf("/", 1)
    pathname = `/${ids.join(",")}${pathname.substring(secendSlashIdx)}`
    this.props.push({pathname})
    this.props.toggle()
  }
  handleCheck(isChecked: boolean, id: number) {
    const {selected} = this.state
    if ( isChecked ) {
      selected.add(id)
    } else {
      selected.delete(id)
    }
    this.setState({selected})
  }
  render() {
    const {stores, classes} = this.props
    const {selected} = this.state
    const groups: Group[]  = []
    let allChildren: Store[] = []
    stores.forEach((store) => {
      if ( !allChildren.includes(store) && !stores.find(({id}) => id === store.parentId) ) {
        const children = stores.filter((s) => s.parentId === store.id)
        allChildren = [...allChildren, ...children]
        groups.push({
          store,
          children,
        })
      }
    })
    return (
      <PopOver isOpen onClose={this.props.toggle} position={{left: -50, top: 30}} offset={-200}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.headerText}>Switch Store</div>
            <div className={classes.buttonGroup}>
              <Button onClick={this.toggleSelectAll.bind(this, false)}>Deselect All</Button>
              <Button onClick={this.toggleSelectAll.bind(this, true)}>Select All</Button>
              <Button
                onClick={this.handleApply}
                intent={Intent.PRIMARY}
                disabled={selected.size === 0}
              >
                Apply
              </Button>
            </div>
          </div>
          <div className={classes.list}>
            {groups.map(({store, children}, idx) => (
              <Item store={store} isSelected={selected.has(store.id)} onToggleSelect={this.handleCheck} key={store.id}>
                {children.map((child) => (
                  <Item
                    store={child}
                    isSelected={selected.has(child.id)}
                    onToggleSelect={this.handleCheck}
                    isBranch
                    key={child.id}
                  />
                ))}
              </Item>
            ))}
          </div>
        </div>
      </PopOver>
    )
  }
}

function mapStateToProps({router}: AppState): StateProps {
  return {
    location: router.location,
  }
}

export default connect<Props, StateProps, DispatchProps>(Selector, {styles}, {
  mapStateToProps,
  mapDispatchToProps: {
    push,
  },
})
