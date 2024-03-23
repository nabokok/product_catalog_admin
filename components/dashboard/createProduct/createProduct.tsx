'use client';

import { Box, Button, Menu, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

export const CreateProduct = () => {
  const [category, setCategory] = useState<string>("phones");
  const [name, setName] = useState<string>("");
  const [fullPrice, setFullPrice] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [screen, setScreen] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [ram, setRam] = useState<string>("");
  const [year, setYear] = useState<number | null>(null);
  const [images, setImages] = useState([]);

  const handleFileChange = (e: any) => {
    setImages(Array.from(e.target.files));
    e.target.value = null;
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    console.log({
      category,
      name,
      fullPrice,
      price,
      screen,
      capacity,
      color,
      ram,
      year,
      images,
    });
  }

  const clearForm = () => {
    setCategory("phones");
    setName("");
    setFullPrice(null);
    setPrice(null);
    setScreen("");
    setCapacity("");
    setColor("");
    setRam("");
    setYear(null);
    setImages([]);
  }


  return (
    <Box maxWidth={700}>
      <div>
        <h1>Create product</h1>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          <MenuItem value="phones">Phones</MenuItem>
          <MenuItem value="tablets">Laptops</MenuItem>
          <MenuItem value="accesories">Tablets</MenuItem>
        </Select>
        <Box mt={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Full price"
            type="number"
            placeholder="Full price"
            value={fullPrice === null ? '' : fullPrice}
            onChange={(e) => setFullPrice(e.target.value === '' ? null : Number(e.target.value))}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Price"
            type="number"
            placeholder="Price"
            value={price === null ? '' : price}
            onChange={(e) => setPrice(e.target.value === '' ? null : Number(e.target.value))}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Screen"
            value={screen}
            onChange={(e) => setScreen(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Ram"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Year"
            type="number"
            placeholder="Year"
            value={year === null ? '' : year}
            onChange={(e) => setYear(e.target.value === '' ? null : Number(e.target.value))}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload Images
            </Button>
          </label>
          {images.map((file: any, index: number) => (
            <Box key={index} display="flex" justifyContent="space-between" mb={2}>
              <p>{file.name}</p>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteImage(index)}>
                Delete
              </Button>
            </Box>
          ))}
        </Box>

        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="contained" color="secondary" onClick={clearForm}>
            Clear
          </Button>
        </Box>
      </div>
    </Box>
  )
}