import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Ajinkya Tambe" },
      _id: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      image: "https://i.ibb.co/BCQC36G/robots.jpg",
      category: "Robots",
      title: "We Robots",
    },
    {
      _createdAt: new Date(),
      views: 95,
      author: { _id: 2, name: "Anil Gupta" },
      _id: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      image: "https://i.ibb.co/BCQC36G/robots.jpg",
      category: "Games",
      title: "Gaming is Future",
    },
    {
      _createdAt: new Date(),
      views: 755,
      author: { _id: 3, name: "Amol Seni" },
      _id: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      image: "https://i.ibb.co/BCQC36G/robots.jpg",
      category: "Technology",
      title: "AI vs Human",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup,
          <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      {/* Startup Cards */}
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No startup found</p>
          )}
        </ul>
      </section>
    </>
  );
}
