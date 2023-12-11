import TagCard from "@/components/admin/TagCard";
import Link from "next/link";

async function getTags() {
  const res = await fetch(`${process.env.BASE_URL}/api/posts/tags`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data.tags;
}

export default async function Tags() {
  const tags = await getTags();

  if(tags.length === 0) {
    return (
      <h2 className="font-bold">No tags found</h2>
      )
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-10 flex justify-between">
        All Tags
        <Link
          href={`/admin/posts/tags/create/`}
          className="px-6 py-2 mr-4 text-lg text-cyan-400 font-bold border border-cyan-400 hover:text-white hover:bg-cyan-400 inline-block rounded mb-3 disabled:opacity-75 disabled:text-white disabled:bg-cyan-400"
        >New Tags</Link>
      </h2>

      <div className="relative overflow-auto">
        <table className="border-collapse table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Title
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Published At
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tags.length !== 0 && (
              tags.map((tag) => (
                <TagCard key={tag._id} tag={tag} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
