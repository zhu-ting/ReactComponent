import { Store } from "bindo-api-client"
import { Check } from "components/controls"
import * as React from "react"
import { connect } from "utils"
const defaultImg = "https://d25i28iur6fb9a.cloudfront.net/store_pictures/986/medium/store_picture.jpg?1482306656"

interface Props {
  store: Store
  isSelected: boolean
  onToggleSelect: (isSelected: boolean, storeId: Store["id"]) => void
  children?: React.ReactNode
  isBranch?: boolean
}

const styles = {
  group: {
    "&:first-of-type $branch:before": {
      marginTop: 25,
      height: 45,
    },
  },
  item: {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "height": 70,
    "paddingRight": 25,
    "paddingLeft": 10,
    "cursor": "pointer",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  info: {
    flexGrow: 1,
    marginLeft: 15,
  },
  name: {
    fontWeight: 900,
  },
  branch: {
    "height": 70,
    "width": 45,
    "&:before": {
      width: "50%",
      content: '""',
      borderStyle: "solid",
      borderWidth: "0px 0px 1px 1px",
      borderBottomColor: "#8A8D8F",
      borderLeftColor: "#8A8D8F",
      height: "100%",
      display: "block",
      left: "50%",
      position: "relative",
      bottom: "50%",
      boxSizing: "border-box",
    },
  },
}

function Item({store, classes, isSelected, onToggleSelect, children, isBranch}: Props&WithStyles) {
  return (
    <span className={classes.group}>
      <div
        className={classes.item}
        onClick={(e) => {
          e.preventDefault()
          onToggleSelect(!isSelected, store.id)
        }}
      >
        {isBranch ? <div className={classes.branch}/> : null}
        <img src={store.logoUrl ? store.logoUrl : defaultImg} className={classes.logo}/>
        <div className={classes.info}>
          <div className={classes.name}>{store.title}</div>
          <div>{store.address1}</div>
        </div>
        <Check value={isSelected}/>
      </div>
      {children}
    </span>
  )
}

export default connect<Props>(Item, {styles})
