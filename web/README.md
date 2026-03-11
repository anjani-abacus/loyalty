# loyalty_react_web

# Folder Structure for Modules:

src/
├── components/
│   └── data-table/
│       ├── DataTable.jsx
│       ├── DataTableHeader.jsx
│       ├── DataTablePagination.jsx
│       └── useDataTable.js
|
├── modules/
│   ├── users/
│   │   ├── index.jsx         // List (entery point of module)
│   │   ├── columns.jsx
│   │   ├── useData.js
│   │   ├── pages/
│   │   │   ├── Add.jsx         // add form
│   │   │   ├── Edit.jsx        // update form
│   │   │   └── Detail.jsx      // detail view
│   │   ├── forms/
│   │   │   └── Form.jsx        // reusable form for add/edit
│   │
│   ├── products/
│   │   ├── index.jsx         // List (entery point of module)
│   │   ├── columns.jsx
│   │   ├── useData.js
│   │   ├── pages/
│   │   │   ├── Add.jsx         // add form
│   │   │   ├── Edit.jsx        // update form
│   │   │   └── Detail.jsx      // detail view
│   │   ├── forms/
│   │   │   └── Form.jsx        // reusable form for add/edit
│   │
│   └── categories/
│   │   ├── index.jsx         // List (entery point of module)
│   │   ├── columns.jsx
│   │   ├── useData.js
│   │   ├── pages/
│   │   │   ├── Add.jsx         // add form
│   │   │   ├── Edit.jsx        // update form
│   │   │   └── Detail.jsx      // detail view
│   │   ├── forms/
│   │   │   └── Form.jsx        // reusable form for add/edit
│
├── layouts/
│   ├── AuthLayout.jsx     // before login (login/register pages)
│   └── AppLayout.jsx      // after login (with sidebar, header, footer)
│
├── routes/
│   └── AppRoutes.jsx      // define all routes
│
|── pages/
|   ├── auth/
|   │   ├── Login.jsx
|   │   └── Register.jsx
|   |── dashboard/
|   |   └── Dashboard.jsx
|   |
|── layouts/
|   ├── DataTable/
|   │   ├── index.jsx             // entry point (using - header, body, pagination) here
|   │   └── Header.jsx           // to manage header (tabs, refresh button, add button or other toolbars)
|   |   └── Pagination.jsx      // to manage pagination
|   |   └── useTableConfig.jsx // to manage all table configurations