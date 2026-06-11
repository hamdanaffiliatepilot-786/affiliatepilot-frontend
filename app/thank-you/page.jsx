"use client";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 text-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl border max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-extrabold text-green-600 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your payment was received.</p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-bold text-lg text-gray-800 break-all">{orderId || 'N/A'}</p>
        </div>

        <a href="/orders" className="block w-full bg-blue-600 text-white py-3 rounded-xl font-bold mb-2 hover:bg-blue-700">Track My Order</a>
        <a href="/store" className="block w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300">Continue Shopping</a>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
