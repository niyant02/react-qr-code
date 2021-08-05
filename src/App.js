import React from "react";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";

function App() {
  const [text, setText] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [scanResultFile, setScanResultFile] = React.useState("");
  const [scanResultWebScam, setScanResultWebCam] = React.useState("");
  const classes = useStyles();
  const qrRef = React.useRef(null);

  const generateQrCode = async () => {
    try {
      if (text) {
        const response = await QRCode.toDataURL(text);
        setImageUrl(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const scanQrCode = async () => {
    await qrRef.current.openImageDialog();
  };

  const handleErrorFile = async (err) => console.log(err);
  const handleScanFile = async (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const handleErrorWebCam = async (err) => console.log(err);
  const handleScanWebCam = async (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>
          {"Generate Download & Scan QR Code with React JS"}
        </h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Text Here"
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => generateQrCode()}
              >
                Generate
              </Button>
              <br />
              <br />
              <br />
              {imageUrl && (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt={text} />
                </a>
              )}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button
                className={classes.btn}
                variant="contained"
                color="secondary"
                onClick={() => scanQrCode()}
              >
                Scan QR Code
              </Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
              <h3>Scanned Code: {scanResultFile}</h3>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>QR Code Scan by Web Cam</h3>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3>Scanned By WebCam Code: {scanResultWebScam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

export default App;
