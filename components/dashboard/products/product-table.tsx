
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TablePagination } from "./pagination"
import { ProductWithCategory } from "@/types/ProductWithCategory"

interface Props {
    products: {
        productsPerPage: ProductWithCategory[],
        productsCount: number,
    }
}

export function ProductTable({ products }: Props) {
    const { productsPerPage, productsCount } = products;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                    Manage your products.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Price
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Color
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Capacity
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Year
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productsPerPage?.length > 0 && productsPerPage.map(product => (
                            <TableRow key={product.id}>
                                <TableCell className="hidden sm:table-cell">
                                    {product.name}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Badge variant="outline">{product.category.name}</Badge>
                                </TableCell>
                                <TableCell>
                                    {product.price}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {product.color}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {product.capacity}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {product.year}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                aria-haspopup="true"
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>{productsCount}</strong> products
                </div>
                <TablePagination productsCount={productsCount} />
            </CardFooter>
        </Card>
    )
}