import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent hover:scale-105 transition-transform">
              Lernen
            </h1>
          </Link>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">Welcome back</h2>
          <p className="text-slate-600">Sign in to continue your learning journey</p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-none p-0",
                header: "text-center mb-6",
                headerTitle: "text-2xl font-semibold text-slate-800",
                headerSubtitle: "text-slate-600 mt-2",
                socialButtons: "flex flex-col gap-3 mb-6",
                socialButtonsIconButton: "w-full h-12 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all",
                socialButtonsBlockButton: "w-full h-12 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all font-medium",
                dividerLine: "bg-slate-200",
                dividerText: "text-slate-500 text-sm",
                formButtonPrimary: "w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg",
                formFieldInput: "w-full h-12 border border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all",
                formFieldLabel: "text-slate-700 font-medium mb-2 block",
                footerActionLink: "text-indigo-600 hover:text-indigo-700 font-medium transition-colors",
                identityPreviewText: "text-slate-600",
                identityPreviewEditButton: "text-indigo-600 hover:text-indigo-700",
                formResendCodeLink: "text-indigo-600 hover:text-indigo-700",
                otpCodeFieldInput: "border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              },
              layout: {
                socialButtonsPlacement: "top",
                showOptionalFields: false
              }
            }}
            redirectUrl="/dashboard"
            signUpUrl="/sign-up"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Back to home link */}
        <div className="text-center mt-4">
          <Link href="/" className="text-slate-500 hover:text-slate-700 text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}