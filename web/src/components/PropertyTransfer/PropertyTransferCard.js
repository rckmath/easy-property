import './PropertyTransferCard.css'
import * as React from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid, Tooltip } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { PropertyTransferStatus } from '../../pages/PropertyTransfer/PropertyTransferListing'
import OverflowTip from '../OverflowTooltip/OverflowTooltip'

const PropertyTransferCard = ({ props, payContract }) => {
  return (
    <Box sx={{ minWidth: 360, maxWidth: 380, boxShadow: '1px 2px 6x #888888', borderRadius: '6px', m: 2 }}>
      <Card variant="outlined" sx={{ maxHeight: 260 }}>
        <CardContent className="card">
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h6" component="div" gutterBottom>
                {props.name}
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: 'right', color: '#65ff7f' }}>
              {props.status === PropertyTransferStatus.COMPLETED ? <CheckCircleIcon /> : <></>}
            </Grid>
          </Grid>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            Proprietário atual: {props.owner}
          </Typography>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            Comprador: {props.buyer}
          </Typography>
          <br />
          <Typography align="justify" variant="body2" className="card-description">
            <OverflowTip>{props.description}</OverflowTip>
          </Typography>
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            <Typography sx={{ mb: 1.5, fontSize: 10, textOverflow: 'ellipsis' }} color="text.secondary" noWrap="true">
              {props.url}
            </Typography>
          </a>
          <Typography variant="h6" component="div" style={{ textAlign: 'right' }}>
            {props.price} ETH
          </Typography>
        </CardContent>
        <CardActions className="card-actions">
          <Button
            disabled={props.status === PropertyTransferStatus.COMPLETED}
            size="small"
            startIcon={props.status !== PropertyTransferStatus.COMPLETED ? <AttachMoneyIcon /> : <PaidIcon />}
            onClick={() => {
              payContract(props.contractAddress, props.price)
            }}
          >
            {props.status !== PropertyTransferStatus.COMPLETED ? 'PAGAR' : 'PAGO'}
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default PropertyTransferCard
