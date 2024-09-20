import { TreeViewCategories_I } from '../../category/models/Categories_I';

export const categoriesMock: TreeViewCategories_I[] = [
  {
    id: '1',
    parent_id: null,
    label: 'Electronics',
    description: 'Electronics description',
    children: [
      {
        id: '2',
        parent_id: '1',
        label: 'Computers',
        description: 'Computers description',
        children: [
          {
            id: '3',
            parent_id: '2',
            label: 'Laptops',
            description: 'Laptops description',
            children: [
              {
                id: '4',
                parent_id: '3',
                label: 'Gaming Laptops',
                description: 'Gaming Laptops description',
                children: [],
              },
              {
                id: '5',
                parent_id: '3',
                label: 'Business Laptops',
                description: 'Business Laptops description',
                children: [],
              },
            ],
          },
          {
            id: '6',
            parent_id: '2',
            label: 'Desktops',
            description: 'Desktops description',
            children: [],
          },
        ],
      },
      {
        id: '7',
        parent_id: '1',
        label: 'Mobile Phones',
        description: 'Mobile Phones description',
        children: [
          {
            id: '8',
            parent_id: '7',
            label: 'Smartphones',
            description: 'Smartphones description',
            children: [],
          },
          {
            id: '9',
            parent_id: '7',
            label: 'Feature Phones',
            description: 'Feature Phones description',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '10',
    parent_id: null,
    label: 'Home Appliances',
    description: 'Home Appliances description',
    children: [
      {
        id: '11',
        parent_id: '10',
        label: 'Kitchen Appliances',
        description: 'Kitchen Appliances description',
        children: [
          {
            id: '12',
            parent_id: '11',
            label: 'Microwaves',
            description: 'Microwaves description',
            children: [],
          },
          {
            id: '13',
            parent_id: '11',
            label: 'Refrigerators',
            description: 'Refrigerators description',
            children: [],
          },
        ],
      },
      {
        id: '14',
        parent_id: '10',
        label: 'Laundry Appliances',
        description: 'Laundry Appliances description',
        children: [
          {
            id: '15',
            parent_id: '14',
            label: 'Washing Machines',
            description: 'Washing Machines description',
            children: [],
          },
          {
            id: '16',
            parent_id: '14',
            label: 'Dryers',
            description: 'Dryers description',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '17',
    parent_id: null,
    label: 'Sports & Outdoors',
    description: 'Sports & Outdoors description',
    children: [
      {
        id: '18',
        parent_id: '17',
        label: 'Camping',
        description: 'Camping description',
        children: [
          {
            id: '19',
            parent_id: '18',
            label: 'Tents',
            description: 'Tents description',
            children: [],
          },
          {
            id: '20',
            parent_id: '18',
            label: 'Sleeping Bags',
            description: 'Sleeping Bags description',
            children: [],
          },
        ],
      },
      {
        id: '21',
        parent_id: '17',
        label: 'Fitness Equipment',
        description: 'Fitness Equipment description',
        children: [
          {
            id: '22',
            parent_id: '21',
            label: 'Treadmills',
            description: 'Treadmills description',
            children: [],
          },
          {
            id: '23',
            parent_id: '21',
            label: 'Dumbbells',
            description: 'Dumbbells description',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '24',
    parent_id: null,
    label: 'Books',
    description: 'Books description',
    children: [
      {
        id: '25',
        parent_id: '24',
        label: 'Fiction',
        description: 'Fiction description',
        children: [
          {
            id: '26',
            parent_id: '25',
            label: 'Mystery',
            description: 'Mystery description',
            children: [],
          },
          {
            id: '27',
            parent_id: '25',
            label: 'Science Fiction',
            description: 'Science Fiction description',
            children: [],
          },
        ],
      },
      {
        id: '28',
        parent_id: '24',
        label: 'Non-Fiction',
        description: 'Non-Fiction description',
        children: [
          {
            id: '29',
            parent_id: '28',
            label: 'Biographies',
            description: 'Biographies description',
            children: [],
          },
          {
            id: '30',
            parent_id: '28',
            label: 'Self-Help',
            description: 'Self-Help description',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '31',
    parent_id: null,
    label: 'Fashion',
    description: 'Fashion description',
    children: [
      {
        id: '32',
        parent_id: '31',
        label: 'Men',
        description: 'Men Fashion description',
        children: [
          {
            id: '33',
            parent_id: '32',
            label: 'Clothing',
            description: 'Men Clothing description',
            children: [],
          },
          {
            id: '34',
            parent_id: '32',
            label: 'Shoes',
            description: 'Men Shoes description',
            children: [],
          },
        ],
      },
      {
        id: '35',
        parent_id: '31',
        label: 'Women',
        description: 'Women Fashion description',
        children: [
          {
            id: '36',
            parent_id: '35',
            label: 'Clothing',
            description: 'Women Clothing description',
            children: [],
          },
          {
            id: '37',
            parent_id: '35',
            label: 'Shoes',
            description: 'Women Shoes description',
            children: [],
          },
        ],
      },
    ],
  },
];
