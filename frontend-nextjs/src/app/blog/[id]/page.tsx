export default function BlogPost({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Blog: {params.id}</h1>

      <p className="text-gray-700">
        {`This is the content for blog post "${params.id}".`}
      </p>
    </div>
  );
}
