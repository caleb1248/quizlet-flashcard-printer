import { Link } from 'react-router';
import type { Route } from './+types/home';
import { ArrowRight, DollarSign, Printer, Sliders } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Quizlet Flashcard Printer' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-4 py-7">
      <main className="w-full max-w-4xl text-center">
        <section>
          <h1 className="mb-8 text-4xl font-bold">
            Print your Quizlet sets as double sided flashcards
          </h1>
          <h2 className="text-muted-foreground mb-5 text-xl">
            Quizlet made great again
          </h2>
        </section>
        <section>
          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard
              title="Double-sided printing"
              description="Our tool automatically formats your flashcards for double-sided printing, saving paper and making studying more efficient."
              icon={<Printer className="mr-3 inline-block" />}
            />
            <FeatureCard
              title="Easy to use"
              description="Simply import your Quizlet set, and we'll generate print-ready flashcards in seconds."
              icon={<ArrowRight className="mr-3 inline-block" />}
            />
            <FeatureCard
              title="Flexible"
              description="Font size, flashcard size, and page dimensions are all easily adjustable "
              icon={<Sliders className="mr-3 inline-block" />}
            />
            <FeatureCard
              title="Zero cost"
              description="Free and open source forever. No account required. No ads either."
              icon={<DollarSign className="mr-3 inline-block" />}
            />
          </div>
          <div className="mt-10 text-lg">
            What are you waiting for?
            <Link
              to="/print"
              className="start-button group ml-5 rounded-lg bg-blue-500 px-8 py-4 text-xl text-white transition-all hover:bg-blue-500/90 active:bg-blue-500/80"
            >
              Start printing now
              <ArrowRight className="ml-2 inline-block transition-transform ease-out group-active:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-gray-100 p-6 transition-all duration-300 hover:bg-gray-200 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700">
      <h2 className="mb-4 flex items-center text-left text-2xl font-semibold">
        {icon}
        {title}
      </h2>
      <p className="">{description}</p>
    </div>
  );
}
