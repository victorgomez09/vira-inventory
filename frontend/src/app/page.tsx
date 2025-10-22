import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100 flex flex-col items-center justify-center font-sans p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">Ovillos de Lana Vira</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Descubre la suavidad y los colores vibrantes de nuestros ovillos de lana. Perfectos para tejer, crear y soñar. ¡Haz de cada proyecto una obra de arte cálida y única!
        </p>
        <Badge className="mt-4 bg-pink-300 text-pink-900 text-base">Envíos a todo el país</Badge>
      </header>

      <main className="flex flex-col md:flex-row gap-10 items-center justify-center w-full">
        <Card className="p-6 flex flex-col items-center shadow-lg bg-white/80">
          <Image
            src="/yarn-balls.png"
            alt="Ovillos de lana coloridos"
            width={220}
            height={180}
            className="rounded-xl mb-4 border-4 border-pink-200"
          />
          <h2 className="text-2xl font-semibold text-pink-700 mb-2">Colores para inspirar</h2>
          <p className="text-gray-600 mb-4 text-center">
            Elige entre más de 30 tonos y texturas. Lana premium, algodón y mezclas ecológicas.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white text-base px-6 py-2 rounded-full shadow">Ver catálogo</Button>
        </Card>

        <Card className="p-6 flex flex-col items-center shadow-lg bg-white/80">
          <Image
            src="/knitting.png"
            alt="Tejiendo con ovillos de lana"
            width={220}
            height={180}
            className="rounded-xl mb-4 border-4 border-yellow-200"
          />
          <h2 className="text-2xl font-semibold text-yellow-700 mb-2">Para todos tus proyectos</h2>
          <p className="text-gray-600 mb-4 text-center">
            Teje prendas, accesorios y decoraciones. ¡Inspírate y comparte tus creaciones con nuestra comunidad!
          </p>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white text-base px-6 py-2 rounded-full shadow">Únete al club</Button>
        </Card>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        © 2025 Ovillos de Lana Vira. Todos los derechos reservados.
      </footer>
    </div>
  );
}
