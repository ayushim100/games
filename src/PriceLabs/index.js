import "./index.css";
import DownloadCSV from "./DownloadCSV";
import { useEffect, useState } from "react";
import { API } from "./api";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  TextField,
} from "@mui/material";
import OldData from "./OldData.js";

function PriceLabs() {
  const userHeaders = [
    "Listing ID",
    "Listing Title",
    "Page Name",
    "Amount Per Stay",
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [address, setAddress] = useState("Bangalore");
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await API.request(pageSize, address);
      const x = await data.json();
      setData(x);
      x.data?.searchQueries?.search?.results.forEach((item)=> {
        console.log(item.basicPropertyData.pageName);
        fetchPrice(item.basicPropertyData.pageName, "");
      })
    } catch (error) {
      setData(OldData)
      console.error(error);
    }
  };

  const fetchPrice = async(pageName, startDate) => {
    try {
      const data = await API.requestPrice(pageName);
      const d = await data.json();
      const hotelId = d.data.availabilityCalendar.hotelId.toString();
      const obj = {};
      obj[hotelId] = d.data.availabilityCalendar.days
      setPriceData((prevState)=> ({
        ...prevState,
        ...obj
      }))
    } catch (error) {

    }
  }
  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TextField sx={{mb:3}} value={pageSize} label="Page Size" onChange={(e)=> {
          setPageSize(e.target.value)
        }} />
        <TextField sx={{mb:3}} value={address} label="Page Size" onChange={(e)=> {
          setAddress(e.target.value)
        }} />
        <FormControl sx={{ mb: 3, width: "50%" }}>
          <InputLabel id="multi-select-label">Select Headers</InputLabel>
          <Select
            labelId="multi-select-label"
            multiple
            value={selectedOptions}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {userHeaders.map((header) => (
              <MenuItem key={header} value={header}>
                <Checkbox checked={selectedOptions.indexOf(header) > -1} />
                <ListItemText primary={header} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button sx={{mb:3}} onClick={fetchData}>Fetch Data</button>
        <DownloadCSV
          data={data?.data?.searchQueries?.search?.results}
          priceData={priceData}
          fileName={"MyFile"}
          headers={selectedOptions}
        />
      </header>
    </div>
  );
}

export default PriceLabs;
