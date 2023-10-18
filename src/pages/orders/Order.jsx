import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, Step, StepLabel, Stepper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/order/actions';
import { Link } from 'react-router-dom';

const steps = ['PENDING', 'PACKED', 'SHIPPED', 'DELIVERED'];


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const activeStep = row?.orderStatus === 'PENDING'? 1: row?.orderStatus === 'PACKED' ?2 : row?.orderStatus === 'SHIPPED'? 3: 4

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell >{`${row?.paymentDetails?.paymentMethods} & ${row?.paymentDetails?.paymentStatus}`}</TableCell>
        <TableCell >{row?.orderDate}</TableCell>
        <TableCell >{row?.deliveryDate}</TableCell>
        <TableCell >{`${row?.shippingAddress?.address} ,Mob - ${row?.shippingAddress?.phoneNumber}`}</TableCell>
        <TableCell >Rs {row?.totalPrice}</TableCell>
        <TableCell >{row?.orderItems?.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Product & Delivery Status
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.orderItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row">
                        <Link to={`/shop/product-detail/${item?.productId?._id}`}>
                          <div className='flex justify-start items-center gap-5'>
                            <img src={item?.productId?.images[0]} width="70px" height="70px" className='overflow-hidden rounded-lg object-cover object-left-top' />
                            <p className='font-semibold'>{item?.productId?.name}</p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{item?.quantity}</TableCell>
                      <TableCell>{item?.size}</TableCell>
                      <TableCell>
                        Rs {item?.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={4}>
                      <Stepper activeStep={activeStep} className='py-5'>
                        {steps.map((label, index) => {
                          const stepProps = {};
                          const labelProps = {};
                          return (
                            <Step key={label} {...stepProps}>
                              <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Order() {
  const dispatch = useDispatch()
  const { myOrders } = useSelector(state => state.orders)


  useEffect(() => {
    dispatch(fetchOrders())
  }, [])
  return (
    <Container className='py-5 '>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order Id</TableCell>
              <TableCell >Payment Method & status </TableCell>
              <TableCell >Order Date</TableCell>
              <TableCell >Delivery date</TableCell>
              <TableCell >Address</TableCell>
              <TableCell >Total Price </TableCell>
              <TableCell >Total Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myOrders.length > 0 ? myOrders.map((row) => <Row key={row} row={row} /> ) : <h4>No order</h4>}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
