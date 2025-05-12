import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
       <h1>Hello W</h1>
       <Button variant="destructive"> hello world </Button>

       <UserButton />
    </div>
  );
}