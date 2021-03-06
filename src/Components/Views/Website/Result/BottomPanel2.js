import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import SplitPane, { Pane } from 'react-split-pane'
// import './style.css'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: 0,
    bottom: 0,
    width: '100%',
    // height: 400,
    position: 'absolute',
  },
  spanBar: {
    height: 15,
    backgroundColor: '#2e2e2e',
    margin: '-5px 0',
    borderTop: '5px solid rgba(255, 255, 255, 0)',
    borderBottom: '5px solid rgba(255, 255, 255, 0)',
    cursor: 'row-resize',
    width: '100%',
  }
}))

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const BottomPanel = props => {

  const classes = useStyles()

  const [topHeight, setTopHeight] = React.useState(400)
  const separatorYPosition = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mousemove", onMouseMove)

    return () => {
      document.addEventListener("mouseup", onMouseUp)
      document.removeEventListener("mousemove", onMouseMove)
    }
  })

  const onMouseDown = (e) => {
    console.log('onMouseDown', e.clientY)
    separatorYPosition.current = e.clientY
  }

  const onMouseUp = () => {
    separatorYPosition.current = null
  }

  const onMouseMove = (e) => {
    // console.log('onMouseMove', e)
    if (!separatorYPosition.current) {
      return
    }

    if (topHeight < 20) {
      separatorYPosition.current = null
      setTopHeight(20)
    }
    else if (topHeight > 870) {
      separatorYPosition.current = null
      setTopHeight(870)
    }
    else {
      const newTopHeight = topHeight - e.clientY + separatorYPosition.current
      separatorYPosition.current = e.clientY

      setTopHeight(newTopHeight)
    }


  }

  console.log('topHeight', topHeight)

  return (
    <div className={classes.root} style={{ height: `${topHeight}px` }}>
      <div className={classes.spanBar} onMouseDown={onMouseDown}></div>
      <Paper style={{ height: 'calc(100% - 15px)' }}>
        foo
      </Paper>
    </div>
  )
}

export default BottomPanel
