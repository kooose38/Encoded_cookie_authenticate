import Link from "next/link";
import { GetStaticProps } from "next";
import { ownerProps } from "../../api/VehiclePerson";



interface OwnerProps {
   owner?: ownerProps[],
};

const List = ({ owner }: OwnerProps) => {

   return (
      <div>
         {
            owner?.map((o, i) =>
               <div key={i.toString()}>
                  <Link as={`/${o.vehicle}/${o.ownerName}`} href="/[vehicle]/[id]">
                     <a>{o.details}</a>
                  </Link>
               </div>
            )
         }
      </div>
   )
};

export default List;



export const getStaticProps: GetStaticProps<OwnerProps> = async () => {
   const res = await fetch(`http://localhost:5000/vehicles`);
   const owner = (await res.json()) as ownerProps[];

   return {
      props: {
         owner: owner
      }
   }
};