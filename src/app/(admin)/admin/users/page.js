import UserCard from "@/components/admin/UserCard";

async function getUsers() {
  const res = await fetch(`${process.env.BASE_URL}/api/users`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data.users;
}

export default async function Users() {
  const users = await getUsers();

  if (users.length === 0) {
    return <h2 className="font-bold">No posts found</h2>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-10">All Users</h2>

      <div className="relative overflow-auto">
        <table className="border-collapse table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Name
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Email
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Role
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Status
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 &&
              users.map((user) => <UserCard key={user._id} user={user} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
