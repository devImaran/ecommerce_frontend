export const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]

export const filters = [
    {
        id: 'size',
        name: 'Size',
        type: 'checkbox',       
        options: [
            { value: 'S', label: 'S', checked: false },
            { value: 'M', label: 'M', checked: false },
            { value: 'L', label: 'L', checked: false },
            { value: 'XL', label: 'XL', checked: false },
            { value: 'XXL', label: 'XXL', checked: false },
            { value: 'XXXL', label: 'XXXL', checked: false },
        ],
    },
    {
        id: 'price',
        name: 'Price',
        type: 'range', 
    },
    // {
    //     id: 'stock',
    //     name: 'Availability',
    //     type: 'radio',   
    //     options: [
    //         { value: 'NA', label: 'Out of stock', checked: false },
    //         { value: 'A', label: 'In Stock', checked: false },
    //     ],
    // },
]