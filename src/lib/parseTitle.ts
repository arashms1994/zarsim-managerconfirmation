export const parseProductTitle = (productTitle: string) => {
  try {
    const parts = productTitle.split("-");

    if (parts.length >= 4) {
      return {
        Grade: parts[1] || "",
        PhaseSection: parts[2] || "",
        ProductSize: parts[3] || "",
      };
    }

    return {
      Grade: "",
      PhaseSection: "",
      ProductSize: "",
    };
  } catch (error) {
    console.warn("خطا در تجزیه productTitle:", error);
    return {
      Grade: "",
      PhaseSection: "",
      ProductSize: "",
    };
  }
};
