export const getStatusLabel = (status: number | string | undefined): string => {
  switch (status?.toString()) {
    case "0":
      return "تعیین وضعیت نشده";
    case "1":
      return "تایید شده";
    case "2":
      return "رد شده";
    default:
      return "-";
  }
};
