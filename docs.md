# مستندات پروژه — مدیریت اصلاحات پیش‌فاکتورها (zarsim-managerconfirmation)

## هدف پروژه

اپلیکیشن وب برای **مدیریت تأیید/رد اصلاحات پیش‌فاکتور** است. کاربران (مدیران) لیست درخواست‌های تغییر ردیف پیش‌فاکتور را می‌بینند و می‌توانند هر درخواست را تأیید یا رد کنند. با تأیید، داده‌ها در چندین لیست SharePoint به‌روزرسانی می‌شوند.

---

## توضیحات دولوپ

## 1 از پروژه BUILD گرفته شود

## 2 فایلهایی که در فولدر DIST ساخته میشود کپی گرفته شود

## 3 فایلهای ساخته شده در manager_confirmation جایگزاری شود

## 4 آدرس صفحه https://portal.zarsim.com/manager_confirmation/Forms/AllItems.aspx

---

## تکنولوژی‌ها

| دسته           | تکنولوژی                                               |
| -------------- | ------------------------------------------------------ |
| **فریم‌ورک**   | React 19                                               |
| **زبان**       | TypeScript 5.8                                         |
| **بیلد**       | Vite 7                                                 |
| **استایل**     | Tailwind CSS 4، tw-animate-css                         |
| **داده / کش**  | TanStack React Query 5                                 |
| **جدول**       | TanStack React Table 8                                 |
| **اجزای UI**   | Radix UI (checkbox, dropdown-menu, slot)، Lucide React |
| **اعلان**      | react-toastify                                         |
| **تاریخ شمسی** | jalali-moment                                          |
| **سایر**       | class-variance-authority، clsx، tailwind-merge         |

**محیط اجرا:** اپ به‌صورت اسکریپت/صفحه داخل SharePoint (مثلاً در `SitePages/managerConfirmation.aspx`) با `base: "/SitePages/managerConfirmation.aspx"` در Vite لود می‌شود.

**Base URL API:** `https://portal.zarsim.com`

---

## لیست‌هایی که از آن‌ها اطلاعات می‌گیریم (GET)

همه درخواست‌ها به `https://portal.zarsim.com` (به‌جز کاربر فعلی) با `credentials: "include"` ارسال می‌شوند.

| توضیح                                          | لیست / Endpoint              | GUID / مسیر                            | فیلتر / نکته                                                      |
| ---------------------------------------------- | ---------------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| **کاربر فعلی**                                 | `/_api/web/currentuser`      | از `_spPageContextInfo.webAbsoluteUrl` | برای چک دسترسی                                                    |
| **تاریخچه تغییر ردیف پیش‌فاکتور**              | `changePreInvoiceRowHistory` | getbytitle                             | `$orderby=ID desc`، expand Author,Editor                          |
| **بسته‌بندی (Bastebandi)**                     | لیست با GUID                 | `9B482D2A-67F6-451B-BBA1-A47E5ABD95C5` | `shomarefactor eq '...'`                                          |
| **بسته‌بندی شده (BastebandiShode)**            | لیست با GUID                 | `1788C718-E3CA-461C-AF37-23B1C970F9DC` | `shomarefactor eq '...'`                                          |
| **پیشرفت مراحل تولید (PishraftMarahelTolid)**  | لیست با GUID                 | `66184F05-6D40-473D-AE54-7E0C029BDEB2` | `shomaresefaresh eq '...'`                                        |
| **محصولات سفارش (OrderProducts)**              | لیست با GUID                 | `B749FB13-24C9-4404-8200-BCFA5DED5EDC` | بدون فیلتر (همه) یا OrderRowNo/LinkTitle/Title برای یافتن یک آیتم |
| **جزئیات فاکتور مشتری (DetailCustomerFactor)** | لیست با GUID                 | `C6636CFE-76E0-4E0F-B65F-C14893D3970E` | `parent_ditaile_code eq '...'`                                    |
| **برنامه تولید فرعی (SubProductionPlan)**      | لیست با GUID                 | `0F8D6219-AA01-4645-B8DE-25B796AB9C5F` | `shomareradiffactor eq '...'`                                     |
| **فاکتور مشتری (CustomerFactor)**              | لیست با GUID                 | `924CB941-E9F6-44E1-B0F1-EAE7C6C6B154` | `LinkTitle eq '...'` (orderNumber)                                |
| **Digest برای POST**                           | `/_api/contextinfo`          | —                                      | درخواست POST برای دریافت FormDigestValue                          |

---

## لیست‌هایی که به آن‌ها پست می‌زنیم (POST / MERGE)

همه درخواست‌های زیر با `credentials: "include"` و هدر `X-RequestDigest` (از `_api/contextinfo`) و در صورت آپدیت با `X-HTTP-Method: MERGE` و `IF-MATCH: "*"` ارسال می‌شوند.

| توضیح                                          | لیست                       | GUID                                   | عملیات                                                                                                                                                                                                                                             |
| ---------------------------------------------- | -------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **تاریخچه تغییر ردیف پیش‌فاکتور**              | ChangePreInvoiceRowHistory | `17062ABC-325C-48D5-B1ED-6D2C9308BEDB` | MERGE فقط فیلد `status` (۱=تأیید، ۲=رد)                                                                                                                                                                                                            |
| **جزئیات قدیم (کپی قبل از آپدیت)**             | Detail_OldList             | `52C118F7-4C75-451E-80BB-850AB912ECFF` | POST ایجاد آیتم جدید (فقط در مسیر STW ≥ ۴)                                                                                                                                                                                                         |
| **جزئیات فاکتور مشتری (DetailCustomerFactor)** | DetailCustomerFactor       | `c6636cfe-76e0-4e0f-b65f-c14893d3970e` | MERGE: آپدیت goodscode و در صورت STW≥۴ فقط meghdarjahattolid؛ در STW<۴ آپدیت کامل فیلدها                                                                                                                                                           |
| **بسته‌بندی (Bastebandi)**                     | Bastebandi                 | `9B482D2A-67F6-451B-BBA1-A47E5ABD95C5` | MERGE فیلدهای rang, chap, metraj, typebaste, jensebaste, sizebaste, shomaretarh, codemahsol, rangrokesh, bastebandie, name                                                                                                                         |
| **پیشرفت مراحل تولید (PishraftMarahelTolid)**  | PishraftMarahelTolid       | `66184F05-6D40-473D-AE54-7E0C029BDEB2` | MERGE برای هر آیتم مطابق shomaresefaresh: matnechap, rangrokesh, typename, bastebandi, codemahsol, shomaretarh, size, rangbandi, tolidbarnamei                                                                                                     |
| **برنامه تولید فرعی (SubProductionPlan)**      | SubProductionPlan          | `0F8D6219-AA01-4645-B8DE-25B796AB9C5F` | MERGE برای هر آیتم: meghdarkolesefaresh, bastebandi, rangrokesh, matnechap                                                                                                                                                                         |
| **بسته‌بندی شده (BastebandiShode)**            | BastebandiShode            | `1788C718-E3CA-461C-AF37-23B1C970F9DC` | MERGE: rang, typebaste, jensebaste, sizebaste, metrebaste, rangrokesh, shomaretarh, codemahsol, bastebandie, goodscode, packing_name, Size, sharhmahsolemoshtari, goods_title, code_15r, packing_code, coler_final_code, colertitle, metrajtahvili |
| **محصولات سفارش (OrderProducts)**              | OrderProducts              | `B749FB13-24C9-4404-8200-BCFA5DED5EDC` | MERGE: Color, CoverColor, PackLength, PackMaterial, PackSize, PackType, Packing, ProductionCode, code_goods, Title (با یافتن آیتم با OrderRowNo/LinkTitle/Title)                                                                                   |

---

## فلوهای کاری

### بارگذاری اولیه و نمایش جدول

1. **دریافت کاربر فعلی:** `getCurrentUser()` از `_spPageContextInfo.webAbsoluteUrl/_api/web/currentuser`.
2. **دریافت لیست تغییرات:** `getAllChangePreInvoiceRowHistoryList()` از لیست `changePreInvoiceRowHistory` (مرتب‌سازی بر اساس ID نزولی).
3. **فیلتر بر اساس دسترسی:** برای هر ردیف با `orderNumber` همان ردیف، `getCustomerFactorByOrderNumber(orderNumber)` صدا زده می‌شود. فقط اگر کاربر فعلی برابر `FirstUser` یا `managertext` فاکتور مشتری باشد (یا کاربر ادمین مثل `i:0#.w|zarsim\Rashaadmin`)، آن ردیف در جدول نمایش داده می‌شود.
4. جدول با ستون‌های: شماره ردیف پیش‌فاکتور (Title)، شرح محصول، تاریخ درخواست (شمسی)، عملیات (تأیید/رد یا وضعیت). جست‌وجوی سراسری و صفحه‌بندی (۵۰ رکورد در صفحه) فعال است.

### کلیک روی ردیف و مودال جزئیات

1. با کلیک روی یک ردیف، `selectedRowData` ست شده و مودال باز می‌شود.
2. در مودال با `rowData.Title` (شماره ردیف پیش‌فاکتور)، از `getAllDetailCustomerFactorList(rowData.Title)` (فیلتر `parent_ditaile_code eq Title`) داده گرفته می‌شود.
3. در مودال نمایش داده می‌شود: جزئیات در پیش‌فاکتور (از DetailCustomerFactor) و جزئیات اصلاحات (از rowData) و ثبت‌کننده.

### فلو تأیید (Approve)

1. کاربر روی دکمه تأیید کلیک می‌کند → حداقل ۳ ثانیه لودینگ (اسپینر و «در حال پردازش...») نمایش داده می‌شود.
2. مقدار **STW** ردیف بررسی می‌شود:

   **اگر STW ≥ ۴:**
   - یافتن آیتم DetailCustomerFactor با `parent_ditaile_code eq rowData.Title`.
   - ایجاد رکورد جدید در **Detail_OldList** (کپی آیتم فعلی).
   - آپدیت همان آیتم DetailCustomerFactor: فقط **goodscode** و **meghdarjahattolid** (با productionAmount).
   - اگر ردیفی با **shomarefactor** در Bastebandi پیدا شود → MERGE آن آیتم.
   - اگر ردیفی با **shomarefactor** در BastebandiShode پیدا شود → MERGE آن آیتم.
   - اگر ردیف(ها) با **shomaresefaresh** در PishraftMarahelTolid پیدا شود → MERGE همه آن آیتم‌ها.
   - اگر ردیف(ها) با **shomareradiffactor** در SubProductionPlan پیدا شود → MERGE همه آن آیتم‌ها.
   - آپدیت OrderProducts در صورت وجود آیتم با OrderRowNo/LinkTitle/Title برابر شماره ردیف پیش‌فاکتور.

   **اگر STW < ۴:**
   - یافتن آیتم DetailCustomerFactor با `parent_ditaile_code eq rowData.Title`.
   - MERGE **کامل** همان آیتم با فیلدهای اصلاحات (از جمله meghdarjahattolid = productionAmount).
   - آپدیت OrderProducts همان‌طور که بالا گفته شد.

3. در هر دو حالت در پایان، وضعیت ردیف در **ChangePreInvoiceRowHistory** با MERGE به **status = "1"** (تأیید شده) به‌روز می‌شود.
4. Toast موفقیت و invalidate کش لیست تغییرات (و در صورت لزوم کش DetailCustomerFactor).

### فلو رد (Reject)

1. کاربر روی دکمه رد کلیک می‌کند → حداقل ۳ ثانیه لودینگ نمایش داده می‌شود.
2. فقط یک درخواست MERGE به **ChangePreInvoiceRowHistory** برای همان آیتم با **status = "2"** (رد شده) ارسال می‌شود.
3. Toast موفقیت و invalidate کش لیست تغییرات.

---

## ساختار کلی کد

- **ورودی اپ:** `main.tsx` → `QueryProvider` + `App` + `ToastContainer`. `App` فقط `ChangeHistoryTable` را رندر می‌کند.
- **صفحه اصلی:** `ChangeHistoryTable`: جدول تاریخچه تغییرات، فیلتر بر اساس کاربر، جست‌وجو، صفحه‌بندی، کلیک ردیف برای مودال.
- **ستون عملیات:** `ActionsCell`: دکمه تأیید/رد، لودینگ حداقل ۳ ثانیه، به‌روزرسانی وضعیت بعد از پاسخ سرور.
- **مودال:** `Modal`: نمایش جزئیات پیش‌فاکتور و اصلاحات با داده از `useDetailCustomerFactor(rowData?.Title)`.
- **API:** `getData.ts` برای همه GETها، `addData.ts` برای همه POST/MERGEها و منطق تأیید/رد. `getDigest.ts` برای دریافت FormDigest.
- **تایپ‌ها:** `types/type.ts` (مثل IChangePreInvoiceRowHistoryListItem، IBastebandiListItem، …).

---

## نکات امنیتی و پیکربندی

- احراز هویت وابسته به کوکی/سشن SharePoint است؛ اپ باید از همان دامنه (مثلاً از صفحه روی `https://portal.zarsim.com`) لود شود تا `credentials: "include"` مؤثر باشد.
- همه GUID لیست‌ها در `getData.ts` و `addData.ts` ثابت هستند؛ در صورت جابه‌جایی یا تغییر لیست در SharePoint باید در کد به‌روز شوند.
- برای جلوگیری از خطای ۵۰۰ و مشکلات فیلتر، در فیلترهای OData از escape کردن تک‌کوتیش (`'` → `''`) و encode کردن کل عبارت `$filter` استفاده شده است.

این فایل خلاصه‌ای از لیست‌های GET/POST، تکنولوژی‌ها و فلوهای اصلی پروژه است.
