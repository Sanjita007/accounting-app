// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import  { lazy } from 'react';
import { Navigate, createBrowserRouter } from "react-router";
import AboutUs from 'src/components/AboutUs/AboutUs';
import ContactUs from 'src/components/ContactUs/ContactUs';
import Home from 'src/components/Home/Home';
import Loadable from 'src/layouts/full/shared/loadable/Loadable';




/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// Dashboard
const Dashboard = Loadable(lazy(() => import('../views/dashboards/Dashboard')));

// For Products
const AddProduct = Loadable(lazy(() => import('src/components/Product/AddProduct')));
const ListProduct = Loadable(lazy(() => import('src/components/Product/ListProduct')));

// For sales invoice
const AddSalesInvoice = Loadable(lazy(() => import('src/components/Sales/AddSales')));
const ListSalesInvoice = Loadable(lazy(() => import('src/components/Sales/ListSales'))); 

// For tax
const AddTax = Loadable(lazy(() => import('src/components/Tax/AddTax')));
const ListTax = Loadable(lazy(() => import('src/components/Tax/ListTax'))); 

// utilities
const Typography = Loadable(lazy(() => import("../views/typography/Typography")));
const Table = Loadable(lazy(() => import("../views/tables/Table")));
const Form = Loadable(lazy(() => import("../views/forms/Form")));
const Alert = Loadable(lazy(() => import("../views/alerts/Alerts")));
const Buttons = Loadable(lazy(() => import("../views/buttons/Buttons")));

// icons
const Solar = Loadable(lazy(() => import("../views/icons/Solar")));

// authentication
const Login = Loadable(lazy(() => import('../views/auth/login/Login')));
const Register = Loadable(lazy(() => import('../views/auth/register/Register')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Error = Loadable(lazy(() => import('../views/auth/error/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Dashboard/> },
      { path: '/ui/typography', exact: true, element: <Typography/> },
      { path: '/ui/table', exact: true, element: <Table/> },
      { path: '/ui/form', exact: true, element: <Form/> },
      { path: '/ui/alert', exact: true, element: <Alert/> },
      { path: '/ui/buttons', exact: true, element: <Buttons/> },
      { path: '/home', exact: true, element: <Home/> },
      { path: '/about-us', exact: true, element: <AboutUs/> },
      { path: '/contact-us', exact: true, element: <ContactUs/> },

      // for Products
      { path: '/product/new/', exact: true, element: <AddProduct/> },
      { path: '/product', exact: true, element: <ListProduct/> },
      { path: '/product/edit/:id', exact: true, element: <AddProduct/> },

      // for Products
      { path: '/tax/new/', exact: true, element: <AddTax/> },
      { path: '/tax', exact: true, element: <ListTax/> },
      { path: '/tax/edit/:id', exact: true, element: <AddTax/> },

      // for Sales
      { path: '/sales-invoice/new', exact: true, element: <AddSalesInvoice/> },
      { path: '/sales-invoice', exact: true, element: <ListSalesInvoice/> },
      { path: '/sales-invoice/edit/:id', exact: true, element: <AddSalesInvoice/> },

      { path: '/icons/solar', exact: true, element: <Solar /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
  ,
];

const router = createBrowserRouter(Router)

export default router;
