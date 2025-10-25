"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { fetchCategories } from "@/lib/api/category"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const ShowCategories = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories()
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
                {toast.error('Error al cargar las categorías')}
            </div>
        )
    }

    return (
        <div className="grid grid-col gap-2 lg:gap-4 auto-cols-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 w-full">
            {data && data.length === 0 && <div>No hay categorías disponibles</div>}
            {data?.map((category, index) => {
                return (
                    <Card key={index} className="py-0">
                        <CardContent className="p-4">
                            <CardHeader>
                                <CardTitle className="font-semibold">{category.name}</CardTitle>
                                <CardDescription>{category.description}</CardDescription>
                            </CardHeader>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}