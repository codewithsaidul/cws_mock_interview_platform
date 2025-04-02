import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id),
    await getLatestInterviews({ userId: user?.id }),
  ]);

  // const userInterviews = await getInterviewByUserId(user?.id);
  // const latestInterviews = await getLatestInterviews({ userId: user?.id });
  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;
  console.log(latestInterviews);

  return (
    <>
      {/* ==================== Header of Home Page ==================== */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Section displaying the "Your Interviews" heading. Shows a placeholder message when no interviews are taken yet, and will later display dynamic interview data when available. */}

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>You Haven&apos;t taken any interviews yet</p>
          )}
          {/* <p>You Haven&apos;t taken any interviews yet</p> */}
        </div>
      </section>

      {/* Section displaying the "Take Interviews" heading and a placeholder message when no interviews are available, and will later display dynamic interview data when available. */}

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
          {/* <p>There are no interviews available</p> */}
        </div>
      </section>
    </>
  );
};

export default HomePage;
