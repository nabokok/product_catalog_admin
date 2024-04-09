import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ProductTable } from "@/components/dashboard/products/product-table"

interface SearchParams {
    page?: string;
    perPage?: string;
}

async function getProducts(searchParams: SearchParams | undefined) {
    const validSearchParams: { [key: string]: string } = {};

    if (searchParams) {
        if (searchParams.perPage) {
            validSearchParams.perPage = searchParams.perPage;
        }
        if (searchParams.page) {
            validSearchParams.page = searchParams.page;
        }
    }

    const queryString = new URLSearchParams(validSearchParams).toString();

    const res = await fetch(`${process.env.API_URL}/api/products?${queryString}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function ProductsPage({ searchParams }: { searchParams?: SearchParams }) {
    const products = await getProducts(searchParams);

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Phones</TabsTrigger>
                        <TabsTrigger value="draft">Tablets</TabsTrigger>
                        <TabsTrigger value="archived">
                            Accessories
                        </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Product
                            </span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="all">
                    <ProductTable products={products} />
                </TabsContent>
            </Tabs>
        </main>

    );
}





