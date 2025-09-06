import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
        <p className="text-lg mb-8">Please log in to access your dashboard</p>
        <Link 
          href="/auth/login" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}