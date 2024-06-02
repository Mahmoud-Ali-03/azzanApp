import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

export default function BlockPrayer({salahName , salahTime , salahImg}) {
  return (
    <Grid xs={6} md={2}>
    <div style={{background:"#fff" , borderRadius:"5px"}}>
     {/* image and title */}
     <div>
         <img src={salahImg} style={{width:"100%"}}/>
         <Typography style={{fontSize:"20px" , fontFamily:"Almarai-bold" , paddingRight:"10px"}}>{salahName}</Typography>
         <Typography style={{fontSize:"25px" , fontFamily:"Almarai-bold" , direction:"ltr", textAlign:"right" , paddingRight:"10px"}}>{salahTime}</Typography>
     </div>
    </div>
 </Grid>
  )
}
