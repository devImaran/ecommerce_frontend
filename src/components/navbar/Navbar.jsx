import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavbarData } from './NavbarData'


//material ui
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AuthModal from '../authModal.js/AuthModal'
import { useSelector, useDispatch } from 'react-redux'
import { logout, openAuthModal } from '../../redux/Auth/Actions'
import { categoriesWiseProducts } from '../../redux/categories/actions'
import { Link, useNavigate } from 'react-router-dom'
import { userCartItems } from '../../redux/cart/actions'
import Cart from '../cart/Cart'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = useSelector(state => state.auth)
  const { isNewItemAdded, cartItems } = useSelector(state => state.cart)
  const { categoriesList, loading } = useSelector(state => state.category);

  const [open, setOpen] = useState(false)
  const [openCartModal, setOpenCartModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout())
    handleClose()
  }

  const navigationHandler = (categoryId, sectionId, itemId) => {
    setOpen(false)
    navigate(`/shop/list?category=${categoryId},${sectionId},${itemId}`)
  }

  useEffect(()=>{
    console.log("navbar called again")
  },[])

  useEffect(() => {
    dispatch(categoriesWiseProducts())
  }, [])

  useEffect(() => {
    if (auth.userDetails && auth.userDetails._id) {
      dispatch(userCartItems())
    }
  }, [auth.userDetails, isNewItemAdded])

  return (
    <div className="bg-white border-b border-border-color">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-border-color">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {categoriesList && categoriesList?.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-second-color text-second-color' : 'border-transparent text-text-primary',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium uppercase font-Inter'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {categoriesList && categoriesList?.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        {category.subCategories.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className=" text-main-color font-semibold font-Inter capitalize">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.subCategories.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <span onClick={() => navigationHandler(category._id, section._id, item._id)} className="-m-2 block p-2 text-text-primary font-semibold font-Inter capitalize">
                                    {item.name}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-border-color px-4 py-6">
                  {
                    (auth.userDetails && auth.userDetails._id) ?
                      <Tooltip title="Account settings" className='flex md:hidden'>
                        <div className='flex justify-start items-start gap-2 cursor-pointer' onClick={handleClick}>
                          <img src={auth.userDetails?.profilePic} alt="profile photo" className='w-[45px] h-[45px] overflow-hidden rounded-[50%]' />
                          <div className='flex flex-col justify-start items-start '>
                            <p className='capitalize text-[12px] text-[#C0C3C6]'> good morning</p>
                            <p className='capitalize text-[17px] text-second-text font-bold'>{auth.userDetails.name}</p>
                          </div>
                        </div>
                      </Tooltip>
                      :
                      <div className='flex md:hidden'>
                        <p className="text-sm font-semibold text-main-color font-Inter hover:text-second-color cursor-pointer" onClick={()=>dispatch(openAuthModal())}>
                          Sign in / sign up
                        </p>
                      </div>
                  }
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-main-color px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=500"
                    alt="company logo"
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                <div className="flex h-full space-x-8">
                  {categoriesList && categoriesList?.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-b-2 border-second-color text-second-color uppercase outline-none'
                                  : 'border-transparent text-[#1D364D] uppercase outline-none',
                                'relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category?.subCategories?.map((section) => (
                                        <div key={section._id}>
                                          <p id={`${section.name}-heading`} className="text-[15px] font-bold text-second-color uppercase">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section?.subCategories?.map((item) => (
                                              <li key={item._id} className="flex">
                                                <span onClick={() => navigationHandler(category._id, section._id, item._id)} className="font-medium ease-in duration-300 text-second-color hover:font-bold uppercase">
                                                  {item.name}
                                                </span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openProfile}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div> */}

                {/* Cart */}
                {(auth.userDetails && auth.userDetails._id) && <div className="ml-4 flow-root mx-6">
                  <div className="group -m-2 flex items-center p-2 cursor-pointer border border-main-color relative rounded-full z-10">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-border-color group-hover:text-gray-500 relative"
                      aria-hidden="true"
                      onClick={() => setOpenCartModal(true)}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 absolute top-[-5%] left-[45%] z-20 bg-main-color px-2 rounded-full text-white">{cartItems.userCartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </div>
                </div>}

                {
                  (auth.userDetails && auth.userDetails._id) ?
                    <Tooltip title="Account settings" className='hidden md:flex'>
                      <div className='flex justify-center items-center gap-2 cursor-pointer ml-5' onClick={handleClick}>
                        <img src={auth?.userDetails?.profilePic} alt="profile photo" className='w-[45px] h-[45px] overflow-hidden rounded-[50%]' />
                        <div className='flex flex-col justify-start items-start '>
                          <p className='capitalize text-[12px] text-[#C0C3C6]'> good morning</p>
                          <p className='capitalize text-[17px] text-second-text font-bold'>{auth?.userDetails?.name}</p>
                        </div>
                      </div>
                    </Tooltip> :
                    <div className="hidden md:flex">
                      <p className="ml-5 text-sm font-semibold text-main-color font-Inter capitalize hover:text-second-color cursor-pointer" onClick={()=>dispatch(openAuthModal())}>
                        Sign in
                      </p>
                    </div>
                }
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal />
      <Cart open={openCartModal} setOpen={setOpenCartModal} />
    </div>
  )
}
