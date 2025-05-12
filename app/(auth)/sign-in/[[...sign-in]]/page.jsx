import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <SignIn appearance={{
        elements: {
          rootBox: "w-full mx-auto",
          card: "mx-auto my-8",
          header: "text-center",
          socialButtons: "justify-center",
          formFieldInput: "w-full",
          footer: "text-center"
        }
      }}/>
    </div>
  )
}