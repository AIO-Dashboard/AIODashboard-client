import { useParams } from "react-router";
import { useCustomerDetail } from "../../hooks/useCustomers";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Spinner from "../../components/Spinner";

// import type { Review } from "../../types/Customers";

export default function CustomerDetail() {
  const { id } = useParams(); // take id from url

  console.log("ProductDetail id:", id);

  const { data, isLoading, isError } = useCustomerDetail(id ? id : "");
  console.log("CustomerDetail:", data, isLoading, isError);

  const mask = (value: string, visibleCount = 4) => {
    return value.length > visibleCount
      ? "*".repeat(value.length - visibleCount) + value.slice(-visibleCount)
      : value;
  };

  return (
    <>
      {data ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block" }}
            >
              <h2 style={{ marginBottom: 0 }}>Basic Profile</h2>
            </Typography>
          </Grid>
          <Grid container xs={12}>
            {/* <Grid size={12} container> */}
            <Grid container size={6}>
              <h1
                style={{ marginTop: 0 }}
              >{`${data.firstName} ${data.lastName}`}</h1>
              <Stack direction="column" spacing={1}>
                <span>Username: {data.username}</span>
                <span>Email: {data.email}</span>
                <span>Mobile: {data.phone}</span>
                <span>
                  Home Address:{" "}
                  {`${data.address.address}, ${data.address.city}`}
                </span>
                <span>Age: {data.age}</span>
                <span>Date of birth: {data.birthDate}</span>
              </Stack>
            </Grid>
            <Grid size={6} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={data.image || "/react.svg"}
                alt={`${data.firstName} ${data.lastName}`}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/react.svg";
                }}
                sx={{
                  width: "100%",
                  maxWidth: 200,
                  height: "auto",
                  borderRadius: 0,
                  objectFit: "cover",
                  backgroundColor: "#f0f0f0",
                }}
              />
            </Grid>
            {/* </Grid> */}
          </Grid>

          <Grid size={6}>
            <section>
              <Typography
                variant="overline"
                gutterBottom
                sx={{ display: "block" }}
              >
                <h2>Personal Details</h2>
              </Typography>
              <Stack spacing={1}>
                <span>Blood Group: {data.bloodGroup}</span>
                <span>Eye Color: {data.eyeColor}</span>
                <span>Hair: {`${data.hair.type} ${data.hair.color}`}</span>
                <span>Height: {data.height} cm</span>
                <span>Weight: {data.weight} kg</span>
                <span>SSN: {mask(data.ssn)}</span>
                <span>EIN: {mask(data.ein)}</span>
                <span>University: {data.university}</span>
              </Stack>
            </section>
          </Grid>
          <Grid size={6}>
            <section>
              <Typography
                variant="overline"
                gutterBottom
                sx={{ display: "block" }}
              >
                <h2>Work & Financial</h2>
              </Typography>
              <Stack spacing={1}>
                <span>Company: {data.company.name}</span>
                <span>Title: {data.company.title}</span>
                <span>Department: {data.company.department}</span>
                <span>
                  Work Location:{" "}
                  {`${data.company.address.address}, ${data.company.address.city}`}
                </span>

                <span>
                  Bank: {data.bank.cardType} - {mask(data.bank.cardNumber)}
                </span>
                <span>IBAN: {mask(data.bank.iban)}</span>
                <span>
                  Crypto: {data.crypto.coin} ({data.crypto.network})
                </span>
                <span>Wallet: {mask(data.crypto.wallet)}</span>
              </Stack>
            </section>
          </Grid>
        </Grid>
      ) : (
        <Spinner text={"LOADING CUSTOMER INFO"} />
      )}
    </>
  );
}
