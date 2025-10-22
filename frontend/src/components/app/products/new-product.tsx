"use client"

import { Button } from "@/components/ui/button"
import InputColor from "@/components/ui/color-picker"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createProduct } from "@/lib/api/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const formSchema = z.object({
    colour: z.string().min(2, {
        message: "El color debe contener al menos dos caracteres"
    }),
    quantity: z.string()
})

export const NewProductForm = () => {
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
            quantity: "0"
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        mutation.mutateAsync({
            colour: values.colour,
            quantity: Number(values.quantity)
        })
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
                />
                <Button type="submit" className="w-full">Guardar</Button>
            </form>
        </Form>
    )
}