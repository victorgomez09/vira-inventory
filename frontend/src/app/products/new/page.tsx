import { NewProductForm } from "@/components/app/products/new-product"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProduct() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Registra una nueva lanita!</CardTitle>
                </CardHeader>

                <CardContent>
                    <NewProductForm />
                </CardContent>
            </Card>
        </div>
    )
}