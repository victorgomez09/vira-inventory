import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-2 h-full w-full">
      <Card className="p-8">
        <h1 className="text-4xl font-bold mb-4">Vira Inventory</h1>
        <p className="mb-6">Bienvenido a Vira Inventory, tu solución para gestionar inventarios de manera eficiente.</p>
        <Link href="/gestion/lanas">
          <Button>
            Ir a Gestión
          </Button>
        </Link>
      </Card>
    </div>
  );
}
