import { person } from "../../models/person";
import { GetServerSideProps, NextPageContext } from "next";
import { myGet } from "../../api/myGet";

interface PeopleProps {
   people: person[] | null,
};

const People = ({ people }: PeopleProps) => {
   return (
      <div>
         {
            people ? (
               <pre>{JSON.stringify(people, null, 4)}</pre>

            ) : (
                  <div>404:Not Found</div>
               )
         }
      </div>
   )
};
export default People;

export const getServerSideProps: GetServerSideProps<PeopleProps> = async (ctx: NextPageContext) => {
   const people = await myGet(`http://localhost:3000/api/people`, ctx)

   return {
      props: {
         people: people
      }
   }
};