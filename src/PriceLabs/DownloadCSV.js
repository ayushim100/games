import React from "react";
import NewData from "./Data";

const DownloadCSV = ({ data, fileName, headers, priceData }) => {
  const headerMapping = {
    "Listing ID": "basicPropertyData.id",
    "Listing Title": "displayName.text",
    "Page Name": "basicPropertyData.pageName",
    "Amount Per Stay":
      "priceDisplayInfoIrene.priceBeforeDiscount.displayPrice.amountPerStay.amount",
  };

  const dynamicHeaders = (days) => {
    let newData = [];
    days[0].forEach((item) => {
      newData.push(item.checkin);
    });
    console.log(newData);
    let str = "";
    str += newData.join(",") + "\r\n";
    return str;
  };

  const extractPriceData = (entries) => {
    let str = "";
    entries.forEach((entry) => {
      entry.forEach((item) => {
        if (item.available) {
          str += item.avgPriceFormatted;
        } else {
          str += "-";
        }
        str += ",";
      });
      str += "\r\n";
    });
    return str;
  };

  const safeAccess = (obj, path) => {
    return path
      .split(".")
      .reduce((o, k) => (o && o[k] !== undefined ? o[k] : ""), obj);
  };

  const extractRequiredData = (results, headers) => {
    return results.map((listing) => {
      const extractedData = {};
      headers.forEach((header) => {
        const key = headerMapping[header];
        extractedData[header] = safeAccess(listing, key);
      });
      return extractedData;
    });
  };

  const basicHeaderString = (objArray, headers) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    str += headers.join(",") + "\r\n";
    return str;
  };

  const convertToCSV = (objArray, headers) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    str += headers.join(",") + "\r\n";

    array.forEach((item) => {
      const line = Object.values(item)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",");

      str += line + "\r\n";
    });
    return str;
  };

  const downloadCSV = () => {
    const extractedData = extractRequiredData(data, headers);
    const csvData = new Blob([convertToCSV(extractedData, headers)], {
      type: "text/csv",
    });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <button onClick={downloadCSV}>Download CSV</button>;
};

export default DownloadCSV;
