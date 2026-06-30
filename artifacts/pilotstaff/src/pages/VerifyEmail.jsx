import { Link } from 'wouter';

export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <span className="text-6xl block mb-6">📧</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Verify Your Email</h1>
        <p className="text-slate-500 mb-8">
          We've sent a verification link to your email. Please check your inbox and click the link to verify your account.
        </p>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-sm text-slate-500 mb-4">Didn't receive an email? Check your spam folder or try signing up again.</p>
          <Link href="/signup" className="block w-full btn-outline py-3 rounded-xl text-sm text-center">Try Again</Link>
          <Link href="/login" className="block w-full mt-3 text-center text-sm text-blue-600 hover:underline">Already verified? Sign in</Link>
        </div>
      </div>
    </div>
  );
}
