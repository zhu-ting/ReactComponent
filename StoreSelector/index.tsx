import { Store } from "bindo-api-client"
import icons from "icons"
import * as React from "react"
import { match } from "react-router"
import { AppState } from "reducers"
import { connect } from "utils"
import Selector from "./Selector"

interface StateProps {
  stores: Store[]
  currentStoreIds: Array<Store["id"]>
}

interface Props {
  match: match<{storeId: string}>
}

interface State {
  show: boolean
}

class StoreSelector extends React.Component<Props&StateProps&WithStyles, State> {
  constructor(props: Props&StateProps&WithStyles) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      show: false,
    }
  }
  toggle() {
    this.setState(({show}) => ({show: !show}))
  }
  render() {
    const { classes, stores, currentStoreIds } = this.props
    const firstStore = stores.find((store) => currentStoreIds.includes(store.id))
    return (
      <div className={classes.container}>
        <div className={classes.wrapper} onClick={this.toggle}>
          <div className={classes.storeInfo}>
            {firstStore ? (
              <div className={classes.store}>
                {
                  currentStoreIds.length === 1 ? (
                    <div className={classes.info}>
                      <div className={classes.name}>{firstStore.title}</div>
                      <div className={classes.address}>{firstStore.address1}</div>
                    </div>
                  ) : currentStoreIds.length + " Store Selected"
                }
                <img src={firstStore.logoUrl} className={classes.avatar} />
              </div>
            ) : null}
          </div>
          <img src={icons.arrowDown} className={classes.indicator}/>
        </div>
        {this.state.show ? <Selector selected={currentStoreIds} stores={stores} toggle={this.toggle}/> : null}
      </div>
    )
  }
}

const styles = {
  container: {
    display: "flex",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  indicator: {
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 5,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 15,
  },
  storeInfo: {
    display: "flex",
  },
  store: {
     color: "#fff",
     display: "flex",
     alignItems: "center",
   },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginLeft: 10,
  },
}

export default connect<Props, StateProps, {}>(StoreSelector, {styles}, {
  mapStateToProps: ({stores, common: {currentStoreIds}}: AppState, props: Props) => ({
    currentStoreIds,
    stores,
    ...props,
  }),
})
