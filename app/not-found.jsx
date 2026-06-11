import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">Looks like this product or page has been sold out or moved!</p>
      <div className="flex gap-4">
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">Go Home</Link>
        <Link href="/store" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800">Browse Store</Link>
      </div>
    </div>
  );
}
