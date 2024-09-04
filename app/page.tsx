import Categories from "@/components/common/Categories";
import HomeCard from "@/components/common/HomeCard";
import ToastforParams from "@/components/common/ToastforParams";
import Navbar from "@/components/header/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function Home({searchParams}:{searchParams?:{[key:string]:string | undefined}}) {

  const supabase = createServerComponentClient({cookies})

  const query = supabase.from("add-home")
  .select("id, title, image, country, city, price, users (metadata->name)") // here I joined the table of "add-home" with "users" table and can also see the metadata of "users" table
  if(searchParams?.country){
    query.ilike("country", `%${searchParams?.country}%`)
  }
  const {data:homes, error} = await query
  //console.log(homes)
  return (
    <>
     <ToastforParams />
     <Navbar />
     <Categories />

     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10">
     {homes && homes.length>0 && homes.map((item) => <HomeCard home={item} key={item.id}/>)}

     {homes && homes?.length < 1 && (
        <div className="text-center mt-4">
          <h1 className="text-brand font-bold text-2xl">No Airbnb found!</h1>
        </div>
      )}
     </div>
    </>
  );
}
