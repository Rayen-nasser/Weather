import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import "./App.css";
import CloudIcon from "@mui/icons-material/Cloud";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: {
    fontFamily: ["Kufi"],
  },
});

let cancelAxios = null;

function App() {
  const [languge, setLanguge] = useState("en");
  const [locale, setlocale] = useState("Gafsa");
  const { t, i18n } = useTranslation();

  /*=========== STATES ============ */
  const [temp, setTemp] = useState({});
  const [data, setdata] = useState();

  function handelChangeLanguge() {
    languge === "ar" ? setLanguge("en") : setLanguge("ar");
    i18n.changeLanguage(languge);
    moment.locale(languge);
    setdata(moment().format("LLLL"));
  }
  useEffect(() => {
    i18n.changeLanguage("ar");
    moment.locale(languge);
    setdata(moment().format("LLLL"));
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${locale}&appid=21abda1f21ecd93c7bc3161f7e32c2c5`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        const degre = Math.round(response.data.main.temp - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15) - 10;
        const place = response.data.name;
        const icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        const desc = response.data.weather[0].description;
        console.log(temp);
        setTemp({
          place: place,
          temp: degre,
          tempMax: max,
          tempMin: min,
          img: icon,
          description: desc,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);

  /* Handel Model */
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setlocale(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      {/*=========  Start MODAl   =========== */}
      <Dialog dir="rtl" open={open} onClose={handleClose}>
        <DialogTitle> اختيار </DialogTitle>
        <DialogContent>
          <DialogContentText>
            يمكنك معرفة الدرجة الحرارة من خلال اختيار أي ولاية
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 60 }}>
              <InputLabel htmlFor="max-width">اختار مكان</InputLabel>
              <Select
                value={locale}
                onChange={handleChange}
                autoFocus
                label="maxWidth"
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                <MenuItem value="Tunis">تونس</MenuItem>
                <MenuItem value="Ariana">أريانة</MenuItem>
                <MenuItem value="Ben-arous">بن عروس</MenuItem>
                <MenuItem value="Mannouba">منوبة</MenuItem>
                <MenuItem value="Nabeul">نابل</MenuItem>
                <MenuItem value="Aaghouan">زغوان</MenuItem>
                <MenuItem value="Bizerte">بنزرت</MenuItem>
                <MenuItem value="Beja">باجة</MenuItem>
                <MenuItem value="Jendouba">جندوبة</MenuItem>
                <MenuItem value="Kef">الكاف</MenuItem>
                <MenuItem value="Kasserine">القصرين</MenuItem>
                <MenuItem value="Sidi-Bouzid">سيدي بوزيد</MenuItem>
                <MenuItem value="Kairouan">القيروان</MenuItem>
                <MenuItem value="Kasserine">القصرين</MenuItem>
                <MenuItem value="Sousse">سوسة</MenuItem>
                <MenuItem value="Monastir">المنستير</MenuItem>
                <MenuItem value="Mahdia">المهدية</MenuItem>
                <MenuItem value="Sfax">صفاقس</MenuItem>
                <MenuItem value="Gabes">قابس</MenuItem>
                <MenuItem value="Medenine">مدنين</MenuItem>
                <MenuItem value="Tataouine">تطاوين</MenuItem>
                <MenuItem value="Gafsa">قفصة</MenuItem>
                <MenuItem value="Tozeur">توزر</MenuItem>
                <MenuItem value="Kebili">قبلي</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/*=========  End MODAl   =========== */}
      <Container maxWidth="sm">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            direction: languge === "ar" ? "ltr" : "rtl",
            flexDirection: "column",
          }}
        >
          {/* === Start CAED ==== */}
          <div
            style={{
              width: "100%",
              color: "white",
              background: "rgb(28 52 91 /35%)",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "12px 12px 1px rgb(0,0 ,0 ,0.05)",
            }}
          >
            {/* === Content ==== */}
            <div>
              {/*  City and Time */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "end",
                }}
              >
                <Typography
                  className="place"
                  variant="h2"
                  mr={2}
                  fontWeight={400}
                  onClick={handleClickOpen}
                >
                  {t(locale)}
                </Typography>
                <Typography variant="h6" mr={2}>
                  {data}
                </Typography>
              </div>
              {/*  City and Time */}
              <hr />
              {/*  Degre and inforamation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {/* ===Degre  & Descreption=== */}
                <div>
                  {/* Degre */}
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <Typography variant="h1">{temp.temp}</Typography>
                    <img src={temp.img} alt="icon" />
                  </div>
                  {/* Degre */}
                  {/* Descreption */}
                  <div>
                    <Typography variant="h6">{t(temp.description)}</Typography>
                    {/*Max & Min */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-round",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <h5>
                        {t("Min")}: {temp.tempMin}
                      </h5>
                      <h5>|</h5>
                      <h5>
                        {t("Max")}: {temp.tempMax}
                      </h5>
                    </div>
                    {/*Max & Min */}
                  </div>
                  {/* Descreption */}
                </div>
                {/* ===Degre & Descreption=== */}
                {/* ===Cloud Image=== */}
                <div>
                  <CloudIcon style={{ fontSize: "200px" }} />
                </div>
                {/* ===Cloud Image=== */}
              </div>
              {/*  Degre and inforamation  */}
            </div>
            {/* === Content ==== */}
          </div>
          {/* === End CAED ===*/}
          {/* ===btn translate languge=== */}
          <div style={{ width: "100%", textAlign: "left", marginTop: "10px" }}>
            <Button
              sx={{ color: "white" }}
              variant="text"
              onClick={handelChangeLanguge}
            >
              {languge !== "en" ? "Arabic" : "الانجليزي"}
            </Button>
          </div>
          {/* ===btn translate languge=== */}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
