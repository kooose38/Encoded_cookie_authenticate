import Link from "next/link";

const Home = () => {
   return (
      <div>
         <h1>Hello</h1>
         <Link href="/people">
            <a>People</a>
         </Link>
         <hr />
         <Link href="/vehicles">
            <a>vehicle</a>
         </Link>
      </div>
   )
}

export default Home;