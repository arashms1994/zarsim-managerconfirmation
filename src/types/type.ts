export interface IFileUploaderProps {
  orderNumber: string | null;
  subFolder: string;
  docType?: string;
}

export interface ICashListItem {
  ID: number;
  Title: string;
  count: string;
  due_date: string;
  reference_number: string;
  status: string;
  customer_GUID: string;
  bank_account: string;
  customer_title: string;
  description: string;
}

export interface ITableUIProps {
  data: ICashListItem[] | undefined;
  backgroundColor?: string;
}

export interface IFileDownloadLinkProps {
  customerGuid: string;
  itemGuid: string;
}

export interface IAttachmentFile {
  fileName: string;
  fileUrl: string;
}

export interface IFile {
  Name: string;
  ServerRelativeUrl: string;
}

export interface IChangePreInvoiceRowHistoryListItem {
  Id: number;
  Title?: string;
  printTitle?: string;
  printType?: string;
  productTittle?: string;
  colorFinalCode?: string;
  colorTitle?: string;
  packingTitle?: string;
  preInvoiceProductTitle?: string;
  finalGenerationCode?: string;
  finalProductCode?: string;
  packingCode?: string;
  orderNumber?: string;
  orderNumberRow?: string;
  productCode?: string;
  amount?: string;
  productionAmount?: string;
  price?: string;
  totalPrice?: string;
  productCatgory?: string;
  Created: string | Date;
  Modified: string | Date;
  Attachments?: boolean;
  ContentTypeId?: string;
  FileSystemObjectType?: number;
  GUID?: string;
  OData__UIVersionString?: string;
}
