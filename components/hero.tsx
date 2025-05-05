import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Hero() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Showcase Your Developer Portfolio
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Create and manage your professional developer portfolio with ease.
              Highlight your projects and skills to potential employers.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href={user ? "/dashboard" : "/sign-up"}>
              <Button size="lg" className="px-8">
                {user ? "Go to Dashboard" : "Get Started"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
