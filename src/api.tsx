import axios from 'axios';
import { CompoundUnit, Product, ProductGroup, SalesInvoiceMaster, Tax, Unit, UserLogin } from './Models/Model';

export const getProducts = async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Product`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Product/${id}`);
    return data.data.data;
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
    const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}Product`, product);
    return data.data.data;
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
    const data = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}Product`, product);
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
    const data = await axios.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}Product/${id}`);
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Product/Tree`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup/${id}`);
    return data.data.data;
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
    const data = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup`, group);
    return data.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const putProductGroup  = async (group: ProductGroup) => {
  try {
    const data = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup`, group);
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
    const data = await axios.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}ProductGroup/${id}`);
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Depot`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Depot/${id}`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Unit`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Unit/${id}`);
    return data.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const convertUnits = async (defaultUnitID: number, currentUnitID: number, valueToConvert: number) => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Unit/Convert?defaultUnitID=${defaultUnitID}&currentUnitID=${currentUnitID}&valueToConvert=${valueToConvert}`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Unit/Related?baseUnitID=${baseUnitID}`);
    return data.data.data;
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
    const data = await axios.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}Unit/${id}`);
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
    const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}Unit`, unit);
    return data.data.data;
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
    const data = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}Unit`, unit);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound/${id}`);
    return data.data.data;
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
    const data = await axios.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound/${id}`);
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
    const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound`, unit);
    return data.data.data;
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
    const data = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}Unit/Compound`, unit);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice`);
    return data.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const navigateSalesInvoices = async (pageNo: number, rowPerPage: number ) => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice/Navigate?pageNo=${pageNo}&rowPerPage=${rowPerPage}`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice/${id}`);
    return data.data.data;
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
    const data = await axios.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice/${id}`);
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

export const postSalesInvoice = async (salesInvoice: SalesInvoiceMaster) => {
  try {
    const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice`, salesInvoice);
    return data.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

export const putSalesInvoice = async (salesInvoice: SalesInvoiceMaster) => {
  try {
    const data = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}SalesInvoice`, salesInvoice);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Tax`);
    return data.data.data;
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
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}Tax/${id}`);
    return data.data.data;
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
    const data = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}Tax`, tax);
    return data.data.data;
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
    const data = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}Tax`, tax);
    return data.data.data;
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
    const data = await axios.delete<any>(`${import.meta.env.VITE_API_ENDPOINT}Tax/${id}`);
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
    const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}Login`, userLogin);
    return data.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};

// for reports
export const getProfitSummaryReport = async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}GrossProfitSummary`);
    return data.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    return null;
  }
};