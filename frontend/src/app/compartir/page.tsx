"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { fetchProducts } from "@/lib/api/product";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function PublicPage() {
    const searchParams = useSearchParams();
    const categoriesParam = searchParams.get("categories");
    const selectedCategories = categoriesParam ? categoriesParam.split(",") : [];

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: () => fetchProducts(),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center w-full h-full text-red-500">
                Error al cargar los productos
            </div>
        );
    }

    const filteredProducts = selectedCategories.length === 0
        ? data
        : data?.filter(product => selectedCategories.includes(product.category.name));

    return (
        <div className="flex flex-col gap-6 w-full h-full p-4">
            <h2 className="text-2xl font-bold mb-4">Productos públicos</h2>
            <div className="grid grid-col gap-2 lg:gap-4 auto-cols-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
                {filteredProducts?.map((product, index) => (
                    <Card key={index} className="py-0">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-2 items-center">
                                <div className="rounded-md w-full h-16" style={{ backgroundColor: product.colour }} />
                                <h4 className="text-xl font-semibold">Color {product.id}</h4>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
