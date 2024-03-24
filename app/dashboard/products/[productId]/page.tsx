'use client';

import { Box, Button, MenuItem, Select, TextField, Divider, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ProductWithCategory } from "@/types/ProductWithCategory";
import { toast } from 'react-hot-toast';
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Category, Product } from "@prisma/client";

// const categorySchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     createdAt: z.date(),
//     updatedAt: z.date(),
// })

const schema = z.object({
    name: z.string(),
    category: z.string(),
    fullPrice: z.number(),
    price: z.number(),
    screen: z.string(),
    capacity: z.string(),
    color: z.string(),
    ram: z.string(),
    year: z.number(),
    images: z.array(z.string()),
    colorsAvailable: z.array(z.string()),
    capacityAvailable: z.array(z.string()),
    description: z.string(),
    resolution: z.string(),
    processor: z.string(),
    cell: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
})

type Schema = z.infer<typeof schema>

export default function CreateProduct({ params }: { params: { productId: string } }) {
    const [product, setProduct] = useState<Product & { category: string }>();
    const [categories, setCategories] = useState<Category[]>([]);
    const { control, handleSubmit, getValues, setValue, reset } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: product as Product & { category: string },
        values: product as Product & { category: string },
    });

    const onSubmit = (data: Schema) => {
        console.log(data)
    }

    const [images, setImages] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponce = await axios.get(`/api/products/${params.productId}`);
                const categoriesResponce = await axios.get(`/api/categories`);

                setProduct({ ...productResponce.data, category: productResponce.data.category.name });
                setCategories(categoriesResponce.data);
                // reset({ ...productResponce.data, category: productResponce.data.category.name })
            } catch (error) {
                toast.error('Something went wrong.');
            }
        };

        fetchData();
    }, []);



    const handleFileChange = (e: any) => {
        setImages(Array.from(e.target.files));
        e.target.value = null;
    };

    const handleDeleteImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const clearForm = () => {
    }

    console.log(getValues())
    console.log(getValues('category'))

    return (
        <Box maxWidth={700}>
            <h1>Edit product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Controller
                        name={'name'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Name'}
                                variant="outlined"
                            />
                        )}
                    />
                </Box>
                <Box mt={2}>
                    <Controller
                        name={'category'}
                        control={control}
                        render={({
                            field: { onChange, value = '' },
                            fieldState: { error },
                        }) => {
                            return (
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    helperText={error ? error.message : null}
                                    size="small"
                                    select
                                    error={!!error}
                                    onChange={onChange}
                                    defaultValue={value || product?.category}
                                    value={value}
                                    fullWidth
                                    label={'Category'}
                                    variant="outlined"
                                >
                                    {categories.map(category => (
                                        <MenuItem
                                            value={category.name}
                                            key={category.id}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )
                        }}
                    />

                </Box>
                <Box mt={2} sx={{ display: 'flex', gap: '12px' }}>
                    <Controller
                        name={'fullPrice'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Full Price'}
                                variant="outlined"
                            />
                        )}
                    />
                    <Controller
                        name={'price'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Price'}
                                variant="outlined"
                            />
                        )}
                    />
                </Box>
                <Box mt={2} >
                    <Divider />
                </Box>
                <Box mt={2} sx={{ display: 'flex', gap: '12px' }}>
                    <Controller
                        name={'capacity'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Capacity'}
                                variant="outlined"
                            />
                        )}
                    />
                    <Controller
                        name={'capacityAvailable'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Available Capaities'}
                                variant="outlined"
                            />
                        )}
                    />
                </Box>
                <Box mt={2} sx={{ display: 'flex', gap: '12px' }}>
                    <Controller
                        name={'color'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Color'}
                                variant="outlined"
                            />
                        )}
                    />
                    <Controller
                        name={'colorsAvailable'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Available Colors'}
                                variant="outlined"
                            />
                        )}
                    />

                </Box>
                <Box mt={2} sx={{ display: 'flex', gap: '12px' }}>
                    <Controller
                        name={'ram'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Ram'}
                                variant="outlined"
                            />
                        )}
                    />
                    <Controller
                        name={'year'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Year'}
                                variant="outlined"
                            />
                        )}
                    />
                </Box>
                <Box mt={2} sx={{ display: 'flex', gap: '12px' }}>
                    <Controller
                        name={'screen'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Screen'}
                                variant="outlined"
                            />
                        )}
                    />
                    <Controller
                        name={'resolution'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Resolution'}
                                variant="outlined"
                            />
                        )}
                    />
                </Box>
                <Box mt={2} sx={{ display: 'flex', gap: '12px' }}>
                    <Controller
                        name={'processor'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Processor'}
                                variant="outlined"
                            />
                        )}
                    />
                    <Controller
                        name={'cell'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value}
                                fullWidth
                                label={'Cell'}
                                variant="outlined"
                            />
                        )}
                    />
                </Box>
                <Box mt={2} sx={{ display: 'flex', gap: '12px' }}>
                    <Controller
                        name={'description'}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                rows={10}
                                maxRows={16}
                                multiline
                                InputLabelProps={{ shrink: true }}
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                defaultValue={value}
                                value={value ? JSON.parse(value)
                                    .map((item: any) => `${item.title}\n${item.text.join('\n')}`).join('\n\n') : ''}
                                fullWidth
                                label={'Description'}
                                variant="outlined"
                            />
                        )}
                    />
                </Box>
                <Box mt={2} >
                    <Divider />
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
                    <Button variant="contained" color="primary" type="submit">
                        Create
                    </Button>
                    <Button variant="contained" color="secondary" onClick={clearForm}>
                        Clear
                    </Button>
                </Box>
            </form>
        </Box>
    )
}