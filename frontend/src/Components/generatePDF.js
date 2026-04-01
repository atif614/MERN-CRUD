import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generatePDF = (products) => {
  const doc = new jsPDF();

  const tableColumn = [
    "Product Name",
    "Company",
    "Category",
    "Colour",
    "Price",
  ];

  const tableRows = products.map((item) => [
    item.name,
    item.company,
    item.category,
    item.colour,
    item.price,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    styles: {
      fillColor: [20, 20, 20],
      textColor: [255, 255, 255],
    },
    headStyles: {
      fillColor: [40, 40, 40],
    },
  });

  doc.save("products.pdf");
};

export default generatePDF; 