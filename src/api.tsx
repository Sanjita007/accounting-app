import axios from 'axios';

import {
  CompoundUnit,
  Product,
  ProductGroup,
  InvoiceMaster,
  Tax,
  Unit,
  UserLogin,
} from './Models/Model';
import api from './axiosInstance';

export const getProducts = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Product`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getProduct = async (id: number) => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Product/${id}`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const postProduct = async (product: Product) => {
  try {
    const data = await api.post(`${import.meta.env.VITE_API_ENDPOINT}Product`, product, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const putProduct = async (product: Product) => {
  try {
    const data = await api.put(`${import.meta.env.VITE_API_ENDPOINT}Product`, product, { 
      withCredentials: true });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const data = await api.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}Product/${id}`, { 
      withCredentials: true });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

// product Group

export const getProductGroups = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getProductTree = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Product/Tree`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getProductGroup = async (id: number) => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup/${id}`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const postProductGroup = async (group: ProductGroup) => {
  try {
    const data = await api.put(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup`, group, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const putProductGroup = async (group: ProductGroup) => {
  try {
    const data = await api.put(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup`, group, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const deleteProductGroup = async (id: number) => {
  try {
    const data = await api.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup/${id}`, { 
      withCredentials: true });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

// for Depot
export const getDepots = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Depot`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getDepot = async (id: number) => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Depot/${id}`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

// related to units

export const getUnits = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Unit`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getUnit = async (id: number) => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Unit/${id}`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const convertUnits = async (
  defaultUnitID: number,
  currentUnitID: number,
  valueToConvert: number,
) => {
  try {
    const data = await api.get(
      `${import.meta.env.VITE_API_ENDPOINT}Unit/Convert?defaultUnitID=${defaultUnitID}&currentUnitID=${currentUnitID}&valueToConvert=${valueToConvert}`,
     { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getRelatedUnits = async (baseUnitID: number) => {
  try {
    const data = await api.get(
      `${import.meta.env.VITE_API_ENDPOINT}Unit/Related?baseUnitID=${baseUnitID}`, { 
      withCredentials: true }
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const deleteUnit = async (id: number) => {
  try {
    const data = await api.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}Unit/${id}`, { 
      withCredentials: true });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const postUnit = async (unit: Unit) => {
  try {
    const data = await api.post(`${import.meta.env.VITE_API_ENDPOINT}Unit`, unit, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const putUnit = async (unit: Unit) => {
  try {
    const data = await api.put(`${import.meta.env.VITE_API_ENDPOINT}Unit`, unit, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

// related to units

export const getCompoundUnits = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getCompoundUnit = async (id: number) => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound/${id}`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const deleteCompoundUnit = async (id: number) => {
  try {
    const data = await api.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound/${id}`, { 
      withCredentials: true });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const postCompoundUnit = async (unit: CompoundUnit) => {
  try {
    const data = await api.post(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound`, unit, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const putCompoundUnit = async (unit: CompoundUnit) => {
  try {
    const data = await api.put(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound`, unit, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

// related to purchase invoice
export const getPurchaseInvoices = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}PurchaseInvoice`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const navigatePurchaseInvoices = async (pageNo: number, rowPerPage: number) => {
  try {
    const data = await api.get(
      `${import.meta.env.VITE_API_ENDPOINT}PurchaseInvoice/Navigate?pageNo=${pageNo}&rowPerPage=${rowPerPage}`, { 
      withCredentials: true }
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getPurchaseInvoice = async (id: number) => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}PurchaseInvoice/${id}`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const deletePurchaseInvoice = async (id: number) => {
  try {
    const data = await api.delete<any>(
      `${import.meta.env.VITE_API_ENDPOINT}PurchaseInvoice/${id}`, { 
      withCredentials: true }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const postPurchaseInvoice = async (purchInvoice: InvoiceMaster) => {
  try {
    const data = await api.post(
      `${import.meta.env.VITE_API_ENDPOINT}PurchaseInvoice`,
      purchInvoice, { 
      withCredentials: true }
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const putPurchaseInvoice = async (purchInvoice: InvoiceMaster) => {
  try {
    const data = await api.put(
      `${import.meta.env.VITE_API_ENDPOINT}PurchaseInvoice`,
      purchInvoice, { 
      withCredentials: true }
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

// related to invoice
export const getSalesInvoices = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const navigateSalesInvoices = async (pageNo: number, rowPerPage: number) => {
  try {
    const data = await api.get(
      `${import.meta.env.VITE_API_ENDPOINT}SalesInvoice/Navigate?pageNo=${pageNo}&rowPerPage=${rowPerPage}`, { 
      withCredentials: true }
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getSalesInvoice = async (id: number) => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice/${id}`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const deleteSalesInvoice = async (id: number) => {
  try {
    const data = await api.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice/${id}`, { 
      withCredentials: true });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const postSalesInvoice = async (salesInvoice: InvoiceMaster) => {
  try {
    const data = await api.post(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice`, salesInvoice, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const putSalesInvoice = async (salesInvoice: InvoiceMaster) => {
  try {
    const data = await api.put(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice`, salesInvoice);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

// for Taxes
export const getTaxes = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Tax`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getTax = async (id: number) => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Tax/${id}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const postTax = async (tax: Tax) => {
  try {
    const data = await api.put(`${import.meta.env.VITE_API_ENDPOINT}Tax`, tax, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const putTax = async (tax: Tax) => {
  try {
    const data = await api.put(`${import.meta.env.VITE_API_ENDPOINT}Tax`, tax, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const deleteTax = async (id: number) => {
  try {
    const data = await api.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}Tax/${id}`, { 
      withCredentials: true });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

//related to user login and authetication

export const userLogin = async (userLogin: UserLogin) => {
  try {
    //debugger;
    const data = await api.post(`${import.meta.env.VITE_API_ENDPOINT}Login`, userLogin, {
      withCredentials: true,
    });

    if (data.data.statusCode == 200) {
      localStorage.setItem('accessToken', data.data?.data?.token);
    }
    
    //console.log(data);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    throw error;
  }
};

// for reports
export const getProfitSummaryReport = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Report/GrossProfit`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const getInventorySummaryReport = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}Report/Inventory`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

// dashboard related 

export const getDashboardSalesPurch = async () => {
  try {
    const data = await api.get(`${import.meta.env.VITE_API_ENDPOINT}DahboardSummary/SalesPurch`, { 
      withCredentials: true });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};