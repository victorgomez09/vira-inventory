"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { fetchProducts } from "@/lib/api/product"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

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
        <div className="flex flex-col gap-2 w-full">
            {data?.map((product, index) => {
                return (
                    <Card key={index}>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="rounded-md w-20 h-16" style={{backgroundColor: product.colour}} />
                                <div className="flex flex-col gap-2">
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{product.name}</h4>
                                    <Badge variant={product.quantity === 0 ? 'destructive' : 'default'}>{product.quantity === 0 ? 'Sin stock': `Stock ${product.quantity}`}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}