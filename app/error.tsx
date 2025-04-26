"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Xatoni log qilish
    console.error('Sahifa xatosi:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Kutilmagan xatolik yuz berdi
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Sahifani qayta yuklashga urinib ko'ring
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 rounded-lg bg-primary px-6 py-3 text-white transition-all hover:bg-primary/90"
        >
          Qayta urinish
        </button>
      </div>
    </div>
  );
}
