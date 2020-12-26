import { vehicle } from "../../models/vehicle";
import { GetServerSideProps } from "next";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface listProps {
   list?: vehicle[]
}

const Vehicles = ({ list }: listProps) => {
   return (
      <TableContainer component={Paper}>
         <Table aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>

               </TableRow>
            </TableHead>
            <TableBody>
               {
                  list.map(row =>
                     <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                           {row.id}
                        </TableCell>
                        <TableCell align="right">{row.brand}</TableCell>
                        <TableCell align="right">{row.model}</TableCell>
                        <TableCell align="right">{row.ownerId}</TableCell>
                     </TableRow>
                  )
               }

            </TableBody>
         </Table>
      </TableContainer>
   )
};

export default Vehicles;


export const getServerSideProps: GetServerSideProps<listProps> = async () => {
   const res = await fetch(`http://localhost:3000/api/vehicles`);
   const list = await res.json() as vehicle[] | undefined
   return {
      props: {
         list: list,
      }
   }
} 