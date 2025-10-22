import { NewCategoryForm } from "@/components/app/categories/new-category"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProduct() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Card className="w-4/12">
                <CardHeader>
                    <CardTitle>Crea una nueva categoría!</CardTitle>
                </CardHeader>

                <CardContent>
                    <NewCategoryForm />
                </CardContent>
            </Card>
        </div>
    )
}