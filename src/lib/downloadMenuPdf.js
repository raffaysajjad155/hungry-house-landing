const MENU_PDF_URL = `${import.meta.env.BASE_URL}Hungry-House-Menu.pdf`;

export function downloadMenuPdf() {
  const link = document.createElement("a");
  link.href = MENU_PDF_URL;
  link.download = "Hungry-House-Menu.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default downloadMenuPdf;