// Define an interface for your params
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: PageProps) {
  // Await the params object
  const { id } = await params;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-xl text-center text-black">Profile</h1>
      <hr />
      <p className="text-4xl text-black">
        Profile Page 
        <span className="p-2 rounded ml-3 bg-orange-500 text-black">
          {id}
        </span>
      </p>
    </div>
  );
}
