import { AppSidebar } from "@/components/app/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-1 w-full h-full">
            <SidebarProvider>
                <AppSidebar />
                {children}
            </SidebarProvider>
        </div>
    )
}