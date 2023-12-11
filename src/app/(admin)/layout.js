import "../globals.css";
import { Roboto_Slab } from "next/font/google";
import { getUserDataFromToken } from "@/utils/tokenUtil";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Admin Panel - Next Blog",
  description: "Admin panel of Next Blog",
};

export default function RootLayout({ children }) {
  const user = getUserDataFromToken();

  return (
    <html lang="en">
      <body className={`${roboto_slab.className} text-slate-600 bg-slate-50`}>
        <div className="flex flex-wrap">
          <Sidebar />
          <div className="w-full pl-64">
            <Topbar user={user} />
            <div className="p-6">
              <div className="bg-white p-6">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
