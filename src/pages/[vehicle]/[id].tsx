import { NextPageContext, GetServerSideProps } from "next";
import { ownerProps } from "../../../api/VehiclePerson";


interface personProps {
   owner?: ownerProps[],
}

const Owners = ({ owner }: personProps) => {

   return (
      <div>
         {owner?.length === 0 ? (
            <div>Nothing</div>
         ) : (
               <pre>{JSON.stringify(owner, null, 4)}</pre>
            )}
      </div>
   )
};

export default Owners;

interface MyNextPageContext extends NextPageContext {
   query: {
      id?: string,
      vehicle?: string,
   }
};


export const getServerSideProps: GetServerSideProps<personProps> = async ({ query }: MyNextPageContext) => {

   const id = query?.id;
   const res = await fetch(`http://localhost:5000/vehicles?ownerName=${id}`);
   const owner = (await res.json()) as ownerProps[];
   return {
      props: {
         owner: owner,
      }
   }
};

