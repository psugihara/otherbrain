import Sample from "@/app/[authorSlug]/[modelSlug]/sample";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Home({ params }: { params: { id: string } }) {
  const [humanFeedback, count] = await Promise.all([
    prisma.humanFeedback.findUnique({
      where: { id: params.id },
      include: {
        messages: true,
        model: {
          include: { author: true },
        },
      },
    }),
    prisma.humanFeedback.count(),
  ]);

  if (!humanFeedback) {
    notFound();
  }

  const messages = humanFeedback.messages.sort((a, b) => a.index - b.index);
  const { model } = humanFeedback;

  return (
    <div className="mt-6 max-w-xl mb-20">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-5xl mr-2 font-semibold truncate">
            {humanFeedback.createdAt.toLocaleString()}
          </h1>
        </div>
        <div className="flex items-center mt-1.5">
          <div className="text-sm">
            {model && (
              <>
                <Link href={`/${model.author.slug}/${model.slug}`}>
                  {model.name}
                </Link>
                ,{" "}
              </>
            )}
            {humanFeedback.modelName}
          </div>
        </div>
      </div>

      <Sample humanFeedback={humanFeedback} hideDate />
    </div>
  );
}
