"use client"

import { Button } from "@/components/ui/button"
import InputColor from "@/components/ui/color-picker"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"
import { toast } from "sonner"
import { createCategory } from "@/lib/api/category"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe contener al menos dos caracteres"
    }),
    description: z.string()
})

export const NewCategoryForm = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: (error) => {
            console.error('Failed to create product:', error);
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutateAsync({
            name: values.name,
            description: values.description,
        })

        toast.info("Categoría creada!")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full h-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Input
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