"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { fetchProducts } from "@/lib/api/product"
import { useQuery } from "@tanstack/react-query"

export const ShowProducts = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts()
    })

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="grid grid-col gap-2 lg:gap-4 auto-cols-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {data?.map((product, index) => {
                return (
                    <Card key={index} className="py-0">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-2">
                                <div className="rounded-md w-20 h-16" style={{backgroundColor: product.colour}} />
                                <div className="flex flex-col items-center gap-2">
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Color {product.id}</h4>
                                    {/* <Badge variant={product.quantity === 0 ? 'destructive' : 'default'}>{product.quantity === 0 ? 'Sin stock': `Stock ${product.quantity}`}</Badge> */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}