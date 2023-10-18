import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { filters, sortOptions } from './ProductData'

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../redux/products/actions'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material'

const minDistance = 10;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Product() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { loading, products, totalCount } = useSelector(state => state.product)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    //URL params
    const cartegory = searchParams.get('category')
    const size = searchParams.get('size')
    const stock = searchParams.get('stock')
    const maxPrice = searchParams.get('maxPrice')
    const minPrice = searchParams.get('minPrice')

    const [price, setPrice] = useState([0, 100])

    const [marks, setMarks] = useState([
        {
            value: 0,
            label: 'Min',
        },
        {
            value: 100,
            label: 'Max',
        },
    ])

    const priceChangeHandler = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        const newMarks = marks.map((item, index) => {
            if (index == 0 && activeThumb === 0) {
                let value = Math.min(newValue[0], price[1] - minDistance)
                value = value <= 0 ? 'Min' : `Rs ${value * 10}`
                item['label'] = value
            } else {
                if (index == 1 && activeThumb !== 0) {
                    let value = Math.max(newValue[1], price[0] + minDistance)
                    value = value === 100 ? 'Max' : `Rs ${value * 10}`
                    item['label'] = value
                }
            }
            return item
        })

        setMarks(newMarks)

        const searchParams = new URLSearchParams(location.search)

        if (activeThumb === 0) {
            const value = Math.min(newValue[0], price[1] - minDistance)
            setPrice([value, price[1]]);
            value > 0 ? searchParams.set('minPrice', (Math.min(newValue[0], price[1] - minDistance)) * 10) : searchParams.delete('minPrice')
        } else {
            const value = Math.max(newValue[1], price[0] + minDistance)
            setPrice([price[0], value]);
            value >= 100 ? searchParams.delete('maxPrice') : searchParams.set('maxPrice', value >= 100 ? 'max' : value * 10)
        }

        const query = searchParams.toString()
        navigate({ search: `?${query}` })
    };

    const handleFilters = (value, sectionId, isRadio = false) => {

        const searchParams = new URLSearchParams(location.search)
        let filterValue = searchParams.getAll(sectionId)

        if (isRadio) {
            filterValue = value
            searchParams.set(sectionId, filterValue)

        } else {
            if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
                filterValue = filterValue[0].split(',').filter(item => item !== value)

                if (filterValue.length == 0) {
                    searchParams.delete(sectionId)
                }
            } else {
                filterValue.push(value)
            }

            if (filterValue.length > 0) {
                searchParams.set(sectionId, filterValue.join(','))
            }
        }

        const query = searchParams.toString()
        navigate({ search: `?${query}` })
    }

    const paginationHandler = (event, value) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        dispatch(fetchAllProducts(cartegory, size, maxPrice, minPrice, currentPage, pageSize))
    }, [searchParams, currentPage]);

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-main-color">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-border-color">
                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-text-primary hover:text-border-color">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.type == "range" ? <Box sx={{ width: 280 }}>
                                                                    <Slider
                                                                        getAriaLabel={() => 'price'}
                                                                        value={price}
                                                                        onChange={priceChangeHandler}
                                                                        disableSwap
                                                                        step={15}
                                                                        marks={marks}
                                                                    />
                                                                </Box> : section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type={section.type}
                                                                            defaultChecked={option.checked}
                                                                            onChange={() => handleFilters(option.value, section.id, section.type == "radio" ? true : false)}
                                                                            className="h-4 w-4 rounded border-border-color text-text-primary font-Inter focus:ring-text-secondary"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm text-text-primary font-Inter"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                    <div className="flex items-baseline justify-between border-b border-border-color pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-text-primary font-Inter">New Arrivals</h1>

                        <div className="flex items-center">
                            <button type="button" className="-m-2 ml-5 p-2 text-text-primary hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-border-color py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-text-secondary hover:text-gray-500">
                                                        <span className="font-medium text-text-primary font-Inter">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.type == "range" ? <Box sx={{ width: 280 }}>
                                                            <Slider
                                                                getAriaLabel={() => 'price'}
                                                                value={price}
                                                                onChange={priceChangeHandler}
                                                                disableSwap
                                                                step={15}
                                                                marks={marks}
                                                            />
                                                        </Box> : section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type={section.type}
                                                                    defaultChecked={option.checked}
                                                                    onChange={() => handleFilters(option.value, section.id, section.type == "radio" ? true : false)}
                                                                    className="h-4 w-4 rounded border-border-color text-text-primary font-Inter focus:ring-text-secondary"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-text-primary font-Inter"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="md:col-span-3">
                                <div className='flex justify-center md:justify-start  items-start w-full h-full gap-5 flex-wrap scroll-pl-6'>
                                    {
                                        products.length > 0 ? products.map(product => <ProductCard product={product} />) : <h3 className='capitalize font-semibold text-center w-full font-Inter'>no product found</h3>
                                    }
                                </div>
                                <div className="w-full flex justify-end items-end mt-5">
                                    <Pagination count={totalCount} variant="outlined" shape="rounded" className='w-full flex justify-center items-center' onChange={paginationHandler} />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
