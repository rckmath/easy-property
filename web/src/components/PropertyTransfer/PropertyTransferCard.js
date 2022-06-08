import './PropertyTransferCard.css'
import * as React from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material'

const PropertyTransferCard = ({ props, payContract }) => {
  return (
    <Box sx={{ minWidth: 240 }}>
      <Card variant="outlined">
        <CardContent className="card">
          <Typography variant="h6" component="div" gutterBottom>
            {props.name}
          </Typography>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            Proprietário: {props.owner}
          </Typography>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            Comprador: {props.buyer}
          </Typography>
          <br />
          <Typography variant="body2">{props.description}</Typography>
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            <Typography sx={{ mb: 1.5, fontSize: 9 }} color="text.secondary">
              {props.url}
            </Typography>
          </a>
          <Typography variant="h6" component="div" style={{ textAlign: 'right' }}>
            {props.price} ETH
          </Typography>
        </CardContent>
        <CardActions className="card-actions">
          <Button
            size="small"
            onClick={() => {
              payContract(props.contractAddress, props.price)
            }}
          >
            Pagar
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default PropertyTransferCard
