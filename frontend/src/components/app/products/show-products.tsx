"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Spinner } from "@/components/ui/spinner"
import { fetchCategories } from "@/lib/api/category"
import { fetchProducts } from "@/lib/api/product"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

export const ShowProducts = () => {
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts()
    })
    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(),
    })

    const handleClickCategory = (category: { id: number; name: string }) => {
        if (categoriesSelected.includes(category.name)) {
            setCategoriesSelected(categoriesSelected.filter(cat => cat !== category.name));
        } else {
            setCategoriesSelected([...categoriesSelected, category.name]);
        }
    }

    if (isLoading || isLoadingCategories) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner />
            </div>
        )
    }

    if (isError || isErrorCategories) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                {toast.error('Error al cargar las categorías')}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 p-4">
                    <h5 className="font-semibold">Categorías</h5>
                    <div className="flex items-center gap-2">
                        {categories && categories.map((category, index) => {
                            return (
                                <Badge key={index} variant={categoriesSelected.includes(category.name) ? "default" : "outline"} onClick={() => handleClickCategory(category)} className="cursor-pointer">{category.name}</Badge>
                            )
                        })}
                    </div>
                </div>

                <Button
                    onClick={() => {
                        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
                        const params = categoriesSelected.length > 0 ? `?categories=${categoriesSelected.join(',')}` : '';
                        const shareUrl = `${baseUrl}/compartir${params}`;
                        navigator.clipboard.writeText(shareUrl);
                        toast.success('Enlace copiado al portapapeles');
                    }}
                >
                    Compartir colores seleccionados
                </Button>
            </div>

            <div className="grid grid-col gap-2 lg:gap-4 auto-cols-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 w-full">
                {data && data.length === 0 && <div>No hay lanitas disponibles</div>}
                {data && data.filter(product => categoriesSelected.length === 0 || categoriesSelected.includes(product.category.name)).map((product, index) => {
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
        </div>
    )
}