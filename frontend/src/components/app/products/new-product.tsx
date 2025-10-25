"use client"

import { Button } from "@/components/ui/button"
import InputColor from "@/components/ui/color-picker"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { fetchCategories } from "@/lib/api/category"
import { createProduct } from "@/lib/api/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const formSchema = z.object({
    colour: z.string().min(2, {
        message: "El color debe contener al menos dos caracteres"
    }),
    quantity: z.string(),
    category: z.string()
})

export const NewProductForm = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories()
    });
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            // Invalidate and refetch products list
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            console.error('Failed to create product:', error);
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            colour: "#FF0000",
            quantity: "1",
            category: data ? String(data[0]?.id) || "1" : "1"
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutateAsync({
            colour: values.colour,
            quantity: Number(values.quantity),
            category_id: Number(values.category)
        })

        toast.info("Lana creada!")
    }

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full h-full">
                <FormField
                    control={form.control}
                    name="colour"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                                <InputColor
                                    {...field}
                                    alpha={true}
                                    className="mt-0"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoría</FormLabel>
                            <FormControl>
                                <Select {...field} onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data?.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <Button type="submit" className="w-full">Guardar</Button>
            </form>
        </Form>
    )
}