import Box from '@mui/material/Box';
import axios from 'axios';
import { useState , useEffect } from 'react';
import 'moment/dist/locale/ar'
import moment from 'moment';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import fajerimg from '../assets/images/fajer.jpg';
import shrouq from '../assets/images/elshrouq.jpg';
import zuhr from '../assets/images/zuer.jpg';
import aser from '../assets/images/aser.jpg';
import majreb from '../assets/images/majreb.jpg';
import esha from '../assets/images/esha.jpg'
import BlockPrayer from './BlockPrayer';
export default function MainContent() {
  moment.locale("ar-dz");
  let liveTime = moment()
  const [timer , setTimer] = useState("")
  const [tday , settday]= useState("")
  
  
  const [timings , setTimings] = useState({
    Fajr: "04:12",
    Sunrise: "05:58",
    Dhuhr: "12:58",
    Asr: "16:36",
    Maghrib: "19:58",
    Isha: "21:28",
  })
  const [theindexprayername , setheindexprayername] = useState(0)
  const listprayername = [
    {keypryaer : "Fajr" , namepryear : "الفجر"},
    {keypryaer : "Sunrise" , namepryear : "الشروق"},
    {keypryaer : "Dhuhr" , namepryear : "الظهر"},
    {keypryaer : "Asr" , namepryear : "العصر"},
    {keypryaer : "Maghrib" , namepryear : "المغرب"},
    {keypryaer : "Isha" , namepryear : "العشاء"},
  ]
  const theAvelebelCity = [
    {
      cityname : "الأسكندرية",
      isocity : "Alexandria"
    },
    {
      cityname : "القاهرة",
      isocity : "Cairo"
    },
    {
      cityname :"أسوان",
      isocity : "Aswan"
    }
  ]
  const [namecityselect , setNamecityselect] = useState({
    cityname : "الأسكندرية",
    isocity : "Alexandria"
  })

  useEffect(()=>{
    const getToday = moment().format("dddd")
    const timenow = moment().format("LL")
    const showDate = `${getToday}  ${timenow}`
    settday(showDate)
    let nextprayer = setInterval(() => {
      showthenexttimepreyer()
    }, 1000);

    return ()=>{
      clearInterval(nextprayer)
    }
  },[timings , timer])

  const showthenexttimepreyer = ()=>{
    let thenumberindex = 0
    if(liveTime.isAfter(moment(timings["Fajr"] , "hh:mm")) && liveTime.isBefore(moment(timings["Sunrise"] , "hh:mm"))){
      thenumberindex = 1
    }else if(liveTime.isAfter(moment(timings["Sunrise"] , "hh:mm")) && liveTime.isBefore(moment(timings["Dhuhr"] , "hh:mm"))){
      thenumberindex = 2
    }else if(liveTime.isAfter(moment(timings["Dhuhr"] , "hh:mm")) && liveTime.isBefore(moment(timings["Asr"] , "hh:mm"))){
      thenumberindex = 3
    }else if(liveTime.isAfter(moment(timings["Asr"] , "hh:mm")) && liveTime.isBefore(moment(timings["Maghrib"] , "hh:mm"))){
      thenumberindex = 4
    }else if(liveTime.isAfter(moment(timings["Maghrib"] , "hh:mm")) && liveTime.isBefore(moment(timings["Isha"] , "hh:mm"))){
      thenumberindex = 5
    }else{
      thenumberindex = 0
    }
    setheindexprayername(thenumberindex)
    
    /* show remining time  */
    const indexnextprayer = listprayername[thenumberindex]
    const timingnextprayer = timings[indexnextprayer.keypryaer]
    const remtimenextprayer = moment(timingnextprayer , "hh:mm")
    const reminigtime = moment(timingnextprayer , "hh:mm").diff(liveTime)
    let durationremining = moment.duration(reminigtime)
    if(durationremining < 0 ){
      const midnightdif = moment("23:59:59" , "hh:mm:ss").diff(liveTime)
      const reminigfajerdifmidnight = remtimenextprayer.diff(moment("00:00:00" , "hh:mm:ss"))
      const fajerreminingtime = midnightdif + reminigfajerdifmidnight
      durationremining = moment.duration(fajerreminingtime)
    }
    setTimer(`${durationremining.seconds()} :  ${durationremining.minutes()} : ${durationremining.hours()}`)
  }
  const getTiming = async ()=>{
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${namecityselect.isocity}&country=EG&method=8`)
    setTimings(response.data.data.timings)
  }

  useEffect(()=>{
    getTiming()
  },[namecityselect])




  const handleChange = (event) => {
    const cityselect = theAvelebelCity.find((city)=>{
      return city.isocity == event.target.value
    })
    setNamecityselect(cityselect)
  };
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
        {/* Header and Title */}
        <Grid xs={12}>
        <Typography style={{color:"#fff", fontSize:"30px" , textAlign:"center" , marginTop:"50px" , borderBottom:"1px solid #fff", paddingBottom:"15px"}}>
        مواقيت الصلاة
        </Typography>
        </Grid>
        {/* ===== Header and Title ===== */}
        {/* The City Name and The up Coming Salah */}
        <Grid container spacing={2}>
        <Grid xs={6}>
          <div style={{background:"rgb(255 255 255 / 77%)" , maxWidth:"200px" , marginTop:"50px", padding:"20px" , borderRadius:"5px"}}>
            <Typography style={{fontSize:"20px"}}>{tday}</Typography>
            <Divider style={{margin:"10px 0px"}}/>
            <Typography style={{fontSize:"30px" , fontFamily:"Almarai-bold"}}>{namecityselect.cityname}</Typography>
          </div>
        </Grid>
        <Grid xs={6}>
        <div style={{background:"rgb(255 255 255 / 77%)" , maxWidth:"200px" , marginTop:"50px", padding:"20px" , borderRadius:"5px"}}>
            <Typography style={{fontSize:"20px"}}>متبقي حتي صلاة {listprayername[theindexprayername].namepryear}</Typography>
            <Divider style={{margin:"10px 0px"}}/>
            <Typography style={{fontSize:"30px" , fontFamily:"Almarai-bold"}}>{timer}</Typography>
          </div>
        </Grid>
      </Grid>
      {/* ===== The City Name and The up Coming Salah ===== */}
      <Divider style={{margin:"50px 0px" , background:"#fff"}}/>
    </Box>
    {/* The Blocks Of The Timing Salah */}
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <BlockPrayer salahName="الفجر" salahTime={timings.Fajr} salahImg={fajerimg}/>
        <BlockPrayer salahName="الشروق" salahTime={timings.Sunrise} salahImg={shrouq}/>
        <BlockPrayer salahName="الظهر" salahTime={timings.Dhuhr} salahImg={zuhr}/>
        <BlockPrayer salahName="العصر" salahTime={timings.Asr} salahImg={aser}/>
        <BlockPrayer salahName="المغرب" salahTime={timings.Maghrib} salahImg={majreb}/>
        <BlockPrayer salahName="العشاء" salahTime={timings.Isha} salahImg={esha}/>
      </Grid>
    </Box>
    {/* Choose the country */}
    <Stack direction='row' style={{ marginTop:"50px" , justifyContent:"center"}}>
        <FormControl style={{width:"250px" , background:"#fff" , borderRadius:"0px"}}>
        <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //value="القاهرة"
          label="المدينة"
          onChange={handleChange}
          style={{color:"#000"}}
        >
          {theAvelebelCity.map((city)=>{
            return(
              <MenuItem key={city.isocity} value={city.isocity}>{city.cityname}</MenuItem>
            )
          })}
          {/* <MenuItem value={"Alexandria"}>الأسكندرية</MenuItem>
          <MenuItem value={"Cairo"}>القاهرة</MenuItem>
          <MenuItem value={"Aswan"}>أسوان</MenuItem> */}
        </Select>
      </FormControl>
    </Stack>
    </>
  )
}
