"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Spinner } from "@/components/ui/spinner"
import { fetchProducts } from "@/lib/api/product"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

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

    if (isError) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                {toast.error('Error al cargar las lanitas')}
            </div>
        )
    }

    return (
        <div className="grid grid-col gap-2 lg:gap-4 auto-cols-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 w-full">
            {data?.map((product, index) => {
                return (
                    <Card key={index} className="py-0">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-2">
                                <Drawer direction="right">
                                    <DrawerTrigger>
                                        <div className="rounded-md w-full h-16 cursor-pointer" style={{ backgroundColor: product.colour }} />
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle className="font-semibold text-xl">Color {product.id}</DrawerTitle>
                                            <DrawerDescription>
                                                <Badge>{product.category.name}</Badge>
                                            </DrawerDescription>
                                        </DrawerHeader>

                                        <div className="p-4 w-full h-full">
                                            <div className="rounded-md w-full h-full" style={{ backgroundColor: product.colour }} />
                                        </div>

                                        <DrawerFooter>
                                            <DrawerClose>
                                                <Button variant="outline">Cerrar</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
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