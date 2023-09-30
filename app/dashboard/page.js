import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UpdateUser from "@/components/UpdateUser";

async function getData() {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    "https://e-learning-back-jmydev.onrender.com/api/user/doctors",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user.token,
      },
      cache: "no-cache",
    }
  );
  return res.json();
}

const dashboard = async () => {
  const data = await getData();
  const session = await getServerSession(authOptions);

  // if (!session && loading === false) {
  //   return <div>loding ...</div>
  // }
  if (session?.user.user.isAdmin !== true) {
    return redirect(
      "/login?callbackUrl=/dashboard?&message=You Are Not Authorized!"
    );

    // return <div>You must be logged in to access this page.</div>;
  }

  return (
    <div>
      <UpdateUser />

      <div>
        {data && (
          <div>
            {Object.keys(data.doctors).map((id, index) => (
              <div key={index}>{data.doctors[id].name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default dashboard;
