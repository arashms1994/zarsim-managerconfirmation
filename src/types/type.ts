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

interface Deferred {
  uri: string;
}

interface SharePointUser {
  Id: number;
  Title?: string;
  [key: string]: any;
}

interface SharePointMetadata {
  id: string;
  uri: string;
  etag: string;
  type: "SP.Data.ChangePreInvoiceRowHistoryListItem";
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
  Author?: SharePointUser | number;
  Editor?: SharePointUser | number;
  AttachmentFiles?: Deferred;
  Attachments?: boolean;
  ContentType?: Deferred;
  ContentTypeId?: string;
  FileSystemObjectType?: number;
  FirstUniqueAncestorSecurableObject?: Deferred;
  Folder?: Deferred;
  GUID?: string;
  GetDlpPolicyTip?: Deferred;
  ParentList?: Deferred;
  RoleAssignments?: Deferred;
  OData__UIVersionString?: string;
  __metadata: SharePointMetadata;
  [key: string]: any;
}
